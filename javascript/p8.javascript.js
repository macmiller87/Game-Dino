const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJumping = false;
let isGameover = false;
let position = 0;

function handleKeyUp(event) {
    if(event.keyCode === 32) {
        if(!isJumping) {
            jump();
        }
    }
}

function jump() {
    isJumping = true;

    let upInterval = setInterval(() => {
        if(position >= 150) {
              /* Descendo */
            clearInterval(upInterval);

            let dowInterval = setInterval(() => {
                if(position <= 0) {
                    clearInterval(dowInterval);
                    isJumping = false;
                } else {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                    }
            }, 20);
        } else {
                    /* Subindo */
                    position += 20;
                    dino.style.bottom = position + 'px';
            }
    }, 20);
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;

    if(isGameover) return;

    cactus.classList.add('cactus');
    background.appendChild(cactus);
    cactus.style.left = cactusPosition + 'px';

    let leftInterval = setInterval(() => {
        if(cactusPosition < -60) {
            /* Saiu da tela */
            clearInterval(leftInterval);
            background.removeChild(cactus);
        } else if(cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            /* Game over */
            clearInterval(leftInterval);
            isGameover = true;
            document.body.innerHTML = '<h1 class="game-over">FIM DE JOGO!</h1>';
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keyup', handleKeyUp);      