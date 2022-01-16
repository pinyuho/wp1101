import mongoose from 'mongoose'
const Schema = mongoose.Schema

const TaskSchema = new Schema({
    title: { type: String, required: true },
    time: { type: Date, required: true },
    reward: { type: String, required: true },
    publisher: { type: String, required: true },
    location: { type: String, required: true },
    social_account: { type: String, required: true },
    description: { type: String, required: true },
    participant: { type: String, default: null },
})

const Task = mongoose.model('Task', TaskSchema)
export default Task