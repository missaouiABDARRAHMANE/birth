import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SpecialMessagePage from './SpecialMessagePage';

const BirthdayGreeting = ({ recipientName, theme }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showParticles, setShowParticles] = useState(true);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [showSpecialMessage, setShowSpecialMessage] = useState(false);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  const themes = {
    wife: {
      primary: 'from-rose-200 via-pink-100 to-purple-100',
      secondary: 'from-rose-400 to-purple-300',
      accent: 'text-rose-600',
      button: 'bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500',
      particleColor: 'text-rose-400',
      message: `Happy Birthday ${recipientName}! 🎉`
    },
    bestie: {
      primary: 'from-blue-100 via-purple-50 to-pink-50',
      secondary: 'from-blue-200 to-purple-200',
      accent: 'text-purple-600',
      button: 'bg-gradient-to-r from-purple-400 to-blue-400 hover:from-purple-500 hover:to-blue-500',
      particleColor: 'text-purple-400',
      message: `Hey my amazing bestie ${recipientName}! 🌟 On your special day, I just want to remind you how incredibly special you are. You've been my rock, my partner in crime, my shoulder to cry on, and my biggest cheerleader. Through all the ups and downs, the laughter and tears, you've always been there. Your friendship is like a rare gem - precious, beautiful, and one of a kind. May this birthday be filled with all the love, joy, and magic you bring into everyone else's life. Here's to another year of incredible memories, spontaneous adventures, and endless laughter together. Love you to the moon and back!`
    }
  };

  const currentTheme = themes[theme] || themes.wife;

  // Check if current time is after November 15, 2025 00:00
  const checkButtonAvailability = () => {
    const targetDate = new Date('2025-11-15T00:00:00');
    const now = new Date();
    
    if (now >= targetDate) {
      setIsButtonEnabled(true);
      setTimeRemaining('');
    } else {
      setIsButtonEnabled(false);
      // Calculate time remaining
      const diff = targetDate - now;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }
  };

  useEffect(() => {
    // Check immediately and then every second
    checkButtonAvailability();
    const interval = setInterval(checkButtonAvailability, 1000);

    // Auto-play music after user interaction
    const handleFirstInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play().catch(() => {
          console.log('Audio autoplay prevented');
        });
        setIsPlaying(true);
      }
    };

    document.addEventListener('click', handleFirstInteraction, { once: true });
    document.addEventListener('touchstart', handleFirstInteraction, { once: true });

    return () => {
      clearInterval(interval);
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [isPlaying]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          console.log('Audio play failed');
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleButtonClick = () => {
    if (isButtonEnabled) {
      setShowParticles(false);
      setTimeout(() => {
        setShowParticles(true);
        navigate('/special-message');
      }, 100);
    }
  };

  const HeartParticle = ({ delay, size = 'text-2xl' }) => {
    const emojis = ['💕', '💖', '💗', '💓', '💝'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    return (
      <motion.div
        className={`absolute ${currentTheme.particleColor} ${size} heart-particle`}
        initial={{ y: '100vh', opacity: 0, scale: 0, x: 0 }}
        animate={{ 
          y: '-100vh', 
          opacity: [0, 1, 1, 0.8, 0], 
          scale: [0, 1.2, 1, 0.9, 0.5],
          rotate: [0, 180, 360],
          x: [0, Math.random() * 100 - 50, 0]
        }}
        transition={{
          duration: 8 + Math.random() * 2,
          delay: delay,
          ease: 'easeOut'
        }}
        style={{
          left: `${Math.random() * 100}%`
        }}
      >
        {randomEmoji}
      </motion.div>
    );
  };

  const ConfettiParticle = ({ delay, color }) => (
    <motion.div
      className="confetti"
      initial={{ y: '-100vh', opacity: 0, rotate: 0 }}
      animate={{ 
        y: '100vh', 
        opacity: [0, 1, 1, 0], 
        rotate: [0, 720]
      }}
      transition={{
        duration: 3,
        delay: delay,
        ease: 'linear'
      }}
      style={{
        left: `${Math.random() * 100}%`,
        backgroundColor: color,
        animationDelay: `${delay}s`
      }}
    />
  );

  const Sparkle = ({ delay }) => (
    <motion.div
      className="sparkle"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0, 1, 0.8, 0],
        scale: [0, 1, 1.2, 0]
      }}
      transition={{
        duration: 2 + Math.random(),
        delay: delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 3
      }}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${4 + Math.random() * 4}px`,
        height: `${4 + Math.random() * 4}px`,
        boxShadow: theme === 'wife' 
          ? '0 0 6px rgba(251, 113, 133, 0.8), 0 0 12px rgba(251, 113, 133, 0.4)'
          : '0 0 6px rgba(168, 85, 247, 0.8), 0 0 12px rgba(168, 85, 247, 0.4)'
      }}
    />
  );

  return (
    <>
      {showSpecialMessage ? (
        <SpecialMessagePage 
          theme={theme === 'wife' ? 'light' : 'dark'} 
          onBack={() => setShowSpecialMessage(false)}
        />
      ) : (
        <div className={`min-h-screen bg-gradient-to-br ${currentTheme.primary} relative overflow-hidden`}>
      {/* Audio Element */}
      <audio
        ref={audioRef}
        loop
        src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmFgU7k9n1unEiBC13yO/eizEIHWq+8+OWT"
      />

      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className={`absolute top-0 right-0 w-96 h-96 ${theme === 'wife' ? 'bg-rose-300/30' : 'bg-purple-300/30'} rounded-full blur-3xl`}
          animate={{
            y: [0, 50, 0],
            x: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          className={`absolute bottom-0 left-0 w-96 h-96 ${theme === 'wife' ? 'bg-pink-300/30' : 'bg-blue-300/30'} rounded-full blur-3xl`}
          animate={{
            y: [0, -50, 0],
            x: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          className={`absolute top-1/2 left-1/2 w-64 h-64 ${theme === 'wife' ? 'bg-purple-200/20' : 'bg-pink-200/20'} rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2`}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </div>

      {/* Background Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <Sparkle key={i} delay={i * 0.3} />
        ))}
      </div>

      {/* Floating Hearts or Confetti */}
      <AnimatePresence>
        {showParticles && (
          <>
            {theme === 'wife' 
              ? [...Array(8)].map((_, i) => (
                  <HeartParticle key={`heart-${i}`} delay={i * 1.5} />
                ))
              : [...Array(15)].map((_, i) => (
                  <ConfettiParticle 
                    key={`confetti-${i}`} 
                    delay={i * 0.3} 
                    color={['#FFB6C1', '#E6E6FA', '#FFDAB9', '#B76E79'][i % 4]}
                  />
                ))
            }
          </>
        )}
      </AnimatePresence>

      {/* Music Control Button */}
      <motion.button
        className={`fixed top-4 right-4 z-50 p-4 rounded-full ${theme === 'wife' ? 'bg-rose-400/30' : 'bg-purple-400/30'} backdrop-blur-md border-2 ${theme === 'wife' ? 'border-rose-300/50' : 'border-purple-300/50'} ${theme === 'wife' ? 'text-rose-700' : 'text-purple-700'} shadow-lg hover:shadow-xl transition-all duration-300`}
        onClick={toggleMusic}
        whileHover={{ scale: 1.15, rotate: [0, -10, 10, 0] }}
        whileTap={{ scale: 0.9 }}
        animate={{
          boxShadow: isPlaying 
            ? ['0 0 20px rgba(236, 72, 153, 0.4)', '0 0 30px rgba(236, 72, 153, 0.6)', '0 0 20px rgba(236, 72, 153, 0.4)']
            : '0 0 0px rgba(0, 0, 0, 0)'
        }}
        transition={{
          duration: 2,
          repeat: isPlaying ? Infinity : 0
        }}
      >
        <span className="text-2xl">{isPlaying ? '🎵' : '🔇'}</span>
      </motion.button>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="max-w-4xl mx-auto"
        >
          {/* Glassmorphism Card */}
          <motion.div 
            className={`bg-white/30 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 border-2 ${theme === 'wife' ? 'border-rose-200/50' : 'border-purple-200/50'} max-w-md w-full relative overflow-hidden`}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, type: 'spring', stiffness: 100, delay: 0.2 }}
          >
            {/* Shimmer Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
              animate={{
                x: ['-200%', '200%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
                ease: 'easeInOut'
              }}
            />


            {/* Name Header */}
            <motion.div className="relative mb-8">
              <motion.h2
                className={`text-5xl md:text-6xl font-bold font-elegant mb-2 ${theme === 'wife' ? 'bg-gradient-to-r from-rose-600 via-pink-500 to-rose-600' : 'bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600'} bg-clip-text text-transparent`}
                initial={{ opacity: 0, y: -30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.5, type: 'spring', stiffness: 120 }}
                whileHover={{ 
                  scale: 1.05,
                }}
                style={{
                  letterSpacing: '0.05em',
                  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
                }}
              >
                naqrouz hiba
              </motion.h2>
              <motion.div
                className={`h-1 w-24 mx-auto rounded-full ${theme === 'wife' ? 'bg-gradient-to-r from-rose-400 to-pink-400' : 'bg-gradient-to-r from-purple-400 to-blue-400'}`}
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 96, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              />
            </motion.div>

            {/* Countdown Timer or Special Message */}
            <AnimatePresence mode="wait">
              {!isButtonEnabled ? (
                <motion.div
                  key="countdown"
                  className={`bg-white/25 backdrop-blur-md rounded-2xl p-6 mb-6 border-2 ${theme === 'wife' ? 'border-rose-200/40' : 'border-purple-200/40'} shadow-lg`}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.6, type: 'spring' }}
                >
                  <motion.p 
                    className={`text-lg md:text-xl ${theme === 'wife' ? 'text-rose-800' : 'text-purple-800'} font-semibold mb-3`}
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Button will be available in:
                  </motion.p>
                  <motion.p 
                    className={`text-3xl md:text-4xl font-bold ${theme === 'wife' ? 'text-rose-600' : 'text-purple-600'} font-mono`}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    {timeRemaining}
                  </motion.p>
                </motion.div>
              ) : (
                <motion.div
                  key="message"
                  className={`bg-gradient-to-br ${theme === 'wife' ? 'from-rose-100/80 to-pink-100/80' : 'from-purple-100/80 to-blue-100/80'} backdrop-blur-md rounded-2xl p-6 mb-6 border-2 ${theme === 'wife' ? 'border-rose-300/60' : 'border-purple-300/60'} shadow-xl relative overflow-hidden`}
                  initial={{ opacity: 0, scale: 0.5, y: -20, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.8, type: 'spring', stiffness: 200 }}
                >
                  {/* Sparkle decoration */}
                  <motion.div
                    className="absolute top-2 right-2 text-2xl"
                    animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    ✨
                  </motion.div>
                  <motion.p 
                    className={`text-2xl md:text-3xl font-romantic font-bold ${theme === 'wife' ? 'text-rose-700' : 'text-purple-700'} text-center relative z-10`}
                    animate={{ 
                      scale: [1, 1.05, 1],
                      rotate: [-1, 1, -1]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  >
                    hi naqrouzti hoba 💕
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Send Button */}
            <motion.button
              className={`${currentTheme.button} text-white px-10 py-5 rounded-full text-lg md:text-xl font-bold shadow-2xl relative overflow-hidden ${
                !isButtonEnabled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: 0,
                boxShadow: isButtonEnabled 
                  ? ['0 10px 30px rgba(236, 72, 153, 0.4)', '0 15px 40px rgba(236, 72, 153, 0.6)', '0 10px 30px rgba(236, 72, 153, 0.4)']
                  : '0 5px 15px rgba(0, 0, 0, 0.1)'
              }}
              transition={{ 
                duration: 0.8, 
                delay: 1,
                boxShadow: { duration: 2, repeat: isButtonEnabled ? Infinity : 0 }
              }}
              whileHover={{ 
                scale: isButtonEnabled ? 1.1 : 1,
                y: isButtonEnabled ? -2 : 0,
              }}
              whileTap={{ scale: isButtonEnabled ? 0.95 : 1 }}
              onClick={() => {
                if (isButtonEnabled) {
                  navigate('/special-message');
                }
              }}
              disabled={!isButtonEnabled}
            >
              {/* Button shine effect */}
              {isButtonEnabled && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />
              )}
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isButtonEnabled ? (
                  <>
                    <span>Send with Love</span>
                    <motion.span
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      💌
                    </motion.span>
                  </>
                ) : (
                  <>
                    <span>Button Locked</span>
                    <span>🔒</span>
                  </>
                )}
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Decorative Elements */}
      <motion.div
        className="fixed bottom-10 left-10 text-6xl opacity-40 z-0"
        animate={{
          y: [0, -25, 0],
          rotate: [0, 15, -15, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        {theme === 'wife' ? '💕' : '🎉'}
      </motion.div>

      <motion.div
        className="fixed top-20 right-20 text-4xl opacity-30 z-0"
        animate={{
          y: [0, -35, 0],
          rotate: [0, -20, 20, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1
        }}
      >
        {theme === 'wife' ? '✨' : '🌟'}
      </motion.div>

      <motion.div
        className={`fixed top-1/4 left-1/4 text-3xl opacity-20 z-0 ${theme === 'wife' ? 'text-rose-400' : 'text-purple-400'}`}
        animate={{
          y: [0, -15, 0],
          rotate: [0, 360],
          scale: [1, 1.15, 1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5
        }}
      >
        💖
      </motion.div>

      <motion.div
        className="fixed bottom-1/4 right-1/4 text-2xl opacity-25 z-0"
        animate={{
          y: [0, -20, 0],
          rotate: [0, -360],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2
        }}
      >
        {theme === 'wife' ? '🌹' : '🎈'}
      </motion.div>
        </div>
      )}
    </>
  );
};

export default BirthdayGreeting;