// Canvas setup
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

// Function to generate random number within range
function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

// Array that contains all the circles & their properties 
let circles = [];

// Colora to use in gradient
const colors = [
    "#FDE8E9", // pink
    "#FDE8E9", // pink
    "#FFF7DB", // yellow
    "#77B6EA", // sky blue
    "#77B6EA", // sky blue
    // "#26555E", // dark teal
    "#C9D9EB"  // gray blue
]

// Set body backround to one of the colors above
document.body.style.backgroundColor = "#C9D9EB"

// Create circle data
function initCircles() {
    // Clear previous circle data 
    circles = [];
    // Number of circles based on screen size
    let circleCount = window.innerWidth / 100;
    
    // Loop code inside as many times as number of circles
    for (let i = 0; i < circleCount; i++) {
        // Set circle radius
        let radius = window.innerWidth / 4;

        // Set random circle position inside canvas on X and Y axes: 
        let x = randomBetween(radius, canvas.width - radius);
        let y = randomBetween(radius, canvas.height - radius);

        // Set random velocity on X and Y axes (speed that circle moves)
        let dx = randomBetween(window.innerWidth / -700, window.innerWidth / 700);
        let dy = randomBetween(window.innerHeight / -700, window.innerHeight / 700);
    
        // Assign random color to circle 
        let color = colors[Math.floor(Math.random() * colors.length)];
        
        // Add new circle data inside circles array
        circles.push({ x, y, dx, dy, radius, color });
    }
}

// Draw the circles with our new values
function drawCircle(circle) {
    // Begin circle path
    ctx.beginPath();

    // Create circle with parameters made from earlier
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, false);

    ctx.fillStyle = circle.color;
    ctx.fill();
    ctx.closePath();
}

// Animated function
function animate() {
    // Create animation by rerunning animate function over and over
    requestAnimationFrame(animate);
    // Clear all previously drawn elements from canvas 
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    circles.forEach(circle => {
        // If circle reaches edge of canvas on X axis (either side)
        if (circle.x + circle.radius > canvas.width || circle.x - circle.radius < 0) {
            circle.dx = -circle.dx;
        }
        // If circle reaches edge on Y axis on either side 
        if (circle.y +  circle.radius > canvas.height || circle.y - circle.radius < 0) {
            circle.dy = -circle.dy
        }
        // Any other case: keep moving in initial direction
        circle.x += circle.dx;
        circle.y += circle.dy;

        // Move circles by redrawing them over & over inside this animation
        drawCircle(circle);
    });
}

// Always make canvas fullscreen (a little bigger than entire screen)
function resizeCanvas() {
    canvas.width = window.innerWidth * 1.5;
    canvas.height = window.innerHeight * 1.5;

    // New circle data for new screen size
    initCircles();
}

// Make canvas full width on page load
resizeCanvas();

// Make canvas full width every time screen resizes
window.addEventListener("resize", resizeCanvas);

// Create circle data on page load
initCircles();

// Run animation on page load
animate();