import React from 'react';
import QuizButton from './QuizButton';

// Displays the final score and a "Try Again" button after quiz completion
function ScoreResult({ score, totalQuestions, onRestart }) {
  return (
    <div className="text-center">
      {/* Heading to indicate the quiz has ended */}
      <h2 className="text-2xl font-bold mb-4 text-green-600">Quiz Completed!</h2>

      {/* Shows the user's score out of the total number of questions */}
      <p className="mb-4 text-lg">
        Your Score: {score} / {totalQuestions}
      </p>

      {/* Reusable button to restart the quiz */}
      <QuizButton text="Try Again" onClick={onRestart} />
    </div>
  );
}

export default ScoreResult;
