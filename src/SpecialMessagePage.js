import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SpecialMessagePage = ({ theme = 'light', onBack }) => {
  const [particles, setParticles] = useState([]);
  const [particleId, setParticleId] = useState(0);

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

  // Handle click events to create particles
  const handleClick = useCallback((e) => {
    const emojis = ['💕', '😘'];
    const newParticles = [];

    // Create 3-5 particles per click
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

    // Remove particles after animation completes
    const particleIds = newParticles.map((p) => p.id);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !particleIds.includes(p.id)));
    }, 2000);
  }, [particleId]);

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
      {/* Background Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40 pointer-events-none" />
      
      {/* Animated overlay gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-blue-500/10 pointer-events-none"
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* iOS-style blur background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"
          animate={{
            y: [0, 50, 0],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl"
          animate={{
            y: [0, -50, 0],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
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
          <motion.div
            className={`px-8 py-12 text-center border-b border-white/10`}
            variants={itemVariants}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className={`text-sm font-semibold tracking-widest uppercase ${currentTheme.secondaryText} mb-4`}>
                Special Message
              </p>
              <motion.h1
                className={`text-5xl md:text-6xl font-bold ${currentTheme.accent} mb-4`}
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
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
          <motion.div
            className={`px-8 py-10 ${currentTheme.text}`}
            variants={itemVariants}
          >
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
          <motion.div
            className="h-px bg-white/10"
            variants={itemVariants}
          />

          {/* Signature Section */}
          <motion.div
            className={`px-8 py-8 text-center`}
            variants={itemVariants}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
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
            <motion.div
              className={`px-8 py-6 border-t border-white/10`}
              variants={itemVariants}
            >
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
        </motion.p>
      </motion.div>

      {/* Click-triggered Particles (Hearts and Kisses) */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="fixed pointer-events-none text-3xl"
            initial={{
              x: particle.x,
              y: particle.y,
              opacity: 1,
              scale: 1,
            }}
            animate={{
              y: particle.y - 200,
              opacity: 0,
              scale: [1, 1.2, 0.8],
              rotate: [0, Math.random() * 360],
            }}
            transition={{
              duration: 2,
              ease: 'easeOut',
            }}
            exit={{ opacity: 0 }}
          >
            {particle.emoji}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Background Floating Hearts */}
      <AnimatePresence>
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`bg-${i}`}
            className="fixed pointer-events-none"
            initial={{
              y: '100vh',
              opacity: 0,
              scale: 0,
              x: Math.random() * window.innerWidth,
            }}
            animate={{
              y: '-100vh',
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0.8],
              x: Math.random() * window.innerWidth,
            }}
            transition={{
              duration: 6 + Math.random() * 3,
              delay: i * 0.4,
            }}
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
