import { useState } from 'react'
import { message } from 'antd'

import styled from "styled-components";

import LoginPage from '../containers/LoginPage'
import ChatRoom from '../containers/ChatRoom'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 500px;
  margin: auto;
`;

function App() {
  const [startChat, setStartChat] = useState(false);
  const [me, setMe] = useState('');

  const handleLogin = (username) => {
    if (username === "") {
      alert('You did not type anything!');
      return;
    }
    setMe(username);
    setStartChat(true);
    // displayStatus({ type: "success", msg: "User Logged In." });
  }

  const displayStatus = (payload) => {
    if (payload.msg) {
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
          case "warning": {
            message.warning(content);
            break;
          }
          case "info": {
            message.info(content);
            break;
          }
          default:
              break;
        }
    }
  }
  
  return (
    <Wrapper>
      {startChat ? 
        <ChatRoom me={me} displayStatus={displayStatus}/>
        : <LoginPage handleLogin={handleLogin} />
      }
    </Wrapper>
  )
}

export default App
