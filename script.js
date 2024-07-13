const quizData = [
    {
        question: "What is the capital of France?",
        a: "Berlin",
        b: "Madrid",
        c: "Paris",
        d: "Lisbon",
        correct: "c"
    },
    {
        question: "Who is the CEO of Tesla?",
        a: "Jeff Bezos",
        b: "Elon Musk",
        c: "Bill Gates",
        d: "Tony Stark",
        correct: "b"
    },
    {
        question: "What is the capital of Nepal?",
        a: "Kumari",
        b: "Pokhara",
        c: "Bhaktapur",
        d: "Kathmandu",
        correct: "d"
    },
    {
        question: "What is the most used programming language in 2021?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript",
        correct: "d"
    },
    {
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Hypertext Markdown Language",
        c: "Hyperloop Machine Language",
        d: "Helicopters Terminals Motorboats Lamborginis",
        correct: "a"
    }
];

const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");
const progressBar = document.getElementById("progress-bar");

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];
    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
    updateProgressBar();
}

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false);
}

function getSelected() {
    let answer;
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
}

function updateProgressBar() {
    const progress = ((currentQuiz + 1) / quizData.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function showResults() {
    let feedback;
    if (score === quizData.length) {
        feedback = "Excellent! You got all questions right!";
    } else if (score >= quizData.length / 2) {
        feedback = "Good job! You got more than half of the questions right.";
    } else {
        feedback = "Keep trying! Practice makes perfect.";
    }

    quiz.innerHTML = `
        <h2>You answered ${score}/${quizData.length} questions correctly</h2>
        <p>${feedback}</p>
        <button onclick="location.reload()">Reload</button>
    `;
}

submitBtn.addEventListener("click", () => {
    const answer = getSelected();
    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++;
        }
        currentQuiz++;
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            clearInterval(timer);
            showResults();
        }
    }
});

const timeElement = document.getElementById('time');
let timeLeft = 60;

function updateTimer() {
    timeLeft--;
    timeElement.innerText = timeLeft;
    if (timeLeft === 0) {
        clearInterval(timer);
        showResults();
    }
}

const timer = setInterval(updateTimer, 1000);

loadQuiz();
updateProgressBar();
