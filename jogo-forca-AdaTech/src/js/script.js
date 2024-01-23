import { categories, countries, animals, fruits } from "./arrays.js";

let drawnWord;
const correctLetters = [];
const wrongLetters = [];
//desabilitar botao de chutar enquanto nao gerar palavra
const buttonCategory = document.getElementById("chutar");
buttonCategory.disabled = true;

function renderCategories() {
    const containerButtons = document.querySelector(".botoes");
    containerButtons.innerHTML = categories
        .map((category) => {
            return `<button class="botao" >${category}</button>`;
        })
        .join("");
    const buttons = document.querySelectorAll(".botao");
    buttons.forEach((b) => {
        b.addEventListener("click", () => chooseCategory(b));
    });
}

renderCategories();

function chooseCategory(element) {
    switch (element.textContent.toLowerCase()) {
        case "países":
            drawnWord = countries[Math.floor(Math.random() * countries.length)];
            break;

        case "animais":
            drawnWord = animals[Math.floor(Math.random() * animals.length)];
            break;

        case "frutas":
            drawnWord = fruits[Math.floor(Math.random() * fruits.length)];
            break;

        default:
            console.log("Categoria não encontrada");
    }
    //ativar botao de chutar apos gerar palavra
    const buttonCategory = document.getElementById("chutar");
    buttonCategory.disabled = false;

    const buttons = document.querySelectorAll(".botao");
    buttons.forEach((b) => {
        b.disabled = true;
    });

    console.log(drawnWord);
    renderWord();
}

function renderWord() {
    const wordArray = drawnWord.split("");
    const divDrawnWord = document.querySelector(".palavra-sorteada");

    divDrawnWord.innerHTML = wordArray
        .map((letter) => {
            if (correctLetters.includes(letter)) {
                return `<span>${letter}</span>`;
            } else {
                return `<span>__</span>`;
            }
        })
        .join("");
}

document.addEventListener("keydown", handleKeyPress);

// Ouvinte de evento para capturar os cliques nos botões do teclado
const keyboard = document.querySelector(".teclado");
keyboard.addEventListener("click", handleButtonClick);

function handleKeyPress(event) {
    const pressedKey = event.key.toLowerCase();

    // Verifica se a tecla pressionada é uma letra do alfabeto
    if (/^[a-z]$/.test(pressedKey)) {
        handleKey(pressedKey);
    }
}

function handleButtonClick(event) {
    // Verifica se o clique foi em um botão do teclado
    if (event.target.tagName === "BUTTON") {
        const clickedKey = event.target.id.toLowerCase();
        handleKey(clickedKey);
    }
}

function handleKey(key) {
    // Desativa a tecla no teclado
    disableKey(key);

    //teste chute
    if (key === "chutar") {
        const guess = prompt("Chute a palavra:").toLowerCase();
        const wordArray = drawnWord.split("");
        const word = document.querySelector(".palavra-sorteada");
        const buttons = document.querySelectorAll(".botao-teclado");

        if (guess === drawnWord.toLowerCase()) {
            const buttons = document.querySelectorAll(".botao-teclado");

            buttons.forEach((letra) => {
                letra.disabled = true;
            });
            word.innerHTML = "";
            word.classList.add("correctWord");
            word.innerHTML = wordArray
                .map((l) => {
                    return `<span>${l.toUpperCase()}</span>`;
                })
                .join("");

            setTimeout(() => {
                alert("Você ganhou!");
            }, 500);
            return;
        } else {
            const popup = document.querySelector(".container-popup");
            const corretWord = document.querySelector(".correct-word");
            
            const body = document.querySelectorAll(".forca-parte");
            for (let i = 0; i < 6; i++) {
                body[i].style.display = "block";
            }
            word.innerHTML = "";
            word.classList.add("wrongWord");
            word.innerHTML = wordArray
                .map((l) => {
                    return `<span>${l.toUpperCase()}</span>`;
                })
                .join("");
            buttons.forEach((letra) => {
                letra.disabled = true;
            });

            corretWord.innerHTML = "";
            corretWord.innerHTML = drawnWord.toUpperCase();

            setTimeout(() => {
                popup.style.display = "block";
            }, 500);
            return;
        }
    }
    //fim teste chute

    // Verifica se a letra está correta ou errada
    if (drawnWord.includes(key)) {
        correctLetters.push(key);
    } else {
        wrongLetters.push(key);

        const body = document.querySelectorAll(".forca-parte");
        for (let i = 0; i < wrongLetters.length; i++) {
            body[i].style.display = "block";
        }
    }
    // Atualiza a exibição da palavra sorteada
    renderWord();

    // Verifica se o usuário ganhou ou perdeu
    checkGameStatus();
}

function disableKey(key) {
    // Desativa a tecla no teclado
    const keyElement = document.getElementById(key);
    if (keyElement) {
        keyElement.disabled = true;
    }
}

function checkGameStatus() {
    const body = document.querySelectorAll(".forca-parte");
    const wordArray = drawnWord.split("");

    if (wrongLetters.length === body.length) {
        const buttons = document.querySelectorAll(".botao-teclado");
        const word = document.querySelector(".palavra-sorteada");
        const popup = document.querySelector(".container-popup");
        const corretWord = document.querySelector(".correct-word");

        buttons.forEach((letra) => {
            letra.disabled = true;
        });

        word.innerHTML = "";
        word.classList.add("wrongWord");
        word.innerHTML = wordArray
            .map((l) => {
                return `<span>${l.toUpperCase()}</span>`;
            })
            .join("");

        corretWord.innerHTML = "";
        corretWord.innerHTML = drawnWord.toUpperCase();

        setTimeout(() => {
            popup.style.display = "block";
        }, 500);
    }

    if (wordInArray(drawnWord, correctLetters)) {
        const buttons = document.querySelectorAll(".botao-teclado");
        const word = document.querySelector(".palavra-sorteada");

        buttons.forEach((letra) => {
            letra.disabled = true;
        });

        word.innerHTML = "";
        word.classList.add("correctWord");
        word.innerHTML = wordArray
            .map((l) => {
                return `<span>${l.toUpperCase()}</span>`;
            })
            .join("");

        setTimeout(() => {
            alert("Você Ganhou!");
        }, 500);
    }
}

function wordInArray(word, array) {
    const wordArray = word.toLowerCase().split("");
    return wordArray.every((char) => array.includes(char));
}

const resetButton = document.querySelector('.resetButton');
resetButton.addEventListener('click', resetGame);

function resetGame() {
    console.log("Botão clicado. Função resetGame chamada.");
    location.reload();
}