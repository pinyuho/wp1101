import express from 'express'

// scorecard model
const scoreCard = require('../../models/scoreCard')
const router = express.Router()

router.post('/', async (req, res) => {
    const newScoreCard = new scoreCard(req.body)
    const filter = {
        name: newScoreCard.name,
        subject: newScoreCard.subject
    };
    const update = { score: newScoreCard.score };


    const oldScoreCard = await scoreCard.findOne(filter)
    if (oldScoreCard) {
        await scoreCard.findOneAndUpdate(filter, update, {
            new: true
        }).then(res.json({
            message: `Updating (${newScoreCard.name}, ${newScoreCard.subject}, ${newScoreCard.score})`,
            card: newScoreCard
            })
        ).catch(err => res.status(400).json("Error! " + err))
    }
    else {
        await newScoreCard.save()
        .then(res.json({
            message: `Adding (${newScoreCard.name}, ${newScoreCard.subject}, ${newScoreCard.score})`,
            card: newScoreCard
            })
        ).catch(err => res.status(400).json("Error! " + err))
    }

})

router.get('/', async (req, res) => {
    const filter = {
        [req.query.type]: req.query.queryString
    }

    let response = {
        messages: [],
        message: ''
    }

    await scoreCard.find(filter)
    .then(function(scoreCards) {
        if (scoreCards.length !== 0) {
            response.messages = scoreCards.map(scoreCard => `(${scoreCard.name}, ${scoreCard.subject}, ${scoreCard.score})`)
        } else {
            response.message = `${req.query.type} (${req.query.queryString}) not found!`
        }
    }).catch(err => res.status(400).json('Error! ' + err))
    
    
    res.json(response)
    
})

router.delete('/clear-db', async(_, res) => {
    await scoreCard.deleteMany({})
        .then(res.json({ message: 'Database cleared' }))
        .catch(err => res.status(400).json('Error! ' + err))
})

export default router