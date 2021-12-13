import { useState, useEffect } from 'react'
import { Button, Input, Tag, message } from 'antd'

import useChat from '../hooks/useChat'
import Message from '../components/message'
import Title from '../components/title'

const ChatRoom = ({ myName }) => {
    const { status, messages, sendMessage, clearMessages } = useChat();
    const [body, setBody] = useState('');

    const displayStatus = (payload) => {
        if(payload.msg) {
            const { type, msg } = payload;
            const content = { content: msg, duration: 0.5 }
            
            switch (type) {
            case "success": {
                message.success(content);
                break;
            }
            case "error": {
                message.error(content);
                break;
            }
            default:
                break;
            }
        }
    }

    useEffect(() => {
        displayStatus(status)
    }, [status]);  // refresh after status re-rendered

    return (
    <>
        <Title>
        <h1>{myName}'s Chat Room</h1>
        <Button type="primary" danger onClick={clearMessages}>
            Clear
        </Button>
        </Title>
        <Message>
        {messages.length === 0 ? (
            <p style={{ color: '#ccc'}}> No messages... </p>
        ) : (
            messages.map(({ name, body }, i) => (
            <p key={i}>
                <Tag color="blue"> {name} </Tag> {body}
            </p>
            ))
        )}
        </Message>
        <Input.Search
        enterButton="Send"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        onSearch={(msg) => {
            if (msg === "") {
                alert('You did not type anything!');
                return;
            }
            sendMessage({ name: myName, body: msg })
            setBody('')
        }}
        placeholder="Type a message here..."
        ></Input.Search>
    </>
    );
};

export default ChatRoom;
