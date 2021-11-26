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
        )
    }
    else {
        await newScoreCard.save()
        .then(res.json({
            message: `Adding (${newScoreCard.name}, ${newScoreCard.subject}, ${newScoreCard.score})`,
            card: newScoreCard
            })
        )
        .catch(err => res.status(400).json("Error! " + err))
    }

})

router.get('/', async (req, res) => {
    // let name = req.query.name;
    // let subject = req.query.subject;

    let response = {
        messages: 'messages here',
        message: 'error message'
    }

    if (req.query.type === 'name') {
        await scoreCard.find({
            name: req.query.queryString
        }).then(function(scoreCards) {
            if (scoreCards.length !== 0) {
                res.json( scoreCards );
            } else {
                res.json(`${req.query.type} (${req.query.queryString}) not found!`);
            }
        }).catch(err => res.status(400).json('Error! ' + err))
    }
    else if (req.query.type === 'subject') {
        await scoreCard.find({
            subject: req.query.queryString
        }).then(function(scoreCards) {
            if (scoreCards.length !== 0) {
                res.json( scoreCards );
            } else {
                res.json(`${req.query.type} (${req.query.queryString}) not found!`);
            }
        }).catch(err => res.status(400).json('Error! ' + err))
    }
    else {
        await scoreCard.find()  // using .find() without a paramter will match on all scorecard instances
          .then(allScoreCards => res.json(allScoreCards))
          .catch(err => res.status(400).json('Error! ' + err))
    }
    
    //res.json(response)
    
})

router.delete('/clear-db', async(_, res) => {
    await scoreCard.remove({})
        .then(res.json({ message: 'Database cleared' }))
        .catch(err => res.status(400).json('Error! ' + err))
})

export default router