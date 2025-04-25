const examNameInput   = document.getElementById("exam-name");
const examCourseInput = document.getElementById("exam-course");
const examDateInput   = document.getElementById("exam-date");
const addExamButton   = document.getElementById("add-exam");
const examList        = document.getElementById("exam-list");

let exams = JSON.parse(localStorage.getItem("exams")) || [];
renderExams();


function saveExams() {
    localStorage.setItem("exams", JSON.stringify(exams));
}

function renderExams() {
    examList.innerHTML = "";

    exams.forEach((exam, index) => {
        const li = document.createElement("li");
        li.className = "exam-item";

        const now = new Date();
        const examDate = new Date(exam.date);
        const diff = examDate - now;

        let countdown = "";

        // If exam is overdue or upcoming
        if (diff <= 0) {
            countdown = `<span class="late-badge">LATE</span>`;
        } else {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            countdown = `<span class="countdown">${days} day${days !== 1 ? "s" : ""} left</span>`;
        }

        // Build exam item in HTML
        li.innerHTML = `
          <div class="exam-entry ${exam.studied ? "studied" : ""}">
            <input
              type="checkbox"
              onchange="toggleExamStudied(${index})"
              ${exam.studied ? "checked" : ""}
            />
            <span class="exam-info">
              <strong>${exam.name}</strong> (${exam.course}) - ${exam.date}
            </span>
            ${countdown}
            <button onclick="deleteExam(${index})">X</button>
          </div>
        `;

        // Add to exam list
        examList.appendChild(li);
    });
    saveExams(); // Save every time re-render
}


function toggleExamStudied(index) {
    const li = examList.children[index];

    li.classList.add('fade-out');

    li.addEventListener('transitionend', () => {
        exams.splice(index, 1);
        renderExams();
    }, { once: true });
}


// ================================
// Delete an Exam
function deleteExam(index) {
    exams.splice(index, 1);
    renderExams();
}

// ================================
// Add New Exam
addExamButton.addEventListener("click", () => {
    const name   = examNameInput.value.trim();
    const course = examCourseInput.value.trim();
    const date   = examDateInput.value;

    if (name && course && date) {
        exams.push({ name, course, date, studied: false }); // Add new exam object
        examNameInput.value = "";
        examCourseInput.value = "";
        examDateInput.value = "";
        renderExams(); // Refresh list and save
    }
});
