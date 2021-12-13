import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv-defaults';
import routes from './routes/api'
import WebSocket from "ws";
import { createServer } from 'http';
import { db } from './servers/mongo'
import { broadcastMessage, broadcastStatus } from './routes/socket'

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

const server = createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors())
app.use(express.json()) 
app.use('/api/message', routes)

const Message = require('./models/message')
db.once('open', () => {
    console.log("DB connected.");
    wss.on('connection', (ws) => {
        ws.onmessage = async (byteString) => {
            const { data } = byteString;
            const [task, payload] = JSON.parse(data);
            switch (task) {
                case "input": {
                    const { name, body } = payload;

                    // save to DB
                    const message = new Message({ name, body });
                    try {
                        await message.save();
                    }
                    catch (e) {
                        throw new Error("Message DB save error: " + e);
                    }
                    broadcastMessage(["output", [payload]], {
                        type: "success",
                        msg: "Message sent."
                    }, wss)
                    break;
                }
                case "clearReq": {
                    const status = payload;
                    broadcastStatus(status, wss)
                    break;
                }
                default:
                    break;
            };
        }
    })

    server.listen(port, () =>
        console.log(`Server socket listening on http://localhost:${port}!`),
    );
})
