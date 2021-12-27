import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import Message from '../components/message'
import { CHATBOX_QUERY, MESSAGE_SUBSCRIPTION } from '../graphql';

const Messages = styled.div`
    display: flex;
    flex-direction: column;
    overflow: auto;
`;

const ChatBox = ({ me, friend }) => {
    const messagesFooter = useRef(null);

    const { loading, error, data, subscribeToMore } = useQuery(CHATBOX_QUERY, {
        variables: {
            name1: me,
            name2: friend,
        }
    });

    const scrollToBottom = () => {
        messagesFooter.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        scrollToBottom();
    }, [data]);

    useEffect(() => {
      try {
        subscribeToMore({
          document: MESSAGE_SUBSCRIPTION,
          variables: { from: me, to: friend },
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            const newMessage = subscriptionData.data.message.data;

            console.log(newMessage);
            console.log(prev);

            return {
              chatBox: {
                messages: [...prev.chatBox.messages, newMessage],
              },
            };
          },
        });
      } catch (e) {}
    }, [subscribeToMore, me, friend]);

    if (loading) return <p> loading... </p>;

    return (
        <Messages>
          {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error :(((</p>
            ) : (
              data.chatBox.messages.map(({ sender: { name }, body }, i) => (
                  <Message me={me} name={name} body={body} key={name + body + i}/>))
            )
          }
            <div ref={messagesFooter} />
        </Messages>
    );
};

export default ChatBox
