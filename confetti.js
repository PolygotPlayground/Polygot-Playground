function startConfetti() { 
    const duration = 3 * 1000; // 3 seconds
    const end = Date.now() + duration; 
    
    (function frame() { 
        confetti({ 
            particleCount: 5, 
            angle: 60, 
            spread: 55, 
            origin: { x: 0 } 
        }); 
        confetti({ 
            particleCount: 5, 
            angle: 120, 
            spread: 55, 
            origin: { x: 1 } 
        }); 
        
        if (Date.now() < end) { 
            requestAnimationFrame(frame); 
        } 
    })(); 
}