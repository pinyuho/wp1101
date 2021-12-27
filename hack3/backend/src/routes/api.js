import express from 'express'

const Message = require('../models/message')
const router = express.Router()

router.get('/', async (_, res) => {
    await Message.find()
    .then((messages) => 
        res.send(messages)
    ).catch(err => 
        res.status(400).json('Error! ' + err)
    ) 
})

router.delete('/clear', async(_, res) => {
    await Message.deleteMany({})
        .then(res.json({ 
            type: 'success',
            msg: "Database cleared."
        }))
        .catch(err => res.status(400).json('Error! ' + err))
})

export default router