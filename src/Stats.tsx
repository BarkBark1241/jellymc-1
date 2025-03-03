import { useEffect, useState } from 'react';

function Stats() {
  const [iframeHeight, setIframeHeight] = useState('100vh');
  const statsUrl = import.meta.env.VITE_STATS_IFRAME_URL || 'https://stats.jellymc.co';

  useEffect(() => {
    // Adjust iframe height based on window size
    const updateHeight = () => {
      setIframeHeight(`${window.innerHeight}px`);
    };
    
    // Set initial height
    updateHeight();
    
    // Update height on window resize
    window.addEventListener('resize', updateHeight);
    
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  useEffect(() => {
    const colors = (import.meta.env.VITE_PARTICLE_COLORS || '#ff0000').split(',');
    const speedPercentage = Math.min(Math.max(Number(import.meta.env.VITE_PARTICLE_SPEED) || 50, 1), 100);
    const particleSpeed = 15000 - (speedPercentage * 135);
    
    const spawnPercentage = Math.min(Math.max(Number(import.meta.env.VITE_PARTICLE_SPAWN_RATE) || 50, 1), 100);
    const spawnRate = 1000 - (spawnPercentage * 9.5);
    const particleSize = Number(import.meta.env.VITE_PARTICLE_SIZE) || 1.5;
    const particleOpacity = Number(import.meta.env.VITE_PARTICLE_OPACITY) || 0.4;
    const multiplier = Number(import.meta.env.VITE_PARTICLE_COUNT_MULTIPLIER) || 1;
    
    const createParticle = () => {
      for (let i = 0; i < multiplier; i++) {
        const particle = document.createElement('div');
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomX = Math.random();
        
        particle.className = 'particle absolute rounded-full';
        particle.style.width = `${particleSize}rem`;
        particle.style.height = `${particleSize}rem`;
        particle.style.backgroundColor = randomColor;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.bottom = '0';
        particle.style.opacity = particleOpacity.toString();
        particle.style.setProperty('--random-x', randomX.toString());
        particle.style.setProperty('--duration', `${particleSpeed}ms`);
        
        document.getElementById('particle-container')?.appendChild(particle);

        setTimeout(() => {
          particle.remove();
        }, particleSpeed);
      }
    };

    const interval = setInterval(() => {
      createParticle();
    }, spawnRate);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("/background.jpeg")' }}
    >
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/30 to-black/50" />
      
      <div id="particle-container" className="absolute inset-0 pointer-events-none" />

      <div className="relative z-10 w-full h-full">
        <iframe 
          src={statsUrl}
          title="JellyMC Statistics"
          className="w-full border-0"
          style={{ height: iframeHeight }}
          allowFullScreen
        />
      </div>
    </div>
  );
}

export default Stats;