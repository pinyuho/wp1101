import express from 'express'
import { authToken } from '../../util/auth.js'

import Account from '../../models/Account.js'
import Profile from '../../models/Profile.js'
const router = express.Router()

router.post('/profile', async (req, res) => {
    await Account.findOneAndUpdate({ _id: authToken(req.body.authToken)._id}, req.body, { upsert: true })
    await Profile.findOneAndUpdate({ account_id: authToken(req.body.authToken)._id}, req.body, { upsert: true })
    .then(res.send({
        success: true,
        message: 'Profile added'
    })).catch(err => res.status(400).json("Error! " + err))
})

router.get('/profile', async (req, res) => {
    
    const account = await Account.findOne({ _id: authToken(req.query.authToken)._id })
    const profile = await Profile.findOne({ account_id: authToken(req.query.authToken)._id })
    if(!account) {
        res.send({
            profile: null,
            account: null,
            message: 'Account Not Found'
        })
    } else {
        res.send({
            profile: profile,
            account: account,
            message: 'Get Profile Successfully'
        })
    }
})


export default router