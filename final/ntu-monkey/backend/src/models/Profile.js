import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ProfileSchema = new Schema({
    account_id: { type: mongoose.Types.ObjectId, required: true, ref: 'Account' },
    description: { type: String, default: '' },
    social_account: { type: String, default: '' },
})

const Profile = mongoose.model('Profile', ProfileSchema)
export default Profile