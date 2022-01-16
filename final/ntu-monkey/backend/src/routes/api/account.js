import express from 'express'
import { genToken, hashPassword } from '../../util/auth.js'

import Account from '../../models/Account.js'
import Profile from '../../models/Profile.js'
const router = express.Router()

router.post('/', async (req, res) => {
    const { username, email, student_id, department, password } = req.body
    const newAccount = new Account({ username, email, student_id, department, pass_hash: hashPassword(password) })

    // console.log(newAccount._id)
    const oldAccount = await Account.findOne({ username: newAccount.username })
    if (oldAccount) {
        res.send({
            success: false,
            message: 'Username Exists'
        })
    }
    else {
        await newAccount.save()
        .catch(err => res.status(400).json("Error! " + err))

        console.log("id: ", newAccount._id)
        const newProfile = new Profile({ 
            account_id: newAccount._id,
            description: '',
            social_account: ''
         }) 

         console.log("newProfile", newProfile)
        await newProfile.save()
        .then(res.send({
            success: true,
            message: 'Sign Up Successful'
        })).catch(err => res.status(400).send({
            success: false,
            message: err
        }))
    }
})

router.post('/login', async (req, res) => {

    const account = await Account.findOne({ username: req.body.username })
    if (!account) {
        res.send({
            success: false,
            message: 'User Not Found',
            authToken: ''
        })
    }
    else if (account.pass_hash !== hashPassword(req.body.password)) {
        res.send({
            success: false,
            message: 'Login Failed',
            authToken: ''
        })
    }
    else {
        res.send({
            success: true,
            message: 'Login Successful',
            authToken: genToken(account._id)
        })
    }
})

export default router