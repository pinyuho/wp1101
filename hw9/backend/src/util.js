const makeName = (name1, name2) => {
    return [name1, name2].sort().join("_");
};

// Return the found user (can be null)
const checkUser = async (db, name, errFunc) => {
    if (!name) throw new Error("Missing username for " + errFunc);
    return await db.UserModel.findOne( {name} );
};

// Return the found chatBox (can be null)
const checkChatBox = async (db, chatBoxName, errFunc) => {
    if (!chatBoxName) throw new Error("Missing chatBoxName for " + errFunc);
    return await db.ChatBoxModel.findOne( {name: chatBoxName} );
};

// Make sure (from, to) users and chatBox have been created
// Return found { chatBox, sender, receiver } (can be null)
const checkMessage = async (db, from, to, errFunc) => {
    const chatBoxName = makeName(from, to);
    return {
        chatBox: await checkChatBox(db, chatBoxName, errFunc),
        sender: await checkUser(db, from, errFunc),
        to: await checkUser(db, to, errFunc),
    };
};

// Make sure calling checkUser beforehead
const newUser = async (db, name) => {
    return await new db.UserModel({ name }).save();
};

// Make sure calling checkChatBox beforehead
const newChatBox = async (db, chatBoxName) => {
    return await new db.ChatBoxModel({ name: chatBoxName }).save();
};

// Make sure calling checkMessage beforehead
const newMessage = async (db, sender, body) => {
    return await new db.MessageModel({ sender, body }).save();
};

export {
    makeName,
    checkUser,
    checkChatBox,
    checkMessage,
    newUser,
    newChatBox,
    newMessage,
};


