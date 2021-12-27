import { useState } from 'react'
import { useMutation } from '@apollo/react-hooks';
import { Modal, Tabs, Input } from 'antd'
import { UserAddOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import Title from '../components/title'
import ChatBox from '../containers/ChatBox'
import useChatBox from '../hooks/useChatBox'

import { CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION } from '../graphql';

const Wrapper = styled.div`
    width: 100%;
    height: 300px;
    background: #eeeeee52;
    border-radius: 10px;
    margin: 20px;
    padding: 20px;
    overflow: auto;
`;

const ChatRoom = ({ me, displayStatus }) => {
    const [friend, setFriend] = useState('');
    const [body, setBody] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { chatBoxes, activeKey, addChatBox, removeChatBox, setActiveKey } = useChatBox();
  
    const [startChat] = useMutation(CREATE_CHATBOX_MUTATION);
    const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION);
    
    const showModal = () => {
      setIsModalVisible(true);
    };
    const handleCancel = () => {
      setIsModalVisible(false);
      setFriend('');
    };
  
    const onChange = (activeKey) => {
      setActiveKey(activeKey);
    };
  
    const onEdit = (targetKey, action) => {
      if (action === "add") {
        showModal();
      } else { 
        removeChatBox(targetKey);
        displayStatus({ type: "warning", msg: "ChatBox Deleted." });

      }
    };
  
    const handleAddChatBox = (e) => {
      if (friend === '') {
          alert('You did not type anything!');
          e.preventDefault();
          return;
      }
      e.preventDefault();
  
      startChat({
          variables: {
            name1: me,
            name2: friend,
          }
      });
          
      addChatBox({title: friend});
      setIsModalVisible(false);
      // displayStatus({ type: "success", msg: "ChatBox Created!" });
      setFriend('');
    }
  
    const handleSndMsg = (msg) => {
      if (msg === "") {
          alert('You did not type anything!');
          return;
      }
      const thisChatBox = chatBoxes.find((ChatBox) => ChatBox.key === activeKey)
      sendMessage({
        variables: { 
          from: me, 
          to: thisChatBox.title, 
          message: msg, 
        }
      })
      displayStatus({ type: "success", msg: "Message Sent!" });
      setBody('');
    }

    return (
    <>
        <Title>
            <h1>{me}'s Chat Room</h1>
        </Title>

        <Wrapper>
         <Tabs
          type="editable-card"
          onChange={onChange}
          activeKey={activeKey}
          onEdit={onEdit}
        >
          { 
            chatBoxes.map((chatBox) => (
                <Tabs.TabPane tab={chatBox.title} key={chatBox.key}>
                    <ChatBox me={me} friend={chatBox.title}/> 
                </Tabs.TabPane>))
          }
        </Tabs>
  
        <Modal 
          animation="false"
          title="Create ChatBox" 
          visible={isModalVisible} 
          onOk={handleAddChatBox} 
          onCancel={handleCancel}
        >
          <form onSubmit={handleAddChatBox}>
            <Input 
                placeholder="Username" 
                size="large"
                prefix={<UserAddOutlined />}
                value={friend}
                onChange={(e) => setFriend(e.target.value)}
            />
          </form> 
        </Modal>
      </Wrapper>
  
      {/* TextField */}
      <Input.Search
        enterButton="Send"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        onSearch={handleSndMsg}
        placeholder="Type a message here..."
      /> 
    </>
    );
};

export default ChatRoom;
