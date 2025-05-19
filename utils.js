// src/utils.js
export function shuffleQuestions(questions) {
    return questions.sort(() => Math.random() - 0.5); // Shuffle the questions randomly
  }
  