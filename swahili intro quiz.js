document.addEventListener("DOMContentLoaded", function () { 
    const quizContainer = document.getElementById("quiz-container"); 
    const submitButton = document.getElementById("submit-btn"); 
    const resultContainer = document.getElementById("result"); 
    const confettiCanvas = document.createElement("canvas"); 
    document.body.appendChild(confettiCanvas); 
    
    confettiCanvas.style.position = "fixed"; 
    confettiCanvas.style.top = 0; 
    confettiCanvas.style.left = 0; 
    confettiCanvas.style.width = "100%"; 
    confettiCanvas.style.height = "100%"; 
    confettiCanvas.style.pointerEvents = "none"; 
    
    let confettiActive = false; 
    let confettiContext = confettiCanvas.getContext("2d"); 
    let confettiParticles = []; 
    
    let currentQuestionIndex = 0; 
    let score = 0; 
    
    const questions = [ 
        { question: "What is 'Please'in Swahili?", options: ["Tafadhali", "Waitwa", "Miaka", "Unasema"], answer: "Tafadhali" }, 
        { question: "What is 'Yes' in Swahili?", options: ["Ni", "Kwa", "Ndio", "Kidogo"], answer: "Ndio" }, 
        { question: "How do you ask somebody where they're from in Swahili?", options: ["Habari gani?", "Shikamoo?", "Mingapi?", "Unatoka wapi?"], answer: "Unatoka wapi?" }, 
        { question: "How do you ask for somebody's name in Swahili?", options: ["Kidogo tu?", "Jina lako nani?", "Hujambo?", "Umekuwaje?"], answer: "Jina lako nani?" }, 
        { question: "How do you introduce yourslef to a mutual friend in Swahili?", options: ["Nimetoka…", "Mimi ni…", "Unatoka…", "Hali yako…"], answer: "Mimi ni…" }, 
        { question: "'Ni karibu?' means?", options: ["Are we there yet?", "How are you?", "Is it near?", "Are we close?"], answer: "Is it near?" }, 
        { question: "Is 'Jina langu ni…'?", options: ["Formal", "Informal", "Both", "Idk"], answer: "Formal" }, 
        { question: "What does 'Ninafurahi kukufahamu!' mean?", options: ["I'm happy to know you!", "Nice to meet you!", "My pleasure!", "No worries!"], answer: "I'm happy to know you!" }, 
        { question: "In which situation would you most likely use 'Jina langu ni…' to introduce yourself?", options: ["At the beach", "At a job interview", "At a college party", "Any situation"], answer: "At a job interview" }, 
        { question: "If I did not agree with somthing, I would say…", options: ["Ndio", "Poa", "Hapana", "Nzuri"], answer: "Hapana" } 
    ]; 
    
    function loadQuestion() { 
        const currentQuestion = questions[currentQuestionIndex]; 
        quizContainer.innerHTML = ` 
        <div class="quiz-question">${currentQuestion.question}</div> 
        <div class="quiz-options"> 
        ${currentQuestion.options.map(option => `<button class="quiz-option">${option}</button>`).join("")} 
        </div> 
    `; 
    
    document.querySelectorAll(".quiz-option").forEach(button => { 
        button.addEventListener("click", function () { 
            if (this.textContent === currentQuestion.answer) { 
                score++; 
            } 
            
            currentQuestionIndex++; 
            if (currentQuestionIndex < questions.length) { 
                loadQuestion(); 
            } else { 
                showResult(); 
            } 
        }); 
    }); 
} 

function showResult() { 
    quizContainer.style.display = "none"; 
    submitButton.style.display = "none"; 
    resultContainer.style.display = "block"; 
    
    let percentage = Math.round((score / questions.length) * 100); 
    resultContainer.innerHTML = `<h2>Your Score: ${score} / ${questions.length} (${percentage}%)</h2>`; 
    
    if (percentage >= 80) { 
        startConfetti(); 
    } 
} 

function startConfetti() { 
    if (confettiActive) return; 
    confettiActive = true; 
    
    for (let i = 0; i < 150; i++) { 
        confettiParticles.push({ 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight, 
            color: `hsl(${Math.random() * 360}, 100%, 50%)`, 
            size: Math.random() * 6 + 4, 
            speedX: Math.random() * 3 - 1.5, 
            speedY: Math.random() * 5 + 2 
        }); 
    } 
    
    function animateConfetti() { 
        confettiContext.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height); 
        
        confettiParticles.forEach((p, index) => { 
            p.y += p.speedY; 
            p.x += p.speedX; 
            
            if (p.y > window.innerHeight) { 
                p.y = -10; 
            } 
            
            confettiContext.fillStyle = p.color; 
            confettiContext.beginPath(); 
            confettiContext.arc(p.x, p.y, p.size, 0, Math.PI * 2); 
            confettiContext.fill(); 
        }); 
        
        requestAnimationFrame(animateConfetti); 
    } 
    confettiCanvas.width = window.innerWidth; 
    confettiCanvas.height = window.innerHeight; 
    animateConfetti(); 
} 

resultContainer.style.display = "none"; 
loadQuestion(); 
});