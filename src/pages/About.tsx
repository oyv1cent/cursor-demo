import React from 'react';

const About: React.FC = () => {
  const milestones = [
    {
      year: '1950s',
      title: 'AI的诞生',
      description: '图灵测试提出，人工智能概念正式确立'
    },
    {
      year: '1960s-1970s',
      title: '早期发展',
      description: '专家系统出现，AI开始在特定领域展现能力'
    },
    {
      year: '1980s-1990s',
      title: '机器学习兴起',
      description: '神经网络理论发展，为深度学习奠定基础'
    },
    {
      year: '2010s',
      title: '深度学习革命',
      description: '深度学习取得突破性进展，AI能力大幅提升'
    },
    {
      year: '2020s',
      title: '大语言模型时代',
      description: 'GPT等大语言模型出现，AI与人类交互更自然'
    }
  ];

  return (
    <div className="about-container">
      <h1 className="page-title">关于 AI</h1>
      <div className="about-content">
        <section className="intro-section">
          <h2>什么是 AI？</h2>
          <p>
            人工智能（AI）是计算机科学的一个分支，致力于创造能够模拟人类智能的系统。
            现代AI技术已经能够理解语言、识别图像、做出决策，并在多个领域辅助人类工作。
          </p>
        </section>
        
        <section className="timeline-section">
          <h2>发展历程</h2>
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-year">{milestone.year}</div>
                <div className="timeline-content">
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About; 