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

    let response = {
        cards: [],
        message: ''
    }

    const oldScoreCard = await scoreCard.findOne(filter)
    if (oldScoreCard) {
        await scoreCard.findOneAndUpdate(filter, update, {new: true})
        .then(response.message = `Updating (${newScoreCard.name}, ${newScoreCard.subject}, ${newScoreCard.score})`)
        .catch(err => res.status(400).json("Error! " + err))
    }
    else {
        await newScoreCard.save()
        .then(response.message = `Adding (${newScoreCard.name}, ${newScoreCard.subject}, ${newScoreCard.score})`)
        .catch(err => res.status(400).json("Error! " + err))
    }

    console.log('name:', newScoreCard.name)

    await scoreCard.find({
        name: newScoreCard.name
    }).then(function(scoreCards) {
        response.cards = scoreCards
    })

    console.log(response.cards)
    res.json(response)

})

router.get('/', async (req, res) => {
    const filter = {
        [req.query.type]: req.query.queryString
    }

    let response = {
        cards: [],
        message: ''
    }

    await scoreCard.find(filter)
    .then(function(scoreCards) {
        if (scoreCards.length !== 0) {
            response.cards = scoreCards
            // response.cards = scoreCards.map(scoreCard => `(${scoreCard.name}, ${scoreCard.subject}, ${scoreCard.score})`)
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