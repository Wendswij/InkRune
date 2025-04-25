const btnStartDropTimers = document.getElementById("start-drop-timers");
const dropInputContainer = document.getElementById("drop-date-inputs");
const dropDisplayContainer = document.getElementById("drop-countdowns");

// Drop Dates Input Fields
const dropDates = {
    "100": document.getElementById("drop-date-100"),
    "50": document.getElementById("drop-date-50"),
    "0": document.getElementById("drop-date-0")
};

// Countdown Display Elements
const countdownSpans = {
    "100": document.getElementById("countdown-100"),
    "50": document.getElementById("countdown-50"),
    "0": document.getElementById("countdown-0")
};


let dropIntervals = [];


function startDropCountdown(type, date) {
    const span = countdownSpans[type];

    const interval = setInterval(() => {
        const now = new Date();
        const end = new Date(date);
        const diff = end - now;

        // If date already passed
        if (isNaN(end.getTime()) || diff <= 0) {
            span.textContent = "Expired";
            clearInterval(interval);
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        span.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);


    dropIntervals.push(interval);
}


btnStartDropTimers.addEventListener("click", () => {
    dropIntervals.forEach(clearInterval);
    dropIntervals = [];
    const dates = {
        "100": dropDates["100"].value,
        "50": dropDates["50"].value,
        "0": dropDates["0"].value
    };

    if (!dates["100"] || !dates["50"] || !dates["0"]) {
        alert("Please fill in all drop dates.");
        return;
    }

    dropInputContainer.style.display = "none";
    dropDisplayContainer.style.display = "block";

    startDropCountdown("100", dates["100"]);
    startDropCountdown("50", dates["50"]);
    startDropCountdown("0", dates["0"]);
});
