let holdDuration = 1000;  // 3 seconds, which matches the CSS transition
let holdTimeout;

function startHold() {
    const fillElement = document.getElementById('fill');
    fillElement.style.width = "100%";  // This triggers the fill effect

    holdTimeout = setTimeout(() => {
        alert('Action executed!');
        stopHold();
    }, holdDuration);
}

function stopHold() {
    clearTimeout(holdTimeout);

    const fillElement = document.getElementById('fill');
    fillElement.style.width = "0%";
    fillElement.style.transition = "width 0.05s ease-in-out";  // This resets the fill effect

    // Restore the transition after a short delay
    setTimeout(() => {
        fillElement.style.transition = "width 1s linear";
    }, 50);
}
