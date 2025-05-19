import React from 'react';

// A reusable button component for the quiz app
function QuizButton({ text, onClick }) {
  return (
    <button 
      onClick={onClick} // Trigger the provided function when the button is clicked
      className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-lg font-semibold transition duration-200"
    >
      {text} {/* Display the button text passed as a prop */}
    </button>
  );
}

export default QuizButton;
