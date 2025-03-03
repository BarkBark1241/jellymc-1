import { useEffect, useState } from 'react'

interface NavButton {
  title: string;
  subtitle: string;
  icon: string;
  link: string;
}

interface ServerStatus {
  online: boolean;
  players: {
    online: number;
    max: number;
  };
}

const buttons: NavButton[] = [
  {
    title: 'Discord',
    subtitle: 'Join Our',
    icon: '/discord.svg',
    link: import.meta.env.VITE_DISCORD_LINK || 'https://discord.gg/yourserver'
  },
  {
    title: 'Store',
    subtitle: 'Browse Our',
    icon: '/store.png',
    link: import.meta.env.VITE_STORE_LINK || '/store'
  },
  {
    title: 'Statistics',
    subtitle: 'View Your',
    icon: '/stats.png',
    link: import.meta.env.VITE_STATS_LINK || '/stats'
  },
  {
    title: 'Voting',
    subtitle: 'Support Us By',
    icon: '/vote.png',
    link: import.meta.env.VITE_VOTE_LINK || '/vote'
  }
];

function App() {
  const [serverStatus, setServerStatus] = useState<ServerStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCopied, setShowCopied] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const fetchServerStatus = async () => {
    try {
      const response = await fetch(
        `https://api.mcsrvstat.us/2/${import.meta.env.VITE_SERVER_IP}:${import.meta.env.VITE_SERVER_PORT}`
      );
      const data = await response.json();
      setServerStatus({
        online: data.online,
        players: {
          online: data.players?.online || 0,
          max: data.players?.max || 0
        }
      });
    } catch (error) {
      console.error('Failed to fetch server status:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (isAnimating) return;
    
    try {
      await navigator.clipboard.writeText(import.meta.env.VITE_SERVER_IP);
      setIsAnimating(true);
      setShowCopied(true);
      
      setTimeout(() => {
        setShowCopied(false);
        setTimeout(() => {
          setIsAnimating(false);
        }, 300);
      }, 1500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  useEffect(() => {
    fetchServerStatus();
    const interval = setInterval(fetchServerStatus, 60000);
    return () => clearInterval(interval);
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

      <div className="relative z-10 container mx-auto px-4">
        <div className="mb-20 text-center">
          <div className="animate-breathe">
            <img 
              src="/logo.png" 
              alt="JellyMC" 
              className="w-[32rem] md:w-[40rem] lg:w-[48rem] mx-auto animate-glow pointer-events-none select-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {buttons.map((button) => (
            <a
              key={button.title}
              href={button.link}
              className="group flex flex-col items-center transition-transform duration-300 transform hover:-translate-y-2"
            >
              <div className="p-6 rounded-2xl w-full flex flex-col items-center transition-all duration-300">
                <img 
                  src={button.icon} 
                  alt={button.title} 
                  className="w-24 h-24 mb-4 drop-shadow-lg transition-transform group-hover:scale-110 pointer-events-none select-none"
                />
                <p className="text-gray-300 text-sm font-medium tracking-wide uppercase">{button.subtitle}</p>
                <h3 className="text-white text-2xl font-bold drop-shadow-md">{button.title}</h3>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button 
            onClick={copyToClipboard}
            disabled={isAnimating}
            className="inline-block bg-black/20 backdrop-blur-sm px-8 py-4 rounded-xl hover:bg-black/30 transition-all duration-300 disabled:opacity-75"
          >
            <div className="status-container">
              {loading ? (
                <p className="text-white">Loading server status...</p>
              ) : serverStatus?.online ? (
                <>
                  <div className={`status-text ${showCopied ? 'sliding-out' : 'sliding-in'}`}>
                    <p className="text-white text-lg">
                      Join <span className="font-bold text-green-400">{serverStatus.players.online}</span>
                      <span className="text-gray-400">/</span>
                      <span className="font-bold text-green-400">{serverStatus.players.max}</span> players on{' '}
                      <span className="font-bold text-purple-400">{import.meta.env.VITE_SERVER_IP}</span>
                    </p>
                  </div>
                  {isAnimating && (
                    <div className={`copied-text ${showCopied ? 'sliding-in' : 'sliding-out'}`}>
                      <p className="text-lg">
                        <span className="font-bold text-green-400">IP Copied!</span>
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-red-400 text-lg">Server is currently offline</p>
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
