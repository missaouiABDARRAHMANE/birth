import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SpecialMessagePage = ({ theme = 'light', onBack }) => {
  const [particles, setParticles] = useState([]);
  const [particleId, setParticleId] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioInitialized, setAudioInitialized] = useState(false);
  const audioRef = useRef(null);
  const audioContextRef = useRef(null);

  const message = `bghit ngolk happybirthday btri9ti bseht hlfti eliya 3arf hadchi liderto defch mais makhlitili walo hahahahaha mais db ana bghit nderha bspecialiti dyali  3emrni nsitk fhyati w3emrni nsa khirk merci 3la kol lehda dazt m3ak 3arf mohal terj3 dakchi likan flwel mais nchlh yerj3 mahsen mno wana m3ak fl7lal ahsan hiba wela hibush wela zehri ,3iniya dima bghitk nti and tb9ay nti linbghik ila mkhditkch mntzewjch hahaha nchlh rebi yfer7k fhyatk ,kikont kantwehchk knseft aya tswerk wela tjibli audio dyawlk ymkn 3emrha glthlk bseh hadi tari9a bch knt nsme3 sotk hhhhh endi 929798283tswera dylk ftel chrit tele jdi wmdertch fih whatsap elch bch mtmchilch dik les conversations likano binatna wlh ch7al mn mera knsme3hom knerta7 nti mais lah yje3lk fmoktabi yarbi wela mokntich mn nasibi yarbi ybedl nasibi wtkoni mno merftch wkan n9ed netik eniya bch tchofi ki kandir nchofk wlh  3arf twelt elik mais hadchi khlit 9rayti wderto bach t3erfi 9imtk ymkn ana jayni 3adi whtanti yjik 3adi cest normal seh wlh mknch chi tari9a mderthch bch nbarklk cest sa hedrtna mchi tkml hna ba9y twela bseh adi tkml mea bak chi nhar weli ayweli bhal lwalid nchalah wkhalti yamina  and this end ilove you missaoui daz mna ilove you naqrouzti`;

  const themeStyles = {
    light: {
      background: 'bg-gradient-to-br from-blue-50 via-white to-pink-50',
      card: 'bg-white/40 backdrop-blur-2xl',
      text: 'text-gray-900',
      secondaryText: 'text-gray-600',
      accent: 'text-blue-600',
      accentSecondary: 'text-pink-500',
      border: 'border-white/30',
      shadow: 'shadow-2xl',
    },
    dark: {
      background: 'bg-gradient-to-br from-gray-900 via-black to-gray-800',
      card: 'bg-gray-900/40 backdrop-blur-2xl',
      text: 'text-white',
      secondaryText: 'text-gray-300',
      accent: 'text-blue-400',
      accentSecondary: 'text-pink-400',
      border: 'border-white/10',
      shadow: 'shadow-2xl',
    }
  };

  const currentTheme = themeStyles[theme] || themeStyles.light;

  // Initialize audio context for click sounds
  useEffect(() => {
    const initAudioContext = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
    };

    // Initialize on first user interaction (browser policy)
    const handleFirstInteraction = () => {
      if (!audioInitialized) {
        initAudioContext();
        setAudioInitialized(true);
      }
    };

    document.addEventListener('click', handleFirstInteraction, { once: true });
    return () => document.removeEventListener('click', handleFirstInteraction);
  }, [audioInitialized]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Play a click sound effect using Web Audio API
  const playClickSound = useCallback(() => {
    if (!audioContextRef.current) return;
    
    const audioContext = audioContextRef.current;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  }, []);

  // Handle click events to create particles
  const handleClick = useCallback((e) => {
    // Play click sound
    playClickSound();
    
    // Start background music on first click (browser autoplay policy)
    if (audioRef.current && !isPlaying) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.log('Audio play failed:', err);
      });
    }

    const emojis = ['💕', '😘'];
    const newParticles = [];
    const particleCount = Math.floor(Math.random() * 3) + 3;

    for (let i = 0; i < particleCount; i++) {
      const emoji = emojis[Math.floor(Math.random() * emojis.length)];
      const offsetX = (Math.random() - 0.5) * 200;
      const offsetY = (Math.random() - 0.5) * 200;

      newParticles.push({
        id: particleId + i,
        x: e.clientX + offsetX,
        y: e.clientY + offsetY,
        emoji: emoji,
      });
    }

    setParticles((prev) => [...prev, ...newParticles]);
    setParticleId((prev) => prev + particleCount);

    const particleIds = newParticles.map((p) => p.id);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !particleIds.includes(p.id)));
    }, 2000);
  }, [particleId, isPlaying, playClickSound]);

  // Toggle background music
  const toggleAudio = useCallback(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.log('Audio play failed:', err);
      });
    }
  }, [isPlaying]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden cursor-pointer"
      onClick={handleClick}
      style={{
        backgroundImage: 'url(/birthday-celebration.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        loop
        // Replace with your actual audio file path
        src="/audio/happy-birthday.mp3"
        // For testing: you can use a placeholder URL
        // src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      >
        Your browser does not support the audio element.
      </audio>

      {/* Floating Audio Control Button */}
      <motion.button
        className={`fixed top-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center ${
          theme === 'light' ? 'bg-white/80' : 'bg-gray-800/80'
        } ${currentTheme.border} backdrop-blur-lg shadow-lg transition-all`}
        onClick={(e) => {
          e.stopPropagation();
          toggleAudio();
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        <motion.span
          animate={{ rotate: isPlaying ? 0 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isPlaying ? (
            // Pause icon
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            // Play icon
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </motion.span>
        {isPlaying && (
          <motion.div
            className={`absolute inset-0 rounded-full ${
              theme === 'light' ? 'bg-blue-500/20' : 'bg-blue-400/20'
            }`}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </motion.button>

      {/* Audio Indicator */}
      {isPlaying && (
        <motion.div
          className={`fixed top-24 right-6 z-50 px-3 py-1 rounded-full text-xs font-medium ${
            theme === 'light' ? 'bg-white/80 text-gray-900' : 'bg-gray-800/80 text-white'
          } ${currentTheme.border} backdrop-blur-lg shadow-lg`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          🎵 Playing...
        </motion.div>
      )}

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40 pointer-events-none" />
      
      {/* Animated overlay gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-blue-500/10 pointer-events-none"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* iOS-style blur background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"
          animate={{ y: [0, 50, 0], x: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl"
          animate={{ y: [0, -50, 0], x: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* iOS Card with Glassmorphism */}
        <motion.div
          className={`w-full max-w-2xl ${currentTheme.card} rounded-3xl border-2 ${currentTheme.border} overflow-hidden ${currentTheme.shadow} backdrop-blur-xl`}
          variants={itemVariants}
          style={{
            backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(17, 24, 39, 0.6)'
          }}
        >
          {/* Header Section */}
          <motion.div className={`px-8 py-12 text-center border-b border-white/10`} variants={itemVariants}>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.3 }}>
              <p className={`text-sm font-semibold tracking-widest uppercase ${currentTheme.secondaryText} mb-4`}>
                Special Message
              </p>
              <motion.h1
                className={`text-5xl md:text-6xl font-bold ${currentTheme.accent} mb-4`}
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                💌 For You 💌
              </motion.h1>
              <motion.div
                className={`h-1 w-20 mx-auto rounded-full`}
                style={{
                  background: theme === 'light'
                    ? 'linear-gradient(90deg, rgb(37, 99, 235) 0%, rgb(236, 72, 153) 100%)'
                    : 'linear-gradient(90deg, rgb(96, 165, 250) 0%, rgb(244, 114, 182) 100%)',
                }}
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />
            </motion.div>
          </motion.div>

          {/* Message Content */}
          <motion.div className={`px-8 py-10 ${currentTheme.text}`} variants={itemVariants}>
            <div className="space-y-6">
              {message.split('  ').map((paragraph, index) => (
                <motion.p
                  key={index}
                  className={`text-base md:text-lg leading-relaxed ${currentTheme.secondaryText} font-light`}
                  style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                    letterSpacing: '0.2px',
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true, margin: '-50px' }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </motion.div>

          {/* Divider */}
          <motion.div className="h-px bg-white/10" variants={itemVariants} />

          {/* Signature Section */}
          <motion.div className={`px-8 py-8 text-center`} variants={itemVariants}>
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }}>
              <p className={`text-xs font-semibold tracking-widest uppercase ${currentTheme.secondaryText} mb-2`}>
                With love
              </p>
              <p className={`text-3xl font-bold ${currentTheme.accent}`}>
                Missaoui
              </p>
            </motion.div>
          </motion.div>

          {/* iOS-style Button */}
          {onBack && (
            <motion.div className={`px-8 py-6 border-t border-white/10`} variants={itemVariants}>
              <motion.button
                className={`w-full py-3 px-6 rounded-2xl font-semibold text-base transition-all duration-300 ${
                  theme === 'light'
                    ? 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700'
                    : 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  onBack();
                }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: theme === 'light'
                    ? '0 10px 30px rgba(59, 130, 246, 0.3)'
                    : '0 10px 30px rgba(59, 130, 246, 0.5)',
                }}
                whileTap={{ scale: 0.98 }}
              >
                ↩ Back
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {/* Footer Text */}
        <motion.p
          className={`mt-10 text-sm ${currentTheme.secondaryText} text-center max-w-md font-light`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Click anywhere to send hearts and kisses! 💕😘
          <br />
          <span className={`text-xs ${currentTheme.accent}`}>
            {isPlaying ? 'Music is playing 🎶' : 'Tap the music button to play'}
          </span>
        </motion.p>
      </motion.div>

      {/* Particles and Floating Hearts */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="fixed pointer-events-none text-3xl"
            initial={{ x: particle.x, y: particle.y, opacity: 1, scale: 1 }}
            animate={{ y: particle.y - 200, opacity: 0, scale: [1, 1.2, 0.8], rotate: [0, Math.random() * 360] }}
            transition={{ duration: 2, ease: 'easeOut' }}
            exit={{ opacity: 0 }}
          >
            {particle.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
      
      <AnimatePresence>
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`bg-${i}`}
            className="fixed pointer-events-none"
            initial={{ y: '100vh', opacity: 0, scale: 0, x: Math.random() * window.innerWidth }}
            animate={{ y: '-100vh', opacity: [0, 1, 1, 0], scale: [0, 1, 1, 0.8] }}
            transition={{ duration: 6 + Math.random() * 3, delay: i * 0.4 }}
            exit={{ opacity: 0 }}
          >
            <span className="text-2xl">💕</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default SpecialMessagePage;
