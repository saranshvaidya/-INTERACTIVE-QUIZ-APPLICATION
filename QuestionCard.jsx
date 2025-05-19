import { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Component to render a question with animated transitions
function QuestionCard({ question, currentQ, totalQuestions, onAnswer }) {
  // Ref to target the question element for animation
  const questionRef = useRef();

  // Ref to target the list of option buttons for animation
  const optionsRef = useRef([]);

  useEffect(() => {
    // Animate the question text when it changes
    gsap.fromTo(
      questionRef.current,
      { opacity: 0, scale: 0.95 }, // start state
      { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' } // end state
    );

    // Animate the options list with staggered appearance
    gsap.fromTo(
      optionsRef.current,
      { x: -50, opacity: 0 }, // start state
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.1, // delay between each button animation
      }
    );
  }, [question]); // Runs animation every time the question changes

  // Fallback UI while the question data is loading
  if (!question) return <div>Loading...</div>;

  return (
    <div className="question-card">
      {/* Displays the current question number out of the total */}
      <h3
        ref={questionRef}
        className="text-lg font-semibold mb-4 text-center text-[#0CD3FB]"
      >
        Question {currentQ + 1} of {totalQuestions}
      </h3>

      {/* Displays the question text */}
      <p className="mb-6 text-xl text-[#0CD3FB]">{question.question}</p>

      {/* Renders each option as a button */}
      <div className="space-y-3">
        {question.options.map((opt, index) => (
          <button
            key={index}
            ref={(el) => (optionsRef.current[index] = el)} // Store button ref for animation
            className="w-full cursor-pointer py-3 bg-blue-100 hover:bg-blue-200 rounded text-left px-4 text-lg font-medium transition duration-200"
            onClick={() => onAnswer(opt)} // Callback when an option is selected
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuestionCard;
