import { 
  makeName, 
  checkUser, 
  checkChatBox, 
  newUser, 
  newChatBox, 
  checkMessage, 
  newMessage,
} from '../util'

const Query = {
  async users(parent, args, { db }, info) {
    const users = await db.UserModel.find()
    if (!args.query) {
      return users;
    }

    return users.filter((user) => 
      user.name.toLowerCase().includes(String(args.query.toLowerCase()))
    );
  },
  async chatBox(parent, { name1, name2 }, { db }, info) {
    const {chatBox, sender} = await checkMessage(db, name1, name2, "queryChatBox");
    if (!chatBox) throw new Error("ChatBox not found for QueryChatBox");
    // if (!chatBox) {
    //   const chatBoxName = makeName(name1, name2); // names should be ordered
    //   chatBox = await newChatBox(db, chatBoxName);
    // }
    return chatBox;
  },
};

export default Query;
