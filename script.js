let quadrantInfo, areaCollision;
let boxWidth, boxHeight;
let testBool = false;
let boardArray = [];

function setup(){
    createCanvas(800, 800);
    quadrantInfos();
    aCircle = new Circle();
    aCross = new Cross();
    boxWidth = width * 1/3;
    boxHeight = height * 1/3;
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

function drawTest(){
    // anotherCross = new Cross();
    // angleRotation += 0.5
    // rotate(angleRotation);
    // // translate(width * 1/10 + width * 1/6, height * 1/10 - height * 7/17);
    // // rotate(45);
    // anotherCross.display(quadrantInfo[1].xCenter, quadrantInfo[1].yCenter);
}

function boardPopulate(){
    // 
    for(let i = 0; i < boardArray.length; i++){
        for(let j = 0; j < boardArray[i].length; j++){
            if(boardArray[i][j] == "circle"){
                aCircle.display(quadrantInfo[i][j].xCenter, quadrantInfo[i][j].yCenter);
            }
            else if (boardArray[i][j] == "cross"){
                aCross.display(quadrantInfo[i][j].xCenter, quadrantInfo[i][j].yCenter);
            }
        }
    }
}

function quadrantInfos(){
    // array that stores quadrant coordinates
    quadrantInfo = [
        [
            {
                // top left
                x: width * 1/3,
                y: height * 1/3,
                xCenter: width * 1/6,
                yCenter: height * 1/6,
                shape: ""
            },
            {
                // top middle
                x: width * 2/3,
                y: height * 1/3,
                xCenter: width * 3/6,
                yCenter: height * 1/6,
                shape: ""
            },
            {
                // top right
                x: width,
                y: height * 1/3,
                xCenter: width * 5/6,
                yCenter: height * 1/6,
                shape: ""
            }
        ],
        [
            {
                // middle left
                x: width * 1/3,
                y: height * 2/3,
                xCenter: width * 1/6,
                yCenter: height * 3/6,
                shape: ""
            },
            {
                // center
                x: width * 2/3,
                y: height * 2/3,
                xCenter: width * 3/6,
                yCenter: height * 3/6,
                shape: ""
            },
            {
                // middle right
                x: width,
                y: height * 2/3,
                xCenter: width * 5/6,
                yCenter: height * 3/6,
                shape: ""
            }
        ],
        [
            {
                // bottom left
                x: width * 1/3,
                y: height,
                xCenter: width * 1/6,
                yCenter: height * 5/6,
                shape: ""
            },
            {
                // bottom middle
                x: width * 2/3,
                y: height,
                xCenter: width * 3/6,
                yCenter: height * 5/6,
                shape: ""
            },
            {
                // bottom right
                x: width,
                y: height,
                xCenter: width * 5/6,
                yCenter: height * 5/6,
                shape: ""
            }
        ]
    ];
}

function writeNumbers(){
    // writes numbers within quadrants
    for(let i = 0; i < quadrantInfo.length; i++){
        for(let j = 0; j< quadrantInfo[i].length; j++){
            text(`${i}, ${j}`, quadrantInfo[i][j].xCenter, quadrantInfo[i][j].yCenter)
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
            collidePointRect(mouseX, mouseY, quadrantInfo[0][0].x, 0, boxWidth, boxHeight),
            collidePointRect(mouseX, mouseY, quadrantInfo[0][1].x, 0, boxWidth, boxHeight)
        ],
        // Row 1
        [
            collidePointRect(mouseX, mouseY, 0, quadrantInfo[0][0].y, boxWidth, boxHeight),
            collidePointRect(mouseX, mouseY, quadrantInfo[1][0].x, quadrantInfo[0][0].y, boxWidth, boxHeight),
            collidePointRect(mouseX, mouseY, quadrantInfo[1][1].x, quadrantInfo[0][2].y, boxWidth, boxHeight)
        ],
        // Row 2
        [
            collidePointRect(mouseX, mouseY, 0, quadrantInfo[1][0].y, boxWidth, boxHeight),
            collidePointRect(mouseX, mouseY, quadrantInfo[2][0].x, quadrantInfo[1][1].y, boxWidth, boxHeight),
            collidePointRect(mouseX, mouseY, quadrantInfo[2][1].x, quadrantInfo[1][2].y, boxWidth, boxHeight)
        ]
    ];

    for(let i = 0; i < quadrantInfo.length; i++){
        for(let j = 0; j < quadrantInfo[i].length; j++){
            // the following updates the board
            // if collision is true in the quadrant
            // & if mouse is clicked
            // & if the board is empty in the quadrant
            if(areaCollision[i][j] && mouseIsPressed && boardArray[i][j] == "empty"){
                // the following updates boardArray
                if(testBool){
                    aCircle.display(quadrantInfo[i][j].xCenter, quadrantInfo[i][j].yCenter);
                        boardArray[i][j] = "cross";
                    // returning cross because previous click was a cross
                    return "cross";
                }
                else if(!testBool){
                    aCross.display(quadrantInfo[i][j].xCenter, quadrantInfo[i][j].yCenter);
                        boardArray[i][j] = "circle"
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
    console.log(boardArray);
    console.log(checkCollision());
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