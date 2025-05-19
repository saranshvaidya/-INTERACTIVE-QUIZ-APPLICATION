
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Dashboard = ({ score, timeTaken, totalQuestions, onRestart }) => {
  // Create a ref for the whole dashboard container
  const dashRef = useRef(null);
  // Create a ref array for individual info cards (Score, Time, Performance)
  const cardRefs = useRef([]);

  // GSAP animations triggered when the component mounts
  useGSAP(() => {
    // Animate the dashboard container
    gsap.from(dashRef.current, {
      opacity: 0,
      scale: 0,
      duration: 0.5,
      ease: 'power2.out',
    });

    // Animate each card one after another using stagger
    gsap.from(cardRefs.current, {
      opacity: 0,
      scale: 0,
      duration: 0.6,
      stagger: 0.2,
      ease: 'power3.out',
    });
  }, []);

  // Determine performance text based on the score percentage
  const getPerformance = () => {
    const percentage = (score / totalQuestions) * 100;
    if (percentage >= 80) return 'Outstanding';
    if (percentage >= 50) return 'Good';
    return 'Average';
  };

  return (
    // Main container for the dashboard
    <div
      ref={dashRef}
      className="w-full p-[2vw] bg-[#0c0c0c] text-white flex flex-col items-center"
    >
      {/* Dashboard heading */}
      <h2 className="text-[2vw] font-bold mb-[2vw] bg-gradient-to-r from-[#0CD3FB] via-[#6C5CE7] to-[#A29BFE] bg-clip-text text-transparent">
        Quiz Summary
      </h2>

      {/* Grid layout for Score, Time Taken, Performance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[2vw] w-full max-w-[1000px]">
        {/* Loop through the three data points */}
        {['Score', 'Time Taken', 'Performance'].map((label, index) => (
          <div
            key={label}
            ref={(el) => (cardRefs.current[index] = el)} // Assign ref to each card
            className="bg-[#1f1f1f] p-[2vw] rounded-lg text-center shadow-md"
          >
            {/* Card heading */}
            <h3 className="text-[1.5vw] mb-2">{label}</h3>

            {/* Card content based on label */}
            <p className="text-[1.2vw]">
              {label === 'Score'
                ? `${score} / ${totalQuestions}`
                : label === 'Time Taken'
                ? `${timeTaken}s`
                : getPerformance()}
            </p>
          </div>
        ))}
      </div>

      {/* Restart Quiz Button */}
      <button
        onClick={onRestart}
        className="mt-[2vw] px-6 py-3 bg-[#0CD3FB] hover:bg-[#00bcd4] text-black text-[1vw] rounded-lg font-semibold transition duration-200"
      >
        Restart Quiz
      </button>
    </div>
  );
};

export default Dashboard;
