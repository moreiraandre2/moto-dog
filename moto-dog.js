let board;
let boardWidth = 750;
let boardHeight = 250;
let context;

let motoWidth = 88;
let motoHeight = 94;
let motoX = 50;
let motoY = boardHeight - motoHeight;
let motoImg;

let moto = {
    x: motoX,
    y: motoY,
    width: motoWidth,
    height: motoHeight
}

let dogArray = [];

let dogWidth = 54;
let dogHeight = 70;
let dogX = 700;
let dogY = boardHeight - dogHeight;

let dogImg;

let velocityX = -8;
let velocityY = 0;
let gravity = .4;
let milisecond = 1000;

let gameOver = false;
let score = 0;


window.onload = function() {
    board = document.getElementById('board');
    board.width = boardWidth;
    board.height = boardHeight;

    context = board.getContext("2d");

    //draw initial moto
    // context.fillStyle = "green";
    // context.fillRect(moto.x, moto.y, moto.width, moto.height);

    motoImg = new Image();
    motoImg.src = "./img/moto.png";
    motoImg.onload = function() {
        context.drawImage(motoImg, moto.x, moto.y, moto.width, moto.height);
    }

    dogImg = new Image();
    dogImg.src = "./img/dog.png";

    requestAnimationFrame(update);
    setInterval(placeDog, milisecond);

    document.addEventListener('keydown', moveMoto)
}

function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }

    context.clearRect(0, 0, board.width, board.height);

    velocityY+= gravity;
    moto.y = Math.min(moto.y + velocityY, motoY);
    if(moto.y < 156){
        motoImg.src = "./img/moto-jump.png";
    }
    else {
        motoImg.src = "./img/moto.png";
    }
    context.drawImage(motoImg, moto.x, moto.y, moto.width, moto.height);

    for(let i = 0; i < dogArray.length; i++) {
        let dog = dogArray[i];


        dog.x += velocityX;
        
        //think how to change the distance between dog and motocycle to dificult the game
        context.drawImage(dog.img, dog.x, dog.y, dog.width, dog.height);

        if(detectCollision(moto, dog)) {
            gameOver = true;
            if(moto.y < 156){
                motoImg.src = "./img/moto-jump-died.png";
            }
            else{
                motoImg.src = "./img/moto-died.png";
            }
            motoImg.onload = function () {
                context.drawImage(motoImg, moto.x, moto.y, moto.width, moto.height);
            }
        }
    }

    context.fillStyle = "black";
    context.font = "25px courier";
    score++;
    context.fillText(score, 5, 20);
}

function moveMoto(e){
    if (gameOver) {
        return;
    }
    
    if((e.code == "Space" || e.code == "ArrowUp") && moto.y == motoY) {
        velocityY = -10
    }
}

function placeDog() {
    if (gameOver) {
        return;
    }

    let dog = {
        img: dogImg,
        x: dogX,
        y: dogY,
        width: dogWidth,
        height: dogHeight
    }

    dogArray.push(dog);

    if(dogArray.length > 5) {
        dogArray.shift();
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
}