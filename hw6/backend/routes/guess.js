import express from 'express'
import { getNumber, genNumber } from '../core/getNumber'

const router = express.Router()

function roughScale(x, base) {
    const parsed = parseInt(x, base);
    if (isNaN(parsed)) { return 0; }
    return parsed;
}

router.post('/start', (_, res) => {
    genNumber(1, 100) // 用亂數產生一個猜數字的 number 
    res.json({ msg: 'The game has started.', number: getNumber() })
})

router.post('/restart', (_, res) => {
    genNumber(1, 100) // 用亂數產生一個猜數字的 number 
    res.json({ msg: 'The game has restarted.', number: getNumber() })
})

router.get('/guess', (req, res) => {
    const number = getNumber()
    const guessed = roughScale(req.query.number, 10)
    // check if NOT a num or not in range [1,100]
    if (!guessed || guessed < 1 || guessed > 100) {
        res.status(406).send({ msg: `Error: "${req.query.number}" is not a valid number (1 - 100)` })
    } else if (number === guessed) { 
        res.json({ msg: 'Equal' })
    } else if (number > guessed) {
        res.json({ msg: 'Bigger' })
    } else if (number < guessed) {
        res.json({ msg: 'Smaller' })
    }
})

export default router