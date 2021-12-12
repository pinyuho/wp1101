import './App.css'
import { useState, useEffect } from 'react'
import { Button, Input, Tag, Message, message } from 'antd'
import useChat from '../hook/useChat'

function App() {
  const { status, messages, sendMessage } = useChat();
  const [username, setUsername] = useState('');
  const [body, setBody] = useState('');  // textbody

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
    <div className="App">
      <div className="App-title">
        <h1>Simple Chat</h1>
        <Button type="primary" danger >
          Clear
        </Button>
      </div>
      <div className="App-messages">
        {messages.length === 0 ? (
          <p style={{ color: '#ccc'}}> No messages... </p>
        ) : (
          messages.map(({ name, body }, i) => (
            <p key={i}>
              <Tag color="blue"> {name} </Tag> {body}
            </p>
          ))
        )}
      </div>
      <Input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginBottom: 10 }}
      ></Input>
      <Input.Search
        enterButton="Send"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        onSearch={(msg) => {
          sendMessage({ name: username, body: msg })
          setBody('')
        }}
        placeholder="Type a message here..."
      ></Input.Search>
    </div>
  )
}

export default App
