import React from 'react';
import Timer from './Timer'; // Importing the Timer component

// Navbar receives props: startTime and quizEnded to control the Timer behavior
const Navbar = ({ startTime, quizEnded }) => {
  return (
    // Navbar container with flex layout, spacing, and white text
    <div id="nav" className="w-full flex justify-between items-center px-6 py-3 text-white">
      
      {/* Logo section with fixed width and clickable cursor */}
      <div className="logo w-[6vw] cursor-pointer">
        <img src="/quizzylogo.png" alt="Logo" />
      </div>

      {/* Timer component shows time since quiz started */}
      <Timer startTime={startTime} quizEnded={quizEnded} />
    </div>
  );
};

export default Navbar;
