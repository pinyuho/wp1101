import mongoose from 'mongoose'
const Schema = mongoose.Schema

const TaskApplicantSchema = new Schema({
    task_id: { type: mongoose.Types.ObjectId, required: true, ref: 'Task' },
    applicant_id: { type: mongoose.Types.ObjectId, required: true, ref: 'Account' }, 
    status: { type: String, enum: ['PENDING', 'ACCEPTED', 'REJECTED', 'DONE'], required: true, default: 'PENDING'}
})

const TaskApplicant = mongoose.model('TaskApplicant', TaskApplicantSchema)
export default TaskApplicant