import React, { useState, useEffect } from 'react';

// Audio clips
const sounds = [
  { key: 'Q', id: 'Heater 1', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
  { key: 'W', id: 'Heater 2', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },
  { key: 'E', id: 'Heater 3', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },
  { key: 'A', id: 'Heater 4', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },
  { key: 'S', id: 'Clap', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },
  { key: 'D', id: 'Open HH', src: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },
  { key: 'Z', id: "Kick n' Hat", src: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
  { key: 'X', id: 'Kick', src: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },
  { key: 'C', id: 'Closed HH', src: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' },
];

const DrumPad =   ({ sound, handlePlay   }) => {
  return   (
       <button
      className="drum-pad bg-blue-500 text-white rounded-lg m-2 p-6 hover:bg-blue-700 focus:outline-none"
      id={sound.id}
      onClick={() => handlePlay(sound)}
    >
      {sound.key}
      <audio className="clip" id={sound.key} src={sound.src}></audio>
    </button>
  );
};

const App = () => {
  const [display, setDisplay] = useState('');

  // Handle the key press
  useEffect(() => {
    const handleKeyPress = (e) => {
      const sound = sounds.find((s) => s.key === e.key.toUpperCase());
      if (sound) {
        handlePlay(sound);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Play the audio and update the display
  const handlePlay = (sound) => {
    const audio = document.getElementById(sound.key);

    // If the audio is already playing, just reset and play it again
    if (audio.currentTime > 0 && !audio.paused) {
      audio.pause();
      audio.currentTime = 0;
    }

    // Play the audio and update display
    audio.play().catch((error) => console.error('Audio playback error:', error));
    setDisplay(sound.id);  // Update display right after triggering sound
  };

  return (
    <div id="drum-machine" className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div id="display" className="text-center mb-4 text-2xl font-bold text-gray-700">{display}</div>
        <div className="grid grid-cols-3 gap-4">
          {sounds.map((sound) => (
            <DrumPad key={sound.key} sound={sound} handlePlay={handlePlay} />
          ))}
        </div>
      </div>
    </div>
  );
};

  export default App;
