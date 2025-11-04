import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const BirthdayGreetingDark = ({ recipientName, theme = 'dark-romantic' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showParticles, setShowParticles] = useState(true);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState('');
  const audioRef = useRef(null);
  const navigate = useNavigate();

  const darkThemes = {
    'dark-romantic': {
      primary: 'from-gray-900 via-purple-900 to-black',
      secondary: 'from-purple-600 to-pink-600',
      accent: 'text-yellow-300',
      button: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700',
      particleColor: 'text-yellow-400',
      message: `Happy Birthday ${recipientName}! 🌟`,
      particles: '✨'
    },
    'mysterious-love': {
      primary: 'from-indigo-900 via-purple-900 to-gray-900',
      secondary: 'from-indigo-500 to-purple-500',
      accent: 'text-cyan-300',
      button: 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600',
      particleColor: 'text-cyan-400',
      message: `Happy Birthday ${recipientName}! 🎆`,
      particles: '🌙'
    }
  };

  const currentTheme = darkThemes[theme] || darkThemes['dark-romantic'];

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

  const StarParticle = ({ delay, size = 'text-xl' }) => (
    <motion.div
      className={`absolute ${currentTheme.particleColor} ${size}`}
      initial={{ y: '100vh', opacity: 0, scale: 0 }}
      animate={{ 
        y: '-100vh', 
        opacity: [0, 1, 1, 0], 
        scale: [0, 1, 1, 0.5],
        rotate: [0, 360]
      }}
      transition={{
        duration: 10,
        delay: delay,
        ease: 'easeOut'
      }}
      style={{
        left: `${Math.random() * 100}%`
      }}
    >
      {currentTheme.particles}
    </motion.div>
  );

  const MoonParticle = ({ delay }) => (
    <motion.div
      className="absolute text-cyan-200 text-2xl"
      initial={{ y: '100vh', opacity: 0, scale: 0 }}
      animate={{ 
        y: '-100vh', 
        opacity: [0, 0.8, 0.8, 0], 
        scale: [0, 1, 1, 0.3]
      }}
      transition={{
        duration: 12,
        delay: delay,
        ease: 'easeOut'
      }}
      style={{
        left: `${Math.random() * 100}%`
      }}
    >
      🌙
    </motion.div>
  );

  const GlowParticle = ({ delay }) => (
    <motion.div
      className="absolute w-2 h-2 bg-yellow-300 rounded-full blur-sm"
      initial={{ y: '100vh', opacity: 0 }}
      animate={{ 
        y: '-100vh', 
        opacity: [0, 1, 1, 0]
      }}
      transition={{
        duration: 8,
        delay: delay,
        ease: 'easeOut'
      }}
      style={{
        left: `${Math.random() * 100}%`,
        boxShadow: '0 0 10px #FFD700'
      }}
    />
  );

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme.primary} relative overflow-hidden`}>
      {/* Audio Element */}
      <audio
        ref={audioRef}
        loop
        src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmFgU7k9n1unEiBC13yO/eizEIHWq+8+OWT"
      />

      {/* Floating Particles */}
      <AnimatePresence>
        {showParticles && (
          <>
            {[...Array(12)].map((_, i) => (
              <StarParticle key={`star-${i}`} delay={i * 1.2} />
            ))}
            {[...Array(6)].map((_, i) => (
              <MoonParticle key={`moon-${i}`} delay={i * 2} />
            ))}
            {[...Array(15)].map((_, i) => (
              <GlowParticle key={`glow-${i}`} delay={i * 0.8} />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Music Control Button */}
      <motion.button
        className="fixed top-4 right-4 z-50 p-3 rounded-full bg-black bg-opacity-30 backdrop-blur-sm border border-yellow-400 border-opacity-50 text-yellow-300 hover:bg-opacity-40 transition-all duration-300"
        onClick={toggleMusic}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isPlaying ? '🎵' : '🔇'}
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
            className="bg-black bg-opacity-30 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-yellow-400 border-opacity-30 max-w-md w-full"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, type: 'spring', stiffness: 100, delay: 0.2 }}
          >


            {/* Name Header */}
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-yellow-300 mb-8 bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.5, type: 'spring', stiffness: 120 }}
              whileHover={{ 
                scale: 1.05,
                textShadow: '0 0 20px rgba(255, 215, 0, 0.8)'
              }}
              style={{
                fontFamily: 'Georgia, serif',
                letterSpacing: '0.1em',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
              }}
            >
              naqrouz hiba
            </motion.h2>

            {/* Countdown Timer or Special Message */}
            <AnimatePresence mode="wait">
              {!isButtonEnabled ? (
                <motion.div
                  key="countdown"
                  className="bg-black bg-opacity-30 backdrop-blur-md rounded-2xl p-4 mb-6 border border-yellow-400 border-opacity-30"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-lg md:text-xl text-gray-200 font-semibold">
                    Button will be available in:
                  </p>
                  <p className="text-2xl md:text-3xl font-bold text-yellow-300 mt-2">
                    {timeRemaining}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="message"
                  className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 backdrop-blur-md rounded-2xl p-6 mb-6 border-2 border-yellow-400 shadow-lg"
                  initial={{ opacity: 0, scale: 0.5, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.8, type: 'spring', stiffness: 200 }}
                >
                  <motion.p 
                    className="text-2xl md:text-3xl font-romantic font-bold text-yellow-300 text-center"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      rotate: [-2, 2, -2]
                    }}
                    transition={{
                      duration: 2,
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
              className={`${currentTheme.button} text-white px-8 py-4 rounded-full text-lg md:text-xl font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 ${
                !isButtonEnabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              whileHover={{ 
                scale: isButtonEnabled ? 1.1 : 1,
                boxShadow: isButtonEnabled ? '0 25px 50px rgba(147, 51, 234, 0.4)' : 'none'
              }}
              whileTap={{ scale: isButtonEnabled ? 0.95 : 1 }}
              onClick={() => {
                if (isButtonEnabled) {
                  navigate('/special-message');
                }
              }}
              disabled={!isButtonEnabled}
            >
              {isButtonEnabled ? 'Send with Love 💌' : 'Button Locked 🔒'}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Decorative Elements */}
      <motion.div
        className="fixed bottom-10 left-10 text-5xl opacity-40"
        animate={{
          y: [0, -25, 0],
          rotate: [0, 15, -15, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        💫
      </motion.div>

      <motion.div
        className="fixed top-20 right-20 text-3xl opacity-30"
        animate={{
          y: [0, -35, 0],
          rotate: [0, -20, 20, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.5
        }}
      >
        ✨
      </motion.div>

      {/* Mystical Fog Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent opacity-50"></div>
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent opacity-30"></div>
      </div>
    </div>
  );
};

export default BirthdayGreetingDark;