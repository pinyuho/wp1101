import mongoose from 'mongoose';
import dotenv from 'dotenv-defaults';

dotenv.config();

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const conn = mongoose.connection

export { conn }

