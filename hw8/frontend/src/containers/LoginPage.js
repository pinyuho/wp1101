import { useState, useEffect } from 'react'
import { Input } from 'antd'

import Title from '../components/title'


const LoginPage = ({ handleLogin }) => {
    const [username, setUsername] = useState(() => {
        // getting stored value
        const saved = localStorage.getItem("username");
        const initialValue = JSON.parse(saved);
        return initialValue || "";
    });

    useEffect(() => {
        // storing input name
        localStorage.setItem("username", JSON.stringify(username));
      });

    return (
    <>
        <Title>
        <h1>My Chat Room</h1>
        </Title>
        <Input.Search
        enterButton="Sign In"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onSearch={(msg) => {
            handleLogin(msg);
        }}
        placeholder="Type your username here..."
        ></Input.Search>
    </>
    );
};

export default LoginPage;
