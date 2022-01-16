import express from 'express'
import { authToken } from '../../util/auth.js'

import Task from '../../models/Task.js'
import TaskApplicant from '../../models/TaskApplicant.js'
import Account from '../../models/Account.js'

const router = express.Router()

router.post('/', async (req, res) => {
    const newTask = new Task(req.body)

    await newTask.save()
    .then(res.send({
        success: true,
        message: 'Task Created'
    }))
    .catch(err => res.status(400).send({
        success: false,
        message: err
    }))
})

router.get('/', async (req, res) => {

    let filter = {}

    let response = {
        totalCnt: null,
        task: [],
        message: ''
    }

    const account = await Account.findOne({ _id: authToken(req.query.authToken)._id })

    if (req.query.title) {
        filter.title = { $regex: '.*' + req.query.title + '.*' }
    }

    if (req.query.role === 'applicant' && req.query.type === 'all') {
        filter = { 
            participant: null,
        }
    } else if (req.query.role === 'applicant' && req.query.type === 'my') {
        const myApplications = await TaskApplicant.find({ 
            applicant_id: account._id,
            status: req.query.status
        })

        filter = {
            _id: {$in: myApplications.map(myApplication => myApplication.task_id)}
        }

        // let Tasks = await Task.find({ _id: {$in: myApplications.map(myApplication => myApplication.task_id)} })
        // let newTasks = []
        // Tasks.forEach(Task => (
        //     newTasks.push({
        //         Task,
        //         status: myApplications.find(myApplication => myApplication.task_id.equals(Task._id)).status
        //     })
        // ))
    } else if (req.query.role === 'applicant' && req.query.type === 'done') {

        const doneTasks = await TaskApplicant.find({ 
            applicant_id: account._id,
            status: 'DONE'
        })

        filter = {
            _id: {$in: doneTasks.map(doneTask => doneTask.task_id)}
        }

    } else if (req.query.role === 'publisher' && req.query.type === 'my') {
        filter = {
            publisher: account.username,
            participant: null,
        }
    } else if (req.query.role === 'publisher' && req.query.type === 'done') {
        filter = {
            publisher: account.username,
            participant: { $ne: null },
        }
    }
   const allTasks = await Task.find(filter)
    await Task.find(filter)
    .then(function(Tasks) {
        if (Tasks.length !== 0) {
            response.task = Tasks.slice(parseInt(req.query.offset), parseInt(req.query.limit) + parseInt(req.query.offset))
            response.totalCnt = allTasks.length
        } else {
            response.message = 'Task not found!'
        }
    }).catch(err => res.status(400).json('Error! ' + err))    

    res.json(response)  
})

router.patch('/:taskId', async (req, res) => {
    const filter = { _id: req.params.taskId };
    let update = {}

    if (req.body.title) update.title = req.body.title
    else if (req.body.time) update.time = req.body.time
    else if (req.body.reward) update.reward = req.body.reward
    else if (req.body.location) update.location = req.body.location
    else if (req.body.social_account) update.social_account = req.body.social_account
    else if (req.body.description) update.description = req.body.description

    await Task.findOneAndUpdate(filter, update)
})

// soft delete for browsing self deleted tasks
router.delete('/:taskId', async (req, res) => {
    const filter = { _id: req.params.taskId };
    const update = { is_deleted: true };

    const oldTask = await Task.findOne(filter)
    if (!oldTask) {
        res.send({
            success: false,
            message: 'Task Not Found'
        })
    } else {
        await Task.deleteOne(filter)
        .then(res.send({
            success: true,
            message: 'Task Deleted'
        }))
        .catch(err => res.status(400).json("Error! " + err))
    }
})

router.get('/:taskId', async (req, res) => {
    const task = await Task.findOne({ _id: req.params.taskId })
    if(!task) {
        res.send({
            task: null,
            message: 'Task Not Found'
        })
    } else {
        res.send({
            task: task,
            message: ''
        })
    }

})

export default router
