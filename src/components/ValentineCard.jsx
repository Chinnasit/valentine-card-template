import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import messagesText from "/assets/message.txt?raw";
const EMOJI = ["💗", "⭐", "💕", "✨"];

const ValentineCard = () => {
  const [isExploding, setIsExploding] = useState(false);
  const [showImages, setShowImages] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [emojis, setEmojis] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const bottomRef = useRef(null)

  const images = [
    "/lover_cat1.jpg",
    "/lover_cat2.jpg",
    "/lover_cat3.jpg",
  ];
  
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages(messagesText.split("\n"));
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    let timeout;
    if (showImages) {
      timeout = setTimeout(() => {
        setCurrentMessageIndex(prev => {
          if (prev < messages.length - 1) {
            return prev + 1;
          }
          return prev; 
        });
      }, 3000); 
    }
    
    return () => clearTimeout(timeout);
  }, [showImages, currentMessageIndex]);

  const startExplosion = () => {
    setIsExploding(true);
    setEmojis(
      Array.from({ length: 20 }, () => ({
        emoji: EMOJI[Math.floor(Math.random() * EMOJI.length)],
        x: Math.random() * 200 - 100,
        y: Math.random() * 200 - 100,
        scale: Math.random() * 1.5 + 0.5,
      }))
    );

    setTimeout(() => {
      setIsExploding(false);
      setShowImages(true);
    }, 1200);
  };

  const resetCard = () => {
    setShowImages(false);
    setCurrentMessageIndex(0);
    setSelectedImage(null);
  };

  return (
    <div className="w-full min-h-screen relative">
      <div className="w-full min-h-screen flex flex-col items-center justify-center p-4">
        <AnimatePresence>
          {!showImages && (
            <motion.div
              onClick={startExplosion}
              className="absolute w-full max-w-sm md:max-w-md lg:max-w-lg cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ y: -300, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative aspect-[4/2] bg-white rounded-xl shadow-xl overflow-hidden">
                <div className="relative h-full flex flex-col items-center justify-center p-4">
                  <span className="text-8xl text-pink-600 pb-8">💖</span>
                  <motion.div
                    className="text-lg md:text-xl lg:text-2xl font-serif text-pink-600 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  >
                    Happy Valentine's Day
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {showImages && (
          <div className="w-full max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 sm:grid-rows-1 gap-6 max-w-4xl mx-auto">
              {images.map((src, index) => (
                <motion.div
                  key={index}
                  className="relative aspect-[3/4] w-full cursor-pointer group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: index * 0.3 }}
                  onClick={() => setSelectedImage(src)}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute inset-0 rounded-xl overflow-hidden">
                    <img
                      src={src}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      alt={`Valentine ${index + 1}`}
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-8 h-24 flex items-center justify-center" ref={bottomRef}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentMessageIndex}
                  className="text-xl md:text-2xl lg:text-3xl font-bold text-pink-600 text-center px-4"
                  initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                  transition={{ duration: 0.75 }}
                >
                  {messages[currentMessageIndex]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}

        {showImages && (
          <motion.button
            className="fixed bottom-5 right-5 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full shadow-lg backdrop-blur-sm"
            onClick={resetCard}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            ⏩
          </motion.button>
        )}

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="relative w-full h-full md:w-[60%] max-h-[100vh]"
                onClick={e => e.stopPropagation()}
              >
                <img
                  src={selectedImage}
                  className="w-full h-full object-contain rounded-lg"
                  alt="Full size"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 text-white bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70"
                >
                  ✕
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {isExploding &&
        emojis.map((item, index) => (
          <motion.div
            key={index}
            className="absolute text-4xl"
            style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
            animate={{
              x: item.x * 2,
              y: item.y * 2,
              opacity: 0,
              scale: item.scale,
            }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {item.emoji}
          </motion.div>
        ))}
    </div>
  );
};

export default ValentineCard;