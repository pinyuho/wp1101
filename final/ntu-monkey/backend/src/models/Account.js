import mongoose from 'mongoose'
const Schema = mongoose.Schema

const AccountSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, default: null },
    student_id: { type: String, required: true },
    department: { type: String, required: true },
    pass_hash: { type: String, required: true },
})

const Account = mongoose.model('Account', AccountSchema)
export default Account