import React, { useState, useEffect, useRef } from 'react';
import { X, Send, BrainCog, ThumbsUp, ThumbsDown } from 'lucide-react';

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages([
          { 
            text: "Hello! I'm an AI assistant powered by advanced language models. How can I help you today?", 
            sender: 'ai',
            timestamp: new Date(),
            id: Date.now(),
            feedback: null
          }
        ]);
      }, 1500);
    }
  }, [isOpen, messages.length]);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user', timestamp: new Date(), id: Date.now() }]);
      setInput('');
      setIsTyping(true);
      // Simulate AI response
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, { 
          text: "As an AI, I'm here to assist you. What would you like to know or discuss?", 
          sender: 'ai', 
          timestamp: new Date(),
          id: Date.now(),
          feedback: null
        }]);
      }, 2000);
    }
  };

  const handleFeedback = (messageId, isHelpful) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, feedback: isHelpful } : msg
    ));
    console.log(`Feedback for message ${messageId}: ${isHelpful ? 'Helpful' : 'Not Helpful'}`);
    // Here you would typically send this feedback to your server
  };

  const formatTimestamp = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Styles
  const widgetStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 1000,
    fontFamily: 'Arial, sans-serif',
  };

  const buttonStyle = {
    padding: '10px 20px',
    borderRadius: '20px',
    backgroundColor: '#4A90E2',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease, background-color 0.3s ease',
    fontWeight: 'bold',
  };

  const chatWindowStyle = {
    position: 'absolute',
    bottom: '80px',
    right: '0',
    width: '350px',
    height: '600px',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    transition: 'opacity 0.3s ease, transform 0.3s ease',
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
    pointerEvents: isOpen ? 'auto' : 'none',
  };

  const headerStyle = {
    backgroundColor: '#4A90E2',
    color: 'white',
    padding: '10px',
    height: '60px',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: 'bold',
  };

  const messageContainerStyle = {
    flex: 1,
    overflowY: 'auto',
    padding: '10px',
  };

  const inputContainerStyle = {
    display: 'flex',
    padding: '10px',
    borderTop: '1px solid #eee',
  };

  const inputStyle = {
    flex: 1,
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
  };

  const sendButtonStyle = {
    marginLeft: '10px',
    backgroundColor: '#4A90E2',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const messageStyle = (sender) => ({
    maxWidth: '70%',
    padding: '8px 12px',
    borderRadius: '18px',
    marginBottom: '5px',
    backgroundColor: sender === 'user' ? '#E3F2FD' : '#F5F5F5',
    alignSelf: sender === 'user' ? 'flex-end' : 'flex-start',
    color: '#333',
    animation: 'fadeIn 0.5s ease',
    fontSize: '14px',
    lineHeight: '1.4',
  });

  const timestampStyle = {
    fontSize: '12px',
    color: '#888',
    marginBottom: '2px',
  };

  const feedbackContainerStyle = {
    display: 'flex',
    justifyContent: 'flex-start',
    marginTop: '5px',
    marginBottom: '15px',
  };

  const feedbackButtonStyle = (isSelected, isHelpful) => ({
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    marginRight: '10px',
    display: 'flex',
    alignItems: 'center',
    color: isSelected ? (isHelpful ? '#4CAF50' : '#F44336') : '#888',
    fontSize: '12px',
    transition: 'color 0.3s ease',
  });

  const typingIndicatorStyle = {
    display: 'flex',
    padding: '10px',
    alignItems: 'center',
    animation: 'fadeIn 0.5s ease',
  };

  return (
    <div style={widgetStyle}>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-5px); }
            60% { transform: translateY(-3px); }
          }
          .typing-dot {
            width: 8px;
            height: 8px;
            background-color: #4A90E2;
            border-radius: 50%;
            display: inline-block;
            margin: 0 2px;
            animation: bounce 1.4s infinite ease-in-out;
          }
          .typing-dot:nth-child(1) { animation-delay: 0s; }
          .typing-dot:nth-child(2) { animation-delay: 0.2s; }
          .typing-dot:nth-child(3) { animation-delay: 0.4s; }
          ::-webkit-scrollbar {
            width: 6px;
          }
          ::-webkit-scrollbar-track {
            background: #f1f1f1;
          }
          ::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 3px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
        `}
      </style>
      <div style={chatWindowStyle}>
        <div style={headerStyle}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <BrainCog size={24} style={{ marginRight: '8px' }} />
            <span>AI Assistant</span>
          </div>
          <X onClick={toggleChat} style={{ cursor: 'pointer' }} />
        </div>
        <div style={messageContainerStyle}>
          {messages.map((msg) => (
            <React.Fragment key={msg.id}>
              {msg.sender === 'ai' && (
                <div style={timestampStyle}>
                  Sent at {formatTimestamp(msg.timestamp)}, Answered by AI
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={messageStyle(msg.sender)}>
                  {msg.sender === 'ai' && <BrainCog size={16} style={{ marginRight: '5px', verticalAlign: 'middle' }} />}
                  {msg.text}
                </div>
              </div>
              {msg.sender === 'ai' && (
                <div style={feedbackContainerStyle}>
                  <button 
                    style={feedbackButtonStyle(msg.feedback === true, true)}
                    onClick={() => handleFeedback(msg.id, true)}
                  >
                    <ThumbsUp size={16} style={{ marginRight: '5px' }} />
                    Helpful
                  </button>
                  <button 
                    style={feedbackButtonStyle(msg.feedback === false, false)}
                    onClick={() => handleFeedback(msg.id, false)}
                  >
                    <ThumbsDown size={16} style={{ marginRight: '5px' }} />
                    Not Helpful
                  </button>
                </div>
              )}
            </React.Fragment>
          ))}
          {isTyping && (
            <div style={typingIndicatorStyle}>
              <BrainCog size={16} style={{ marginRight: '5px' }} />
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={sendMessage} style={inputContainerStyle}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask the AI assistant..."
            style={inputStyle}
          />
          <button type="submit" style={sendButtonStyle}>
            <Send size={20} />
          </button>
        </form>
      </div>
      <div 
        style={{
          ...buttonStyle,
          transform: isOpen ? 'scale(0.95)' : 'scale(1)',
          backgroundColor: isOpen ? '#3A7BC8' : '#4A90E2',
        }} 
        onClick={toggleChat}
      >
        <BrainCog size={20} style={{ marginRight: '8px' }} />
        Ask AI
      </div>
    </div>
  );
};

export default AIChatWidget;