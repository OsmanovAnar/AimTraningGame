const startBtn = document.querySelector("#start-btn");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector(".time-list");
const timeEl = document.querySelector("#time");
const board = document.querySelector("#board");

let time = 0;
let score = 0;
let intevalId = 0;

document.addEventListener("click", ({ target }) => {
    if (target.closest("#start-btn")) {
        screens[0].classList.add("up");
    }

    if (target.classList.contains("time-btn")) {
        time = +target.dataset.time;
        screens[1].classList.add("up");
        startGame();
    }

    if (target.classList.contains("circle")) {
        score++;
        target.remove();
        createRandomCircle();
    }

    if (target.closest(".restart")) {
        screens.forEach((screen) => screen.classList.remove("up"));
        board.innerHTML = "";
        window.location.reload();
    }
});

startGame = () => {
    intevalId = setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
};

decreaseTime = () => {
    if (time === 0) {
        timeEl.textContent = `00:00`;
        finishGame();
    } else {
        --time;
        setTime(time);
    }
};

setTime = (value) =>
    value >= 10
        ? (timeEl.textContent = `00:${value}`)
        : (timeEl.textContent = `00:0${value}`);

createRandomCircle = () => {
    const circle = document.createElement("div");
    circle.classList.add("circle");
    const size = getRandomNumber(10, 60);
    const { width, height } = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);

    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;

    board.append(circle);
};

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

finishGame = () => {
    timeEl.parentNode.remove();
    board.innerHTML = `
      <div class="finish-box">
        <h1>Счет: <span class="score">${score}</span></h1>
        <button class="restart">На главную</button>
    </div>
    `;
    clearInterval(intevalId);
};
