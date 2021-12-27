const ChatBox = {
    messages (parent, args, { db }, info) {
        return Promise.all( // wait for all findById done
            parent.messages.map(
                (mId) => db.MessageModel.findById(mId)
            )
        )
    },
};
  
  export default ChatBox;