// scorecard model
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ScoreCardSchema = new Schema({
    name: { type: String, required: true },
    subject: { type: String, required: true },
    score: { type: Number, min: 0 }
})

const ScoreCard = mongoose.model('ScoreCard', ScoreCardSchema)
module.exports = ScoreCard