import { useState } from 'react'
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
  const [myName, setMyName] = useState('');

  const handleLogin = (username) => {
    if (username === "") {
      alert('You did not type anything!');
      return;
    }
    setMyName(username);
    setStartChat(true);
  }
  

  return (
    <Wrapper>
      {startChat ? 
        <ChatRoom myName={myName} />
        : <LoginPage handleLogin={handleLogin} />
      }
    </Wrapper>
  )
}

export default App
