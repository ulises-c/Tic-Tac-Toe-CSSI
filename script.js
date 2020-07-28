let areaLocation, areaCollision;
let boxWidth, boxHeight;
let testBool = false;
let boardArray = [
    ["empty", "empty", "empty"],
    ["empty", "empty", "empty"],
    ["empty", "empty", "empty"]    
];

function setup(){
    createCanvas(400, 400);
    areaLocations();
    aCircle = new Circle();
    aCross = new Cross();
    boxWidth = width * 1/3;
    boxHeight = height * 1/3;
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
    // anotherCross.display(areaLocation[1].xCenter, areaLocation[1].yCenter);
}

function boardPopulate(){
    for(let i = 0; i < boardArray.length; i++){
        for(let j = 0; j < boardArray[i].length; j++){
            if(boardArray[i][j] == "circle"){
                aCircle.display(areaLocation[i][j].xCenter, areaLocation[i][j].yCenter);
            }
            else if (boardArray[i][j] == "cross"){
                aCross.display(areaLocation[i][j].xCenter, areaLocation[i][j].yCenter);
            }
        }
    }
}

function areaLocations(){
    areaLocation = [
        [
            {
                // top left
                x: width * 1/3,
                y: height * 1/3,
                xCenter: width * 1/6,
                yCenter: height * 1/6
            },
            {
                // top middle
                x: width * 2/3,
                y: height * 1/3,
                xCenter: width * 3/6,
                yCenter: height * 1/6
            },
            {
                // top right
                x: width,
                y: height * 1/3,
                xCenter: width * 5/6,
                yCenter: height * 1/6
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
                yCenter: height * 3/6
            },
            {
                // middle right
                x: width,
                y: height * 2/3,
                xCenter: width * 5/6,
                yCenter: height * 3/6
            }
        ],
        [
            {
                // bottom left
                x: width * 1/3,
                y: height,
                xCenter: width * 1/6,
                yCenter: height * 5/6
            },
            {
                // bottom middle
                x: width * 2/3,
                y: height,
                xCenter: width * 3/6,
                yCenter: height * 5/6
            },
            {
                // bottom right
                x: width,
                y: height,
                xCenter: width * 5/6,
                yCenter: height * 5/6
            }
        ]
    ];
}

function writeNumbers(){
    for(let i = 0; i < areaLocation.length; i++){
        for(let j = 0; j< areaLocation[i].length; j++){
            text(`${i}, ${j}`, areaLocation[i][j].xCenter, areaLocation[i][j].yCenter)
        }
    }
}

function ticTacToeBoard(){
    fill("black");
    stroke(5);
    verticalLine1 = line(width * 1/3, 0, width * 1/3, height);
    verticalLine2 = line(width * 2/3, 0, width * 2/3, height);
    horizontalLine1 = line(0, height * 1/3, width, height * 1/3);
    horizontalLine2 = line(0, height * 2/3, width, height * 2/3);
}

function checkCollision(){
    // collidePointRect(pointX, pointY, x, y, width, height)
    areaCollision = [
        // Row 0
        [
            collidePointRect(mouseX, mouseY, 0, 0, boxWidth, boxHeight),
            collidePointRect(mouseX, mouseY, areaLocation[0][0].x, 0, boxWidth, boxHeight),
            collidePointRect(mouseX, mouseY, areaLocation[0][1].x, 0, boxWidth, boxHeight)
        ],
        // Row 1
        [
            collidePointRect(mouseX, mouseY, 0, areaLocation[0][0].y, boxWidth, boxHeight),
            collidePointRect(mouseX, mouseY, areaLocation[1][0].x, areaLocation[0][0].y, boxWidth, boxHeight),
            collidePointRect(mouseX, mouseY, areaLocation[1][1].x, areaLocation[0][2].y, boxWidth, boxHeight)
        ],
        // Row 2
        [
            collidePointRect(mouseX, mouseY, 0, areaLocation[1][0].y, boxWidth, boxHeight),
            collidePointRect(mouseX, mouseY, areaLocation[2][0].x, areaLocation[1][1].y, boxWidth, boxHeight),
            collidePointRect(mouseX, mouseY, areaLocation[2][1].x, areaLocation[1][2].y, boxWidth, boxHeight)
        ]
    ];

    for(let i = 0; i < areaLocation.length; i++){
        for(let j = 0; j < areaLocation[i].length; j++){
            if(areaCollision[i][j]){
                // the following displays if collision is true in the quadrant
                if(testBool){
                    aCircle.display(areaLocation[i][j].xCenter, areaLocation[i][j].yCenter);
                    if(mousePressed){
                        boardArray[i][j] = "circle";
                    }
                    // returning cross because previous click was a cross
                    return "cross";
                }
                else if(!testBool){
                    aCross.display(areaLocation[i][j].xCenter, areaLocation[i][j].yCenter);
                    if(mousePressed){
                        boardArray[i][j] = "cross"
                    }
                    // returning circle because previous click was a circle
                    return "circle";
                }
            }
        }
    }
}

function mousePressed(){
    if(testBool) testBool = false;
    else if(!testBool) testBool= true;
    console.log(boardArray);
    console.log(checkCollision());
}

class Cross {
    constructor(){
        this.x = areaLocation[0].xCenter;
        this.y = areaLocation[0].yCenter;
        this.w = 50;
        this.h = 10;
        this.color = "red";
    }
    display(xLocation, yLocation){
        noStroke();
        fill(this.color);
        rectMode(CENTER);
        angleMode(DEGREES);
        // rotate(1);
        rect(xLocation, yLocation, this.w, this.h);
        rect(xLocation, yLocation, this.h, this.w);
        // image(crossImage, this.x, this.y);
    }
}

class Circle {
    constructor(){
        this.x = 200;
        this.y = 50;
        this.radius = 50;
        this.color = "blue";
    }
    display(xLocation, yLocation){
        stroke(this.color);
        noFill();
        ellipse(xLocation, yLocation, this.radius);
    }
}