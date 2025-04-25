document.getElementById("color-toggle").addEventListener("click", (e) => {
    e.preventDefault();
    generateDarkAcademiaPalette();
});

// p5.js Setup
function setup() {
    noCanvas();
}


const darkAcademiaColors = [
    "#3e3e3e", // Dark Gray
    "#5c3d2e", // Coffee Brown
    "#2c3e50", // Deep Navy
    "#4b3621", // Dark Chocolate
    "#2e2e2e", // Charcoal Black
    "#403233", // Ash Brown
    "#223322", // Dark Olive
    "#552222", // Muted Burgundy
    "#3a3f35", // Moss Green
    "#463f3a", // Walnut
    "#2d2d34", // Dark Slate
    "#3b3b58", // Deep Indigo
    "#524c42", // Smoky Brown
];


function generateDarkAcademiaPalette() {
    const bgHex = random(darkAcademiaColors);
    let accentHex = random(darkAcademiaColors);

    while (accentHex === bgHex) {
        accentHex = random(darkAcademiaColors);
    }

    // Set background
    document.body.style.backgroundColor = bgHex;
    document.body.style.color = "#f2f2f2";

    // Set nav
    document.querySelector("nav").style.backgroundColor = accentHex;

    // Set cards
    document.querySelectorAll(".bottom-box, .task-box").forEach(el => {
        el.style.backgroundColor = accentHex;
        el.style.color = "#f2f2f2";
    });

    const todoSection = document.querySelector(".todo-section");
    todoSection.style.backgroundColor = accentHex;
    todoSection.style.color = "#f2f2f2";
    const examTracker = document.getElementById("exam-tracker");
    examTracker.style.backgroundColor = accentHex;
    examTracker.style.color = "#f2f2f2";

    document.querySelectorAll("#task-list li").forEach(li => {
        li.style.color = "#2d1d0e";
    });

    document.querySelectorAll("#exam-list li").forEach(li => {
        li.style.color = "#2d1d0e"; 
    });
}
