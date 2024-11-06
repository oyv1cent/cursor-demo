import React, { useEffect, useRef } from 'react';

const Particles: React.FC = () => {
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;

    // 创建粒子
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';

      // 随机位置
      particle.style.left = `${Math.random() * 100}vw`;
      particle.style.top = `${Math.random() * 100}vh`;

      // 随机大小
      const size = Math.random() * 3;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      // 随机动画持续时间
      particle.style.animation = `float ${10 + Math.random() * 20}s infinite linear`;

      container.appendChild(particle);

      // 动画结束后移除粒子
      setTimeout(() => {
        particle.remove();
      }, 30000);
    };

    // 初始创建多个粒子
    for (let i = 0; i < 50; i++) {
      createParticle();
    }

    // 定期创建新粒子
    const interval = setInterval(createParticle, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div ref={particlesRef} className="particles" />;
};

export default Particles;
