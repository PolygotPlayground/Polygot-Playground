const questions = [ 
    { question: "How do you say 'Hello' in Swahili?", correct: "Habari", options: ["Habari", "Sawa", "Nzuri", "Poa"] }, 
    { question: "What is the response to 'Hujambo'?", correct: "Sijambo", options: ["Marahaba", "Nzuri", "Sijambo", "Poa"] }, 
    { question: "What does 'Lala salama' mean?", correct: "Good night", options: ["Goodbye", "Good night", "Hello", "See you soon"] }, 
]; 

let currentQuestionIndex = 0; 
let score = 0; 

function loadQuestion() { 
    const questionElement = document.getElementById("question-text"); 
    const buttons = document.querySelectorAll(".answer-btn"); 
    
    questionElement.textContent = questions[currentQuestionIndex].question; 
    buttons.forEach((button, index) => { 
        button.textContent = questions[currentQuestionIndex].options[index]; 
        button.setAttribute("data-correct", questions[currentQuestionIndex].options[index] === questions[currentQuestionIndex].correct); 
    }); 
} 

function checkAnswer(button) { 
    if (button.getAttribute("data-correct") === "true") { 
        score++; confetti.start(); 
        setTimeout(() => confetti.stop(), 2000); 
    } 
    
    currentQuestionIndex++; 
    if (currentQuestionIndex < questions.length) { 
        loadQuestion(); 
    } else { 
        document.querySelector(".quiz-container").innerHTML = `<h2>Quiz Completed! 🎉</h2><p>Your score: ${score}/${questions.length}</p>`; 
    } 
} 

loadQuestion();