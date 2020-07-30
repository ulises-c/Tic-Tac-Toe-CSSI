let quadrantData, areaCollision, boxWidth, boxHeight, moves, winner;
let cross = "cross"
let circle = "circle"
let empty = "empty"
let testBool = false;
let boardArray = [];

function setup(){
    createCanvas(800, 800);
    quadInformation();
    aCircle = new Circle();
    aCross = new Cross();
    boxWidth = width * 1/3;
    boxHeight = height * 1/3;
    moves = 1;
    textSize(20);
    boardArray = [
        [empty, empty, empty],
        [empty, empty, empty],
        [empty, empty, empty]
    ]
    // crossImage = loadImage("https://i.imgur.com/a2GcPMe.png");
    // image(crossImage, 100, 100, 100, 100);
}

function draw(){
    background(200);
    ticTacToeBoard();
    // writeNumbers();
    mouseHoverIcon();
    checkCollision();
    boardPopulate();
    // drawTest();
}

function mouseHoverIcon(){
    iconCheck = checkWinner(boardArray)
    if(moves < 9 &&iconCheck == "Pending"){
        if(testBool) aCross.display(mouseX, mouseY);
        else if(!testBool) aCircle.display(mouseX, mouseY);
    }
}

function boardPopulate(){
    // shows circles and crosses
    for(let i = 0; i < boardArray.length; i++){
        for(let j = 0; j < boardArray[i].length; j++){
            if(boardArray[i][j] == circle){
                aCircle.display(quadrantData[i][j].xCenter, quadrantData[i][j].yCenter);
            }
            else if (boardArray[i][j] == cross){
                aCross.display(quadrantData[i][j].xCenter, quadrantData[i][j].yCenter);
            }
        }
    }
}

function quadInformation(){
    // array that stores quadrant coordinates
    quadrantData = [
        // top row
        [
            {
                // top left
                x: width * 1/3,
                y: height * 1/3,
                xCenter: width * 1/6,
                yCenter: height * 1/6,

            },
            {
                // top middle
                x: width * 2/3,
                y: height * 1/3,
                xCenter: width * 3/6,
                yCenter: height * 1/6,
            },
            {
                // top right
                x: width,
                y: height * 1/3,
                xCenter: width * 5/6,
                yCenter: height * 1/6,
            }
        ],
        // middle row
        [
            {
                // middle left
                x: width * 1/3,
                y: height * 2/3,
                xCenter: width * 1/6,
                yCenter: height * 3/6,
            },
            {
                // center
                x: width * 2/3,
                y: height * 2/3,
                xCenter: width * 3/6,
                yCenter: height * 3/6,
            },
            {
                // middle right
                x: width,
                y: height * 2/3,
                xCenter: width * 5/6,
                yCenter: height * 3/6,
            }
        ],
        // bottom row
        [
            {
                // bottom left
                x: width * 1/3,
                y: height,
                xCenter: width * 1/6,
                yCenter: height * 5/6,
            },
            {
                // bottom middle
                x: width * 2/3,
                y: height,
                xCenter: width * 3/6,
                yCenter: height * 5/6,
            },
            {
                // bottom right
                x: width,
                y: height,
                xCenter: width * 5/6,
                yCenter: height * 5/6,
            }
        ]
    ];
}

function writeNumbers(){
    // writes numbers within quadrants
    for(let i = 0; i < quadrantData.length; i++){
        for(let j = 0; j< quadrantData[i].length; j++){
            text(`${i}, ${j}`, quadrantData[i][j].xCenter, quadrantData[i][j].yCenter);
        }
    }
}

function ticTacToeBoard(){
    // draws lines to create tic tac toe board
    fill("black");
    stroke(5);
    verticalLine1 = line(width * 1/3, 0, width * 1/3, height);
    verticalLine2 = line(width * 2/3, 0, width * 2/3, height);
    horizontalLine1 = line(0, height * 1/3, width, height * 1/3);
    horizontalLine2 = line(0, height * 2/3, width, height * 2/3);
}

