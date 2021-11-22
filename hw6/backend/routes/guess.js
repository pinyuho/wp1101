import express from 'express'
import { genCode, getCode, setCode, getSettedCode, genRandomCode, genAB } from '../core/getCode'

const router = express.Router()

router.post('/start', (_, res) => {
    genCode()
    res.json({ msg: 'The game has started.', code: getCode() })
})

router.post('/set', (req, res) => {
    const code = req.body.code
    // console.log(code)
    // check if NOT a 4 digit num
    if (code.length != 4) {
        res.status(406).send({ msg: `Error: "${req.body.code}" is not a valid input (4 digit number)` })
    }

    setCode(code)

    res.json({ msg: 'The code has set.', code: getSettedCode() })
})

router.post('/restart', (_, res) => {
    genCode()
    res.json({ msg: 'The game has restarted.', number: getCode() })
})

router.get('/guess', (req, res) => {
    const code = getCode()
    const guessed = req.query.code

    // check if NOT a 4 digit num
    if (guessed.length != 4) {
        res.status(406).send({ msg: `Error: "${req.query.code}" is not a valid input (4 digit number)` })
    }
    
    const guess = genAB(code, guessed)
    let guessCom = new Object()
    const computerGuess = genRandomCode()
    // console.log(computerGuess)
    let computerWon = false
    if (getSettedCode() === computerGuess) {
        computerWon = true
    } else {
        guessCom = genAB(getSettedCode(), computerGuess)
    }

    res.json({ 
        msg: `${guess.cntA}A${guess.cntB}B, \nThe computer guessed ${computerGuess}, ${guessCom.cntA}A${guessCom.cntB}B`,
        settedCode: getSettedCode(), 
        computerWon: computerWon
    })
})

export default router