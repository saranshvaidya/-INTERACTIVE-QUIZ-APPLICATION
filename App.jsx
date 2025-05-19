// Import necessary hooks and libraries
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import QuestionCard from './components/QuestionCard';
import { shuffleQuestions } from './utils/utils';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function App() {
  // App states
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [quizEnded, setQuizEnded] = useState(false);
  const [timeTaken, setTimeTaken] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [feedback, setFeedback] = useState(''); // Feedback after answering

  const aboutRef = useRef(null); // Reference to the About section div

  gsap.registerPlugin(useGSAP); // Register GSAP plugin for animations

  // Initial animations when page loads
  useGSAP(() => {
    const t1 = gsap.timeline();
    
    // Animate Navbar
    t1.from("#nav", {
      x: 750,
      width: 0,
      duration: 1.5,
      opacity: 0,
      ease: "power3.out",
    });

    // Animate Start Quiz button
    t1.from("#start", {
      scale: 0,
      opacity: 0,
      ease: "power3.out",
    });

    // Animate About section
    t1.from(aboutRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out",
    });
  }, []);

  // Animate About section disappearing when quiz starts
  useEffect(() => {
    if (quizStarted) {
      gsap.to(aboutRef.current, {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: "power2.in",
        onComplete: () => {
          if (aboutRef.current) {
            aboutRef.current.style.display = "none"; // Hide the element after animation
          }
        },
      });
    }
  }, [quizStarted]);

  // Fetch quiz questions from API when quiz starts
  useEffect(() => {
    if (quizStarted) {
      const fetchQuestions = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            'https://opentdb.com/api.php?amount=10&type=multiple'
          );
          
          // Process and shuffle questions
          const questions = response.data.results.map((item) => ({
            question: item.question,
            options: [...item.incorrect_answers, item.correct_answer].sort(() => Math.random() - 0.5),
            correctAnswer: item.correct_answer
          }));
          
          setQuizQuestions(shuffleQuestions(questions));
          setLoading(false);
          setStartTime(Date.now()); // Start timer
        } catch (error) {
          console.error('Error fetching questions:', error);
          setLoading(false);
        }
      };

      fetchQuestions();
    }
  }, [quizStarted]);

  // Handle when an answer is selected
  const handleAnswer = (selectedAnswer) => {
    const isCorrect = selectedAnswer === quizQuestions[currentQ].correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1); // Increase score
      setFeedback('✅ Correct!'); // Show positive feedback
    } else {
      setFeedback('❌ Incorrect!'); // Show negative feedback
    }

    // Wait for 1.5 seconds to show feedback, then move to next question or end
    setTimeout(() => {
      setFeedback('');
      if (currentQ < quizQuestions.length - 1) {
        setCurrentQ(currentQ + 1);
      } else {
        const endTime = Date.now();
        setTimeTaken(Math.floor((endTime - startTime) / 1000)); // Calculate time taken
        setQuizEnded(true); // End the quiz
      }
    }, 1500);
  };

  // Handle starting or restarting the quiz
  const handleStart = () => {
    setQuizStarted(true);
    setQuizEnded(false);
    setScore(0);
    setCurrentQ(0);
    setStartTime(null);
    setTimeTaken(0);
  };

  return (
    <>
      {/* Navbar with timer */}
      <Navbar startTime={startTime} quizEnded={quizEnded} />

      <div className="app w-full p-[6.5vw]">
        {/* Before quiz starts */}
        {!quizStarted ? (
          <div className="text-center text-white flex flex-col items-center gap-6">
            {/* Start Quiz Button */}
            <button
              id="start"
              className="bg-[#0CD3FB] text-black px-6 py-3 text-[1.2vw] rounded-xl cursor-pointer"
              onClick={handleStart}
            >
              Start Quiz
            </button>

            {/* About Section */}
            <div ref={aboutRef} className="max-w-2xl text-gray-300 text-lg leading-relaxed mt-4">
              <p>
                Welcome to <span className="text-[#0CD3FB] font-semibold">Quizzy</span>!<br />
                Test your knowledge across multiple categories.<br />
                Answer quickly and accurately to get the best score.<br />
                Good luck! 🚀
              </p>
            </div>
          </div>

        ) : loading ? ( // Loading state
          <div className="text-white">Loading...</div>

        ) : !quizEnded ? ( // Quiz ongoing
          <>
            <QuestionCard
              question={quizQuestions[currentQ]}
              currentQ={currentQ}
              totalQuestions={quizQuestions.length}
              onAnswer={handleAnswer}
            />
            {/* Feedback Text */}
            {feedback && (
              <div className="text-center text-2xl font-bold text-white mt-6">
                {feedback}
              </div>
            )}
          </>

        ) : ( // Quiz ended - show dashboard
          <Dashboard
            score={score}
            timeTaken={timeTaken}
            totalQuestions={quizQuestions.length}
            onRestart={handleStart}
          />
        )}
      </div>
    </>
  );
}

export default App;
