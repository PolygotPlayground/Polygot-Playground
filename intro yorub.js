const questions = [ 
    { question: "How do you ask 'What is your name?' in Yoruba?", options: ["Kín ni orúkọ yín?", "Nibo ni o ti wá?", "Ọmọ ọdún mélòó ni yìn?", "Nibo ló n gbé?"], answer: "Kín ni orúkọ yín?" }, 
    { question: "What is'to live' in Yoruba?", options: ["jìnnà", "láti", "gbé", "tóbi"], answer: "gbé" }, 
    { question: "How do you reply to 'Ọmọ ọdún mélòó ni ẹ́?'?", options: ["Mélòó __ ni mí", "Ọdún __ ni mí", "Ọmọ ọdún __ ni mí", "Ọmọ ọdún __ mí ni"], answer: "Ọmọ ọdún __ ni mí" }, 
    { question: "What is 'Nice to meet you!' in Yoruba?", options: ["Òkè òkun ni mo ti wá", "Bẹ́ẹ̀ni, ó sunmọ́", "ọ̀jọ́ kan pẹ̀lú", "Inú mi dùn láti pàdé yín!"], answer: "Inú mi dùn láti pàdé yín!" }, 
    { question: "What is 'It is not small' in Yoruba?", options: ["Ṣé ilé ẹ sunmọ́", "Kò kéré", "Ẹ kú ikú", "Rárá, kò jìnnà"], answer: "Kò kéré" }, 
    { question: "What is 'What' in Yoruba?", options: ["Kí ni?", "Nibo ni?", "Mo wá?", "Báwo ni?"], answer: "Kí ni?" } 
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