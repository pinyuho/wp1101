import axios from 'axios';
import dotenv from 'dotenv-defaults';

dotenv.config();
const port = process.env.PORT || 4000;

const instance = axios.create({
  baseURL: `http://localhost:${port}/api`,
});

export default instance;

// instance.get('/hi').then((data) => console.log(data));
