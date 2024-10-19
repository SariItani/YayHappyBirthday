import React, { useState, useEffect, useRef } from 'react';

const AuroraExperience = () => {
  const [stars, setStars] = useState([]);
  const [playerPosition, setPlayerPosition] = useState({ x: 50, y: 50 });
  const [playerLight, setPlayerLight] = useState(20);
  const [collectedStars, setCollectedStars] = useState(0);
  const [phase, setPhase] = useState(1); // 1: collection, 2: dialog, 3: choice
  const [currentDialog, setCurrentDialog] = useState(0);
  const containerRef = useRef(null);
  const audioRef = useRef(null);

  const dialogs = [
    "Like what you see?",
    "This is an aurora, it occurs during dawn",
    "The dancing lights in the sky...",
    "What do you think about watching this together someday?"
  ];

  // Generate random stars on mount
  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 15; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          collected: false
        });
      }
      setStars(newStars);
    };
    generateStars();
  }, []);

  // Handle mouse movement
  const handleMouseMove = (e) => {
    if (phase === 2) return; // Only lock cursor in phase 2

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPlayerPosition({ x, y });

    // Check for star collection in phase 1
    if (phase === 1) {
      stars.forEach((star, index) => {
        if (!star.collected) {
          const distance = Math.sqrt(
            Math.pow(x - star.x, 2) + Math.pow(y - star.y, 2)
          );
          if (distance < 5) {
            const newStars = [...stars];
            newStars[index].collected = true;
            setStars(newStars);
            setCollectedStars(prev => prev + 1);
            setPlayerLight(prev => Math.min(prev + 10, 100));
            
            // Play eat sound
            if (audioRef.current) {
              audioRef.current.play().catch(e => console.log('Audio play failed:', e));
            }
          }
        }
      });
    }
  };

  // Start dialog sequence when all stars are collected
  useEffect(() => {
    if (collectedStars === stars.length && collectedStars > 0 && phase === 1) {
      setPhase(2);
      setPlayerPosition({ x: 50, y: 50 }); // Center cursor
    }
  }, [collectedStars, stars.length]);

  // Handle dialog progression
  useEffect(() => {
    if (phase === 2) {
      if (currentDialog < dialogs.length - 1) {
        const timer = setTimeout(() => {
          setCurrentDialog(prev => prev + 1);
        }, 3000);
        return () => clearTimeout(timer);
      } else {
        setPhase(3); // Move to choice phase
      }
    }
  }, [phase, currentDialog]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden cursor-none"
      onMouseMove={handleMouseMove}
    >
      {/* Hidden audio element for star collection sound */}
      <audio ref={audioRef}>
        <source src="/eat.mp3" type="audio/mpeg" />
      </audio>

      {/* Aurora background - only fully visible after phase 1 */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-green-500 via-blue-500 to-purple-500 opacity-30 transition-all duration-1000"
        style={{
          clipPath: phase === 1 
            ? `circle(${playerLight}px at ${playerPosition.x}% ${playerPosition.y}%)`
            : 'none'
        }}
      >
        <div className="absolute inset-0 animate-pulse bg-green-400 opacity-20" />
        <div className="absolute inset-0 animate-pulse delay-1000 bg-blue-400 opacity-20" />
      </div>

      {/* Stars - only visible in phase 1 */}
      {phase === 1 && stars.map(star => !star.collected && (
        <div
          key={star.id}
          className="absolute w-2 h-2 bg-white rounded-full animate-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`
          }}
        />
      ))}

      {/* Player cursor light - hidden in phase 2, visible in phase 1 and 3 */}
      {phase !== 2 && (
        <div
          className="absolute w-4 h-4 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
          style={{
            left: `${playerPosition.x}%`,
            top: `${playerPosition.y}%`,
            boxShadow: `0 0 ${playerLight}px ${playerLight/2}px rgba(255,255,255,0.3)`
          }}
        />
      )}

      {/* Dialog text - only in phases 2 and 3 */}
      {phase >= 2 && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                      text-white text-center max-w-md">
          <p className="text-lg">{dialogs[currentDialog]}</p>
          
          {phase === 3 && (
            <div className="mt-4 flex justify-center space-x-4">
              <button className="px-4 py-2 text-white hover:text-green-300 transition-colors">
                Yes
              </button>
              <button className="px-4 py-2 text-white hover:text-red-300 transition-colors">
                No
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AuroraExperience;
