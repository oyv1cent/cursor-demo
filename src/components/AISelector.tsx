import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RiCodeBoxLine, RiBookLine, RiRunLine } from 'react-icons/ri';

const AISelector: React.FC = () => {
  const navigate = useNavigate();

  const handleSelect = (type: string) => {
    // 增加使用次数
    const countKey = `${type}_count`;
    const currentCount = parseInt(localStorage.getItem(countKey) || '0');
    localStorage.setItem(countKey, (currentCount + 1).toString());
    
    // 导航到聊天页面
    navigate(`/chat/${type}`);
  };

  return (
    <div className="ai-selector">
      <div className="selector-title">
        <h2>选择你的 AI 助手</h2>
        <p>每个助手都经过专门训练，以提供最佳帮助</p>
      </div>
      <div className="selector-grid">
        <button className="selector-card interview" onClick={() => handleSelect('interview')}>
          <RiCodeBoxLine className="card-icon" />
          <h3>前端面试官</h3>
          <p>模拟面试情境，提供专业建议</p>
        </button>

        <button className="selector-card story" onClick={() => handleSelect('story')}>
          <RiBookLine className="card-icon" />
          <h3>小说助手</h3>
          <p>帮助构思情节，完善人物设定</p>
        </button>

        <button className="selector-card fitness" onClick={() => handleSelect('fitness')}>
          <RiRunLine className="card-icon" />
          <h3>运动助手</h3>
          <p>制定训练计划，提供健康建议</p>
        </button>
      </div>
    </div>
  );
};

export default AISelector;
