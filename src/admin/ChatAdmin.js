import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import UserSelector from '../UserSelector';
import ChatControls from '../ChatControls';

const CHAT_KEY = 'chatMessages';

const Container = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 20px;
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 1000;
  /* Bordes redondeados para un mejor aspecto */
`;
const Heading = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const MessageContainer = styled.div`
  height: 300px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  padding: 10px;
  overflow-y: auto;
`;

const MessageItem = styled.div`
  margin-bottom: 10px;
`;

const ToggleButton = styled.button`
  bottom: 10px;
  right: 10px;
  background-color: #3498db;
  color: #fff;
  border: none;
  padding: 10px;
  margin-top: 20px;
  cursor: pointer;
  border-radius: 50%; /* Bordes redondeados para formar un círculo */
  position: fixed;
  /* Estilo adicional para dar apariencia de mensaje */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`;

const Traslucent = styled.div`
background: rgba(255, 255, 255, 0.8); /* Fondo con transparencia */
  border-radius: 10px; /* Bordes redondeados */
  max-width: 600px;
  margin: auto;
  padding: 20px;

  bottom: 10px;
  right: 10px;
  `;

const AdminChat = () => {
  const [messages, setMessages] = useState(() => {
    const storedMessages = JSON.parse(localStorage.getItem(CHAT_KEY)) || [];
    return storedMessages;
  });

  const [newMessage, setNewMessage] = useState('');
  const [currentUser, setCurrentUser] = useState('Administrador');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    localStorage.setItem(CHAT_KEY, JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const newMessages = [...messages, { user: currentUser, text: newMessage }];
    setMessages(newMessages);
    setNewMessage('');
  };

  const handleClearChat = () => {
    setMessages([]);
    localStorage.removeItem(CHAT_KEY);
  };

  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <Container>
      {isExpanded && (
        <Traslucent>
          <Heading>Chat del Administrador</Heading>
          <MessageContainer>
            {messages.map((message, index) => (
              <MessageItem key={index}>
                <strong>{message.user}:</strong> {message.text}
              </MessageItem>
            ))}
          </MessageContainer>
          <ChatControls
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            handleSendMessage={handleSendMessage}
            handleClearChat={handleClearChat}
          />
        </Traslucent>
      )}
      <ToggleButton onClick={handleToggleExpand}>
        {isExpanded ? 'X' : 'Abrir Chat'}
      </ToggleButton>
    </Container>
  );
};

export default AdminChat;
