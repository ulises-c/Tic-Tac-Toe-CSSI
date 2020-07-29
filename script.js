let quadrantData, areaCollision, boxWidth, boxHeight, moves;
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
    boardArray = [
        ["empty", "empty", "empty"],
        ["empty", "empty", "empty"],
        ["empty", "empty", "empty"]
    ]
    // crossImage = loadImage("https://i.imgur.com/a2GcPMe.png");
    // image(crossImage, 100, 100, 100, 100);
}

function draw(){
    background(200);
    ticTacToeBoard();
    writeNumbers();
    if(testBool) aCircle.display(mouseX, mouseY);
    else if(!testBool) aCross.display(mouseX, mouseY);
    checkCollision();
    boardPopulate();
    // drawTest();
}

function boardPopulate(){
    // 
    for(let i = 0; i < boardArray.length; i++){
        for(let j = 0; j < boardArray[i].length; j++){
            if(boardArray[i][j] == "circle"){
                aCircle.display(quadrantData[i][j].xCenter, quadrantData[i][j].yCenter);
            }
            else if (boardArray[i][j] == "cross"){
                aCross.display(quadrantData[i][j].xCenter, quadrantData[i][j].yCenter);
            }
        }
    }
}

function quadInformation(){
    // array that stores quadrant coordinates
    quadrantData = [
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
            if(areaCollision[i][j] && mouseIsPressed && boardArray[i][j] == "empty"){
                // the following updates boardArray
                if(testBool){
                    aCircle.display(quadrantData[i][j].xCenter, quadrantData[i][j].yCenter);
                        boardArray[i][j] = "cross";
                        quadrantData[i][j].shape = "cross"
                    // returning cross because previous click was a cross
                    return "cross";
                }
                else if(!testBool){
                    aCross.display(quadrantData[i][j].xCenter, quadrantData[i][j].yCenter);
                        boardArray[i][j] = "circle"
                        quadrantData[i][j].shape = "circle"
                    // returning circle because previous click was a circle
                    return "circle";
                }
            } 
        }
    }
}

function mousePressed(){
    // checks if the mouse has been clicked
    if(testBool) testBool = false;
    else if(!testBool) testBool= true;
    console.log("Move #" + moves + " =", checkCollision());
    console.log(boardArray);
    moves++;
    // if boardArray[0] && boardArray[1] && boardArray[2] don't contain "empty"
    for(let i = 0; i < boardArray.length; i++){
        if(moves > 10 && !boardArray[i].includes("empty")) setup();
    }
}

function drawTest(){
    // anotherCross = new Cross();
    // angleRotation += 0.5
    // rotate(angleRotation);
    // // translate(width * 1/10 + width * 1/6, height * 1/10 - height * 7/17);
    // // rotate(45);
    // anotherCross.display(quadrantData[1].xCenter, quadrantData[1].yCenter);
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