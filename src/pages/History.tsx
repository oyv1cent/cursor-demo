import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const History: React.FC = () => {
  // 从本地存储获取使用次数
  const getUsageData = () => {
    const interview = parseInt(localStorage.getItem('interview_count') || '0');
    const story = parseInt(localStorage.getItem('story_count') || '0');
    const fitness = parseInt(localStorage.getItem('fitness_count') || '0');

    return [
      { name: '面试助手', count: interview },
      { name: '小说助手', count: story },
      { name: '运动助手', count: fitness }
    ];
  };

  return (
    <div className="history-container">
      <h1 className="page-title">使用统计</h1>
      <div className="chart-container">
        <BarChart width={600} height={400} data={getUsageData()}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#61dafb" name="使用次数" />
        </BarChart>
      </div>
    </div>
  );
};

export default History; 