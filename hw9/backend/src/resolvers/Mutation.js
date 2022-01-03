import { 
  makeName, 
  checkUser, 
  checkChatBox, 
  newUser, 
  newChatBox, 
  checkMessage, 
  newMessage,
} from '../util'

const Mutation = {
  createChatBox: async (parent, { data: { name1, name2 } }, { db, pubsub }, info) => {
    if (!name1 || !name2) {
      throw new Error("Missing ChatBox name for CreateChatBox");
    }
    if (!(await checkUser(db, name1, "createChatBox"))) {
      console.log("User does not exist for CreateChatBox " + name1);
      await newUser(db, name1);
    }
    if (!(await checkUser(db, name2, "createChatBox"))) {
      console.log("User does not exist for CreateChatBox " + name2);
      await newUser(db, name2);
    }

    const chatBoxName = makeName(name1, name2); // names should be ordered
    let chatBox = await checkChatBox(db, chatBoxName, "createChatBox");
    if (!chatBox) {
      chatBox = await newChatBox(db, chatBoxName);
    }

    return chatBox;
  },

  createMessage: async (parent, { data: { from, to, message } }, { db, pubsub }, info) => {
    const {chatBox, sender} = await checkMessage(db, from, to, "createMessage");
    if (!chatBox) throw new Error("ChatBox not found for CreateMessage");
    if (!sender) throw new Error("User not found: " + from);
    console.log("sender: ", sender)

    const newMsg = await newMessage(db, sender, message);
    chatBox.messages.push(newMsg);
    await chatBox.save();

    await pubsub.publish('message', {
      message: {
        mutation: 'CREATED',
        data: newMsg,
      }
    })

    return newMsg;
  },
  
};

export default Mutation;
