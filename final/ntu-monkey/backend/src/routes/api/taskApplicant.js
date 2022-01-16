import express from 'express'
import { authToken } from '../../util/auth.js'

import Task from '../../models/Task.js'
import TaskApplicant from '../../models/TaskApplicant.js'
import Account from '../../models/Account.js'

const router = express.Router()

router.post('/:taskId/applicant', async (req, res) => {
    const account = await Account.findOne({ _id: authToken(req.body.authToken)._id })
    const task = await Task.findOne({ _id: req.params.taskId })
    console.log(account)

    const filter = {
        task_id: req.params.taskId,
        applicant_id: account._id
    }

    const newTaskApplicant = new TaskApplicant({
        task_id: req.params.taskId,
        applicant_id: account._id
    })

    if (account.username === task.publisher) {
        res.send({
            success: false,
            message: 'Cannot apply for your own task!'
        })
    } else {
        const taskApplicant = await TaskApplicant.findOne(filter)

        if (!taskApplicant) {
            await newTaskApplicant.save()
            .then(res.send({
                success: true,
                message: 'Successfully Applied'
            }))
            .catch(err => res.status(400).send({
                success: false,
                message: err
            }))
        } else {
            res.send({
                success: false,
                message: 'You have already applied'
            })
        }
    }
})

router.post('/:taskId/done', async (req, res) => {
    console.log("applicant_id: ", authToken(req.body.authToken)._id)

    await TaskApplicant.updateOne(
        { task_id: req.params.taskId, applicant_id: authToken(req.body.authToken)._id }, 
        { status: 'DONE'}
    )
    .then(
        res.send({
            success: true,
            message: 'Task Done'
        })
    ).catch(err => res.status(400).json('Error! ' + err))  
    
})

router.post('/:taskId/applicant/:applicantId', async (req, res) => {
    const account = await Account.findOne({ _id: req.params.applicantId })
    console.log("account: ", account)
    await TaskApplicant.updateMany(
        { task_id: req.params.taskId }, 
        { status: 'REJECTED'}
    )
    await TaskApplicant.updateOne(
        { task_id: req.params.taskId, applicant_id: account._id }, 
        { status: 'ACCEPTED'}
    )
    await Task.findOneAndUpdate(
        { _id: req.params.taskId }, 
        { participant: account.username }
    )
 
    res.send({
        success: true,
        message: 'Application Sent'
    })
})

router.get('/:taskId/applicant', async (req, res) => {
    const taskApplicants = await TaskApplicant.find({ task_id:  req.params.taskId })
    await Account.find({ _id: {$in: taskApplicants.map(taskApplicant => taskApplicant.applicant_id)}})
    .then(function(accounts) {
        if (accounts.length !== 0) {
            res.send({
                applicants: accounts,
                message: ''
            })
        } 
        else {
            res.send({
                applicants: [],
                message: 'No applicants yet'
            })
        }
    }).catch(err => res.status(400).json("Error! " + err)) 
})

export default router