const questions = [ 
    { 
        question: "How do you say 'Hello' in Swahili?", 
        options: ["Habari", "Kwa heri", "Shikamoo", "Nzuri"], 
        answer: "Habari" 
    }, 
    { 
        question: "How do you say 'Goodbye' in Kenyan Swahili?", 
        options: ["Hujambo", "Kwa heri", "Karibu", "Salama"], 
        answer: "Kwa heri" 
    }, 
    { 
        question: "What does 'Mambo' mean?", 
        options: ["Good morning", "What's up?", "Good evening", "How are you?"], 
        answer: "What's up?" 
    }, 
    { 
        question: "What is the response to 'Hujambo'?", 
        options: ["Sijambo", "Nzuri", "Salama", "Shikamoo"], 
        answer: "Sijambo" 
    }, 
    { 
        question: "What does 'Shikamoo' mean?", 
        options: ["Goodbye", "Good morning", "Hello (formal)", "How are you?"], 
        answer: "Hello (formal)" 
    }, 
    { question: "How do you say 'Sleep well' in Swahili?", 
        options: ["Marahaba", "Lala salama", "Mambo", "Nzuri"], 
        answer: "Lala salama" 
    }, 
    { 
        question: "Which of these means 'See you soon'?", 
        options: ["Tuonane tena", "Kwa herini", "Hali yako vipi?", "Habari za jioni"], 
        answer: "Tuonane tena" 
    }, 
    { 
        question: "What is the response to 'Mambo'?", 
        options: ["Nzuri", "Poa", "Sijambo", "Habari za asubuhi"], 
        answer: "Poa" 
    }, 
    { 
        question: "What does 'Karibu' mean?", 
        options: ["How are you?", "Goodbye", "Welcome", "Sleep well"], 
        answer: "Welcome" 
    }, 
    { 
        question: "Which greeting is used to ask 'How are you?' formally?", 
        options: ["Hujambo", "Habari za jioni", "Salama", "Kwa herini"], 
        answer: "Hujambo" 
    } 
]; 

let currentQuestionIndex = 0; 
let score = 0; 

const questionText = document.getElementById("question-text"); 
const optionsContainer = document.getElementById("options"); 
const nextButton = document.getElementById("next-btn"); 
const resultText = document.getElementById("result"); 
const feedbackText = document.getElementById("feedback"); 

function loadQuestion() { 
    let currentQuestion = questions[currentQuestionIndex]; 
    questionText.textContent = currentQuestion.question; 
    
    optionsContainer.innerHTML = ""; 
    
    currentQuestion.options.forEach(option => { 
        let button = document.createElement("button"); 
        button.textContent = option; 
        button.classList.add("option"); 
        button.addEventListener("click", () => checkAnswer(option, button)); 
        optionsContainer.appendChild(button); 
    }); 
    
    nextButton.style.display = "none"; 
    feedbackText.textContent = ""; 
} 

function checkAnswer(selected, button) { 
    let correctAnswer = questions[currentQuestionIndex].answer; 
    
    if (selected === correctAnswer) { 
        button.style.backgroundColor = "lightgreen"; 
        feedbackText.innerHTML = "✔️ Correct!"; 
        score++; 
        confetti(); 
    } else { 
        button.style.backgroundColor = "lightcoral"; 
        feedbackText.innerHTML = `❌ Wrong! The correct answer is ${correctAnswer}`; 
    } 
    
    document.querySelectorAll(".option").forEach(btn => btn.disabled = true); 
    nextButton.style.display = "block"; 
} 

function nextQuestion() { 
    currentQuestionIndex++; 
    
    if (currentQuestionIndex < questions.length) { 
        loadQuestion(); 
    } else { 
        showResult(); 
    } 
} 

function showResult() { 
    questionText.style.display = "none"; 
    optionsContainer.style.display = "none"; 
    nextButton.style.display = "none"; 
    feedbackText.style.display = "none"; 
    resultText.style.display = "block"; 
    resultText.innerHTML = `🎉 Quiz Complete! You scored <strong>${score} / ${questions.length}</strong>!`; 
} 

nextButton.addEventListener("click", nextQuestion); 
loadQuestion();
