import { useState } from "react";

let newTabIndex = 0;
const useChatBox = () => {
    const [chatBoxes, setChatBoxes] = useState([]);
    const [activeKey, setActiveKey] = useState(`newTab${newTabIndex}`);
        
    const addChatBox = ({ title }) => { 
        console.log("addChatBox", title)
        newTabIndex++;
        const tempActiveKey = `newTab${newTabIndex}`;
        setChatBoxes([...chatBoxes, { 
          title: title, 
          key: tempActiveKey 
        }])
        setActiveKey(tempActiveKey)
    };

    const removeChatBox = (targetKey) => {
        let newActiveKey = activeKey;
        let lastIndex;
        chatBoxes.forEach((ChatBox, i) => {
            if (ChatBox.key === targetKey) {
              lastIndex = i - 1;
            }
        });
        const newchatBoxes = chatBoxes.filter((ChatBox) => ChatBox.key !== targetKey);
        if (newchatBoxes.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
              newActiveKey = newchatBoxes[lastIndex].key;
            } else {
              newActiveKey = newchatBoxes[0].key;
            }
        }
        setChatBoxes(newchatBoxes)
        setActiveKey(newActiveKey)
    };
    
    return {
        chatBoxes,
        activeKey,
        addChatBox,
        removeChatBox,
        setActiveKey,
    };
};

export default useChatBox;
