import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv-defaults';
import scoreCard from './routes/api/scoreCard'
import { conn } from './mongo'

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// init middleware
app.use(cors())

// define routes
// import bodyParser from 'body-parser';
// app.use(bodyParser.json());
app.use(express.json()) 
app.use('/api/scorecard', scoreCard)


// create DB connection
conn.once('open', () => {
    console.log("DB connected.");
})

app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`),
);