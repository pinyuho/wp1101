import { useState } from "react";

const client = new WebSocket("ws://localhost:4000");

const useChat = () => {
    const [messages, setMessages] = useState([
        { name: "Polly", body: "Hello" },
        { name: "Evan", body: "Hi?" },
    ]);
    const [status, setStatus] = useState({});

    client.onmessage = (byteString) => {
        const { data } = byteString;
        const [task, payload] = JSON.parse(data);
        switch (task) {
            case "output": {
                setMessages(() => [...messages, ...payload]);
                break;
            }
            case "status": {
                setStatus(payload);
                break;
            }
            default:
                break;
        }
    }

    const sendData = async (data) => {
        await client.send(JSON.stringify(data));
    }

    const sendMessage = (payload) => {
        sendData(["input", payload]);
    };

    return {
        status,
        messages,
        sendMessage,
    };
};

export default useChat;
