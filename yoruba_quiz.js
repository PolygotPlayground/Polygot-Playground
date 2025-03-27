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
        { question: "How do you say 'Hello' in Yoruba?", options: ["Bawo ni", "O da", "E se", "Kedu"], answer: "Bawo ni" }, 
        { question: "What is the response to 'Bawo ni'?", options: ["Mo wa dada", "O dara", "E nle", "Daada ni"], answer: "Mo wa dada" }, 
        { question: "How do you say 'Good night' in Yoruba?", options: ["Ẹ káalẹ", "E ku irole", "Kaaro", "E ku odun"], answer: "Ẹ káalẹ" } 
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