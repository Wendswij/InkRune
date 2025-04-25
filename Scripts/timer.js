const endDateInput = document.getElementById("semester-end");
const countdownDisplay = document.getElementById("countdown-display");
const countdownText = document.getElementById("time-left");
const countdownInput = document.getElementById("countdown-input");

let countdownInterval;

endDateInput.addEventListener("change", () => {
    const endDate = new Date(endDateInput.value);

    // If the date is invalid, exit early
    if (isNaN(endDate)) return;

    // Hide input, show countdown
    countdownInput.style.display = "none";
    countdownDisplay.style.display = "block";

    // Clear any existing countdown before start new one
    clearInterval(countdownInterval);

    countdownInterval = setInterval(() => {
        const now = new Date();
        const diff = endDate - now;

        // If countdown is finished
        if (diff <= 0) {
            countdownText.textContent = "Semester Ended!!! 🎓";
            clearInterval(countdownInterval);
            return;
        }

        // Calculate time left
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        // Update countdown text
        countdownText.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
});
