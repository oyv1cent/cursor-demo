import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Particles from './components/Particles';
import './styles/AIChat.css';

// 使用 React.lazy 进行代码分割
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const History = React.lazy(() => import('./pages/History'));
const AIChat = React.lazy(() => import('./components/AIChat'));

// 加载中的组件
const LoadingFallback = () => (
  <div className="loading-container">
    <div className="loading-spinner">
      <div className="loading-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p>加载中...</p>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="root-container">
        <Particles />
        <nav className="nav-bar">
          <Link to="/">首页</Link>
          <Link to="/about">关于AI</Link>
          <Link to="/history">使用统计</Link>
        </nav>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/history" element={<History />} />
            <Route 
              path="/chat/:mode" 
              element={
                <AIChat 
                  mode="interview" 
                  initialMessage="你好，我是AI助手" 
                  systemPrompt="你是一个AI助手"
                />
              } 
            />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
