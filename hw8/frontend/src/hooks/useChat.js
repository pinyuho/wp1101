import { useState, useEffect } from "react";
import axios from '../api'

const client = new WebSocket("ws://localhost:4000");

const useChat = () => {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState({}); // {type, msg}

    useEffect(() => {
        async function fetchData () {
            const {
                data: messages,
            } = await axios.get('/');
            setMessages(messages)
        } 
        fetchData()   
    });  

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

    const clearMessages = async () => {
        const {
            data: payload
        } = await axios.delete("/clear");
        
        sendData(["clearReq", payload]);
        setMessages([]);
    };
    
    return {
        status,
        messages,
        sendMessage,
        clearMessages,
    };
};

export default useChat;