function checkCollision(){
    // checks collisions between quadrants and mouse
    // used to determine where to place the circle or cross
    // collidePointRect(pointX, pointY, x, y, width, height)
    areaCollision = [
        // Row 0
        [
            collidePointRect(mouseX, mouseY, 0, 0, boxWidth, boxHeight),
            collidePointRect(mouseX, mouseY, quadrantData[0][0].x, 0, boxWidth, boxHeight),
            collidePointRect(mouseX, mouseY, quadrantData[0][1].x, 0, boxWidth, boxHeight)
        ],
        // Row 1
        [
            collidePointRect(mouseX, mouseY, 0, quadrantData[0][0].y, boxWidth, boxHeight),
            collidePointRect(mouseX, mouseY, quadrantData[1][0].x, quadrantData[0][0].y, boxWidth, boxHeight),
            collidePointRect(mouseX, mouseY, quadrantData[1][1].x, quadrantData[0][2].y, boxWidth, boxHeight)
        ],
        // Row 2
        [
            collidePointRect(mouseX, mouseY, 0, quadrantData[1][0].y, boxWidth, boxHeight),
            collidePointRect(mouseX, mouseY, quadrantData[2][0].x, quadrantData[1][1].y, boxWidth, boxHeight),
            collidePointRect(mouseX, mouseY, quadrantData[2][1].x, quadrantData[1][2].y, boxWidth, boxHeight)
        ]
    ];

    for(let i = 0; i < quadrantData.length; i++){
        for(let j = 0; j < quadrantData[i].length; j++){
            // the following updates the board
            // if collision is true in the quadrant
            // & if mouse is clicked
            // & if the board is empty in the quadrant
            if(areaCollision[i][j] && mouseIsPressed && boardArray[i][j] == empty){
                // the following updates boardArray
                if(testBool){
                    aCircle.display(quadrantData[i][j].xCenter, quadrantData[i][j].yCenter);
                        boardArray[i][j] = cross;
                        moves++;
                        if(testBool) testBool = false;
                        else if(!testBool) testBool = true;
                    // returning cross because previous click was a cross
                    return cross;
                }
                else if(!testBool){
                    aCross.display(quadrantData[i][j].xCenter, quadrantData[i][j].yCenter);
                        boardArray[i][j] = circle
                        moves++;
                        if(testBool) testBool = false;
                        else if(!testBool) testBool = true;
                    // returning circle because previous click was a circle
                    return circle;
                }
            } 
        }
    }
}

function mousePressed(){
    // checks if the mouse has been clicked
    console.log("Move #" + moves + " =", checkCollision());
    console.log(boardArray);
    ticTacToeMoves(moves);
    gameOverCheck();
    if(ticTacToeMoves(moves) !== "Pending") gameOverDisplay();
}

function drawTest(){
    // anotherCross = new Cross();
    // angleRotation += 0.5
    // rotate(angleRotation);
    // // translate(width * 1/10 + width * 1/6, height * 1/10 - height * 7/17);
    // // rotate(45);
    // anotherCross.display(quadrantData[1].xCenter, quadrantData[1].yCenter);
}

function gameOverCheck() {
    // if boardArray[0] && boardArray[1] && boardArray[2] don't contain empty
    // checks that the board is full
    for(let i = 0; i < boardArray.length; i++){
        // if game is over
        if(moves > 9 && !boardArray[i].includes(empty)) {
            gameOverDisplay();
        }
    }
    // Here, we must create a condition where three of the same character are present in a row, column, or diagonal.
    // I was thinking that an if conditional be implemented for each row and column, multiplied by t
}

function gameOverDisplay(){
    noLoop();
    console.log("Game has ended")
    background(150);
    stroke("black");
    fill("green");
    textSize(50)
    rect(quadrantData[1][1].xCenter, quadrantData[1][1].yCenter, boxWidth, boxHeight);
    fill("black");
    text("Game has ended;\nno more moves\navailable!", quadrantData[2][1].xCenter-100, quadrantData[2][1].yCenter-50);
    text("The winner is", quadrantData[0][1].xCenter-150, quadrantData[0][1].yCenter);
    text(`\n${winner}`, quadrantData[0][1].xCenter, quadrantData[0][1].yCenter);
    let gameOverBox = collidePointRect(mouseX, mouseY, quadrantData[1][0].x, quadrantData[0][0].y, boxWidth, boxHeight)
    if(gameOverBox){
        if(mouseIsPressed)
            loop();
            setup();
    }
}

function ticTacToeMoves(moves){
    if(moves > 9) console.log("Game Over");
    // else if(moves < 9) console.log("Game Pending");
    winner = checkWinner(boardArray);
    console.log(winner);
    return winner;
}

function checkWinner(boardArray){
    let leftDiag = [empty, empty, empty];
    let rightDiag = [empty, empty, empty];
    let diagCheck = 2;
    
    // algorithm 
    for(let i = 0; i < 3; i++){
        // checking columns
        if(boardArray.every(row => row[i] === cross)) return "X";
        if(boardArray.every(row => row[i] === cross)) return "O";
        // checking rows
        if(boardArray[i].every(item => item === cross)) return "X";
        if(boardArray[i].every(item => item === circle)) return "O";
        leftDiag[i] = boardArray[i][i];
        rightDiag[i] = boardArray[i][diagCheck];
        diagCheck--;
    }
    // console.log("left diagonal:", leftDiag);
    // console.log("right diagonal:", rightDiag);
    if(leftDiag.every(item => item === cross)) return "X";
    if(leftDiag.every(item => item === circle)) return "O";
    if(rightDiag.every(item => item === cross)) return "X";
    if(rightDiag.every(item => item === circle)) return "O";
    else return "Pending"
}

class Cross {
    constructor(){
        this.w = 100;
        this.h = 20;
        this.color = "red";
    }
    display(xLocation, yLocation){
        noStroke();
        fill(this.color);
        rectMode(CENTER);
        rect(xLocation, yLocation, this.w, this.h);
        rect(xLocation, yLocation, this.h, this.w);
        // image(crossImage, this.x, this.y);
    }
}

class Circle {
    constructor(){
        this.radius = 100;
        this.color = "blue";
    }
    display(xLocation, yLocation){
        stroke(this.color);
        // noFill();
        fill(this.color);
        ellipse(xLocation, yLocation, this.radius);
    }
}