import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv-defaults';

import appRoutes from './routes/index'
import { conn } from './mongo'

dotenv.config();

const app = express();
const port = process.env.PORT || 80;

// init middleware
app.use(cors())
app.use(express.json()) 
appRoutes(app)


// create DB connection
conn.once('open', () => {
    console.log("DB connected.");
})

app.listen(port, () =>
    console.log(`App listening on port ${port}!`),
);