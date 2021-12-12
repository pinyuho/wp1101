import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv-defaults';
import WebSocket from "ws";
import { createServer } from 'http';
import { db } from './server/mongo'
import { sendData, sendStatus } from './server/wssConnect'
import { Message } from './model/message'

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
// app.use(cors())
// app.use(express.json()) 
// app.use('/api/message', Message)

const server = createServer(app);
const wss = new WebSocket.Server({ server });

// wss: server side, ws: client side
db.once('open', () => {
    console.log("DB connected.");
    wss.on('connection', (ws) => {
        ws.onmessage = async (byteString) => {
            const { data } = byteString;
            const [task, payload] = JSON.parse(data);
            switch (task) {
                case "input": {
                    const { name, body } = payload;
                    const message = new Message({ name, body });
                    try {
                        await message.save();
                    }
                    catch (e) {
                        throw new Error("Message DB save error: " + e);
                    }
                    sendData(["output", [payload]], ws);  // send to client
                    sendStatus({
                        type: "success",
                        msg: "Message sent."
                    }, ws);
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

// app.listen(port, () =>
//     console.log(`App listening on port ${port}!`),
// );