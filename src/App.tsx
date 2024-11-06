import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import History from './pages/History';
import AIChat from './components/AIChat';
import Particles from './components/Particles';
import './styles/AIChat.css';

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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/history" element={<History />} />
          <Route path="/chat/:mode" element={<AIChat />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
