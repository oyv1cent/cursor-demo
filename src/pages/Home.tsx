import React from 'react';
import AISelector from '../components/AISelector';
import Particles from '../components/Particles';

const Home: React.FC = () => {
  return (
    <div className="app-container">
      <h1 className="page-title">AI 智能助手</h1>
      <AISelector />
    </div>
  );
};

export default Home; 