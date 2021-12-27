const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ChatBoxSchema = new Schema({
    name: { type: String, required: true },
    messages: [{ type: mongoose.Types.ObjectId, ref: "Message" }],
});

const ChatBox = mongoose.model("ChatBox", ChatBoxSchema);
module.exports = ChatBox

