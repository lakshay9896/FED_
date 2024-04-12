import React, { useState } from "react";
import { audios } from "./AudioData";
import Player from "./components/Player";
import Navbar from "./components/Navbar";
import MoodSelector from "./components/MoodSelector";
import "./App.css"; 


const App = () => {
  const [songs, setSongs] = useState(audios);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSong, setCurrentSong] = useState(songs[0]);

  const checkNumber = (number) => {
    if (number > songs.length - 1) {
      return 0;
    }
    if (number < 0) {
      return songs.length - 1;
    }
    return number;
  };

  const getSongData = (song, index) => {
    setCurrentIndex(index);
    setCurrentSong(song);
  };

  const nextSong = () => {
    setCurrentIndex((currentIndex) => {
      let newIndex = currentIndex + 1;
      return checkNumber(newIndex);
    });

    setCurrentSong(audios[currentIndex]);
  };

  const prevSong = () => {
    setCurrentIndex((currentIndex) => {
      let newIndex = currentIndex - 1;
      return checkNumber(newIndex);
    });

    setCurrentSong(audios[currentIndex]);
  };

  const [mood, setMood] = useState('default');

  const handleMoodChange = (newMood) => {
    setMood(newMood);
    // Apply the mood to the player (e.g., change color themes)
    document.documentElement.style.setProperty('--player-theme-color', moodColors[newMood]);
  };

  const moodColors = {
    calm: '#89CFF0',
    energetic: '#FF4500',
    happy: '#FFD700',
    sad: '#A9A9A9',
    default: '#ffffff'
  };

  return (
    <>
      <div className="player-main">
        <div className={`app-main mood-${mood}`}>
          <Navbar />
          <MoodSelector onMoodChange={handleMoodChange} />
        </div>
        <Player
          currentSong={currentSong}
          currentIndex={currentIndex}
          nextSong={nextSong}
          prevSong={prevSong}
        />
      </div>
    </>
  );
};

export default App;