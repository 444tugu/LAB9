import confetti from "https://cdn.skypack.dev/canvas-confetti";

    let words = [
        "apple",
        "pineapple",
        "watermelon",
        "banana",
        "orange",
        "grape",
        "strawberry",
        "peach",
        "cherry",
    ];

    const winWidth = window.innerWidth;

    let keyboardBtns = document.querySelectorAll(".keyboard-btn");
    keyboardBtns.forEach((key) => {
        key.addEventListener("click", () => play(key.getAttribute("id")));
    });

    const tries_div = document.querySelector(".tries");
    const start_button = document.querySelector("#start");
    const main = document.querySelector(".main");
    const main_div = document.querySelector(".inner-main");
    const img = document.querySelector("#hangman");
    const startGame = document.querySelector("#start-game");
    let blocks = null;
    let dupWord = [];
    let word = [];
    let tries = 0;
    let totalTries = null;
    let firstTime = true;

    const tries0Modal = document.querySelector("#modal-tries0");
    const winModal = document.querySelector("#modal-win");
    const loseModal = document.querySelector("#modal-lose");
    const secretWord = document.querySelector("#secret-word");

    disableBtns();

    start_button.addEventListener("click", () => {
        disableStart();
        enableBtns();
        clearFails();
        clearMainDiv();
        genWrdBlocks();
        setTries();
    });

    function play(id) {
        if (tries > 0) {
            let match = word.includes(id); // Үсгийг олох эсэхийг шалгана.
            if (match) {
                blocks.forEach((block) => {
                    // Үсэг болон харагдаагүй блокыг шалгана.
                    if (!block.classList.contains("visible") && block.textContent === id) {
                        block.classList.add("visible");
                    }
                });
                // Одоо бүх давхацсан үсгийг устгах.
                word = word.filter((letter) => letter !== id);

                document.querySelector(`#${id}`).disabled = true;
            } else {
                // Үсэг таараагүй тохиолдолд алдаа тэмдэглэнэ.
                document.querySelector(`#${id}`).classList.add("fail");
                document.querySelector(`#${id}`).disabled = true;
                decTries();
                document.querySelector(
                    ".tries"
                ).innerHTML = `${tries} out of ${totalTries} tries left`;
                setImg();
            }
        }
        winLose(); // Ялалт/ялагдал шалгана.
    }
    

    function getRnd(min, max) {
        let step1 = max - min + 1;
        let step2 = Math.random() * step1;
        let result = Math.floor(step2) + min;
        return result;
    }

    function getRndWord() {
        let word = words[getRnd(0, words.length - 1)].split("");
        if (word.length >= 7 && winWidth <= 768) {
            main.style.height = "140px";
        }
        return word;
    }

    function genWrdBlocks() {
        word = getRndWord();
        console.log(word);
        dupWord = [...dupWord, ...word];

        word.forEach((letter) => {
            let div = document.createElement("div");
            div.classList.add(`main-block`);
            div.classList.add(`val-${letter}`);
            div.innerHTML = letter;
            main_div.appendChild(div);
        });
        blocks = document.querySelectorAll(".main-block");
    }

    function resetAll() {
        tries = 0;
        document.querySelector(".tries").innerHTML = "tries";
        startGame.innerHTML = "Play Again";
        img.src = "./assets/images/0.png";
        word = [];
        dupWord = [];
        clearFails();
        clearMainDiv();
        enableStart();
    }

    function clearFails() {
        for (let i = 97; i < 123; i++) {
            document
                .querySelector(`#${String.fromCharCode(i)}`)
                .classList.remove("fail");
        }
    }

    function clearMainDiv() {
        main_div.innerHTML = "";
    }

    function setImg() {
        if (tries == 4) {
            img.src = "./assets/images/2.png";
        } else if (tries == 3) {
            img.src = "./assets/images/3.png";
        } else if (tries == 2) {
            img.src = "./assets/images/4.png";
        } else if (tries == 1) {
            img.src = "./assets/images/5.png";
        } else if (tries == 0) {
            img.src = "./assets/images/6.png";
        }
    }

    function setTries() {
        tries = 5;
        totalTries = 5;
        tries_div.innerHTML = `${tries} out of ${totalTries} tries left`;
    }

    function decTries() {
        tries -= 1;
    }

    function disableStart() {
        start_button.disabled = true;
        start_button.classList.add("start-fail");
    }

    function enableStart() {
        start_button.disabled = false;
        start_button.classList.remove("start-fail");
    }

    function disableBtns() {
        for (let i = 97; i < 123; i++) {
            document.querySelector(`#${String.fromCharCode(i)}`).disabled = true;
        }
    }

    function enableBtns() {
        for (let i = 97; i < 123; i++) {
            document.querySelector(`#${String.fromCharCode(i)}`).disabled = false;
        }
    }

    function winLose() {
        if (tries === 0) {
            secretWord.innerHTML = `secret word was "${dupWord.join("")}"`;
            openLose();
            setTimeout(() => {
                closeLose();
                resetAll();
                disableBtns();
            }, 2500);
        } else if (
            document.querySelectorAll(".visible").length === dupWord.length
        ) {
            confetti({
                particleCount: 200,
                scalar: 1.175,
                angle: 60,
                gravity: 0.75,
                spread: 70,
                origin: { x: 0 },
            });
            confetti({
                particleCount: 200,
                scalar: 1.175,
                angle: 120,
                gravity: 0.75,
                spread: 70,
                origin: { x: 1 },
            });
            openWin();
            resetAll();
            disableBtns();
            setTimeout(() => {
                closeWin();
            }, 3000);
        }
    }

    function openTries0() {
        tries0Modal.showModal();
    }
    function closeTries0() {
        tries0Modal.close();
    }
    function openWin() {
        winModal.showModal();
    }
    function closeWin() {
        winModal.close();
    }
    function openLose() {
        loseModal.showModal();
    }
    function closeLose() {
        loseModal.close();
    }
    function tries0() {
        openTries0();
        setTimeout(() => {
            closeTries0();
        }, 1000);
    }
