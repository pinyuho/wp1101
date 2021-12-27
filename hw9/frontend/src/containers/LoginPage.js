import { useState, useEffect } from 'react'
import { Input } from 'antd'
import { UserOutlined } from '@ant-design/icons';

import Title from '../components/title'


const LoginPage = ({ handleLogin }) => {
    const [me, setMe] = useState(() => {
        // getting stored value
        const saved = localStorage.getItem("me");
        const initialValue = JSON.parse(saved);
        return initialValue || "";
    });

    useEffect(() => {
        // storing input name
        localStorage.setItem("me", JSON.stringify(me));
      });

    return (
    <>
        <Title>
        <h1>My Chat Room</h1>
        </Title>
        <Input.Search
        enterButton="Sign In"
        size="large"
        prefix={<UserOutlined />}
        value={me}
        onChange={(e) => setMe(e.target.value)}
        onSearch={(msg) => {
            handleLogin(msg);
        }}
        placeholder="Type your me here..."
        ></Input.Search>
    </>
    );
};

export default LoginPage;
