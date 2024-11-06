import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FiSend } from 'react-icons/fi';
import { RiRobot2Line } from 'react-icons/ri';
import { FaUser } from 'react-icons/fa';
import TypeWriter from './TypeWriter';

// 添加 Message 接口定义
interface Message {
  role: string;
  content: string;
  isTyping?: boolean;
}

interface AIChatProps {
  mode: 'interview' | 'story' | 'fitness';
  initialMessage: string;
  systemPrompt: string;
}

const api = axios.create({
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const MAX_RETRIES = 3;
const RETRY_DELAY = 2000;

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const AIChat: React.FC<AIChatProps> = ({ mode, initialMessage, systemPrompt }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [currentTypingIndex, setCurrentTypingIndex] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (initialMessage) {
      setMessages([{ role: 'assistant', content: initialMessage }]);
    }
  }, [initialMessage]);

  const callAPI = async (payload: any, retryCount = 0): Promise<any> => {
    try {
      const response = await api.post(process.env.REACT_APP_API_URL || '', payload, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
      });
      return response;
    } catch (error: any) {
      if (
        retryCount < MAX_RETRIES &&
        (error.code === 'ECONNABORTED' || error.response?.status === 504)
      ) {
        await sleep(RETRY_DELAY);
        return callAPI(payload, retryCount + 1);
      }
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    setError('');

    try {
      const response = await callAPI({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          ...newMessages.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'assistant',
            content: msg.content,
          })),
        ],
        temperature: 0.7,
        max_tokens: 1000,
      });

      const aiResponse = response.data.choices[0]?.message?.content;
      if (aiResponse) {
        const newMessage = { role: 'assistant', content: aiResponse, isTyping: true };
        setMessages([...newMessages, newMessage]);
        setCurrentTypingIndex(newMessages.length);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error?.message || error.message || '请求失败，请稍后重试';
      setError(`AI响应错误: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTypeWriterComplete = (index: number) => {
    setMessages(prev =>
      prev.map((msg, i) => (i === index ? { ...msg, isTyping: false } : msg))
    );
    setCurrentTypingIndex(null);
  };

  return (
    <div className="ai-chat-container">
      <div className="chat-header">
        <RiRobot2Line className="robot-icon" />
        <h2>AI 助手</h2>
      </div>

      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="welcome-message">
            <RiRobot2Line className="welcome-icon" />
            <TypeWriter
              text="你好！我是AI助手，很高兴为你服务。请问有什么我可以帮你的吗？"
              speed={30}
            />
          </div>
        )}

        {messages.map((msg, index) => (
          <div key={index} className={`message-wrapper ${msg.role}`}>
            <div className="message-icon">
              {msg.role === 'assistant' ? <RiRobot2Line /> : <FaUser />}
            </div>
            <div className="message-content">
              <div className="message-bubble">
                {msg.role === 'assistant' && msg.isTyping ? (
                  <TypeWriter
                    text={msg.content}
                    speed={30}
                    onComplete={() => handleTypeWriterComplete(index)}
                  />
                ) : (
                  msg.content
                )}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="loading-wrapper">
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="chat-input-form">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="输入你的问题..."
          disabled={isLoading}
          className="chat-input"
        />
        <button type="submit" disabled={isLoading || !input.trim()} className="send-button">
          <FiSend />
        </button>
      </form>
    </div>
  );
};

export default AIChat;
