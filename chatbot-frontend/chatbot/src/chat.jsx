import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const chatWindowRef = useRef(null);

  useEffect(() => {
    fetchMessages();

    const handleBeforeUnload = () => {
      clearChat();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/messages');
      setMessages(res.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const clearChat = async () => {
    try {
      await axios.delete('http://localhost:3001/api/messages');
      setMessages([]);
    } catch (error) {
      console.error('Error clearing chat:', error);
    }
  };

  const sendMessage = async () => {
    if (newMessage.trim() === '') return;

    try {
      await axios.post('http://localhost:3001/api/messages', { sender: 'User', message: newMessage });
      setNewMessage('');
      fetchMessages();

      const chatbotResponse = await axios.post('http://localhost:3001/api/query', { query: newMessage });
      if (chatbotResponse.data.length > 0) {
        await axios.post('http://localhost:3001/api/messages', { sender: 'Chatbot', message: chatbotResponse.data[0].answer });
        fetchMessages();
      } else {
        await axios.post('http://localhost:3001/api/messages', { sender: 'Chatbot', message: "I'm sorry, I don't understand that." });
        fetchMessages();
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chat-container">
      <h1>Chatbot</h1>
      <div className="chat-window" ref={chatWindowRef}>
        {messages.map((msg) => (
          <div
            className={`message ${msg.sender === 'User' ? 'user' : 'chatbot'}`}
            key={msg.message_id}
          >
            <strong>{msg.sender}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <div className="input-container">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          placeholder="Type a message..."
          className="input-field"
          rows={3}
        />
        <div className="button-group">
          <button onClick={sendMessage} className="send-button">
            <svg viewBox="0 0 24 24" style={{ width: '20px', height: '20px' }}>
              <path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
            Send
          </button>
          <button onClick={clearChat} className="clear-button">
            Clear Chat
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
