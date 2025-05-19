import React, { useEffect, useState, useRef } from 'react';

// Timer component to track and display elapsed time during the quiz
const Timer = ({ startTime, quizEnded }) => {
  const [elapsedTime, setElapsedTime] = useState(0); // Holds the time in seconds
  const intervalRef = useRef(null); // Stores interval ID to clear it when needed

  useEffect(() => {
    // If quiz hasn't started or has ended, clear the timer
    if (!startTime || quizEnded) {
      clearInterval(intervalRef.current);
      return;
    }

    // Start interval to update elapsed time every second
    intervalRef.current = setInterval(() => {
      const now = Date.now();
      setElapsedTime(Math.floor((now - startTime) / 1000)); // Calculate time in seconds
    }, 1000);

    // Cleanup on component unmount or when dependencies change
    return () => clearInterval(intervalRef.current);
  }, [startTime, quizEnded]);

  useEffect(() => {
    // Reset the elapsed time when quiz is reset or ends
    if (!startTime || quizEnded) {
      setElapsedTime(0);
    }
  }, [startTime, quizEnded]);

  return (
    <div className="text-[#0CD3FB] text-[1.2vw] p-[0.5vw] pr-[2vw]">
      Time: {elapsedTime}s
    </div>
  );
};

export default Timer;
