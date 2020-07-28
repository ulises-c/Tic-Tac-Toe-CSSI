let areaLocation, areaCollision;
let boxWidth, boxHeight;
let testBool = false;
let boardArray = [
    ["empty", "empty", "empty"],
    ["empty", "empty", "empty"],
    ["empty", "empty", "empty"],    
];

function setup(){
    createCanvas(400, 400);
    areaLocations();
    aCircle = new Circle;
    aCross = new Cross;
    boxWidth = width * 1/3;
    boxHeight = height * 1/3;
    // crossImage = loadImage("https://i.imgur.com/a2GcPMe.png");
}

function draw(){
    background(200);
    ticTacToeBoard();
    // image(crossImage, 100, 100);
    writeNumbers();
    checkCollision();
    multiDimensionArrayTest();
    if(testBool) aCircle.display(mouseX, mouseY);
    else if(!testBool) aCross.display(mouseX, mouseY);
}

function multiDimensionArrayTest(){
    if(mouseIsPressed){
        for(let a = 0; a < boardArray.length; a++){
            console.log('---------------')
            for(let b = 0; b < boardArray[a].length; b++){
                // console.log(`Row ${a}, column ${b} is: "${boardArray[a][b]}"`);
                if(boardArray[a][b] == "empty"){
                    testArray = ["X", "O"]
                    randTest = random(testArray)
                    boardArray[a][b] = randTest;
                }
            }
        }
        console.log(boardArray);
    }
}

function areaLocations(){
    areaLocation = [
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
        },
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
        },
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
    ];
}

function writeNumbers(){
    for(let i = 0; i < areaLocation.length; i++){
        text(i, areaLocation[i].xCenter, areaLocation[i].yCenter)
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
    collidePointRect(mouseX, mouseY, 0, 0, boxWidth, boxHeight),
    collidePointRect(mouseX, mouseY, areaLocation[0].x, 0, boxWidth, boxHeight),
    collidePointRect(mouseX, mouseY, areaLocation[1].x, 0, boxWidth, boxHeight),
    collidePointRect(mouseX, mouseY, 0, areaLocation[0].y, boxWidth, boxHeight),
    collidePointRect(mouseX, mouseY, areaLocation[3].x, areaLocation[1].y, boxWidth, boxHeight),
    collidePointRect(mouseX, mouseY, areaLocation[4].x, areaLocation[2].y, boxWidth, boxHeight),
    collidePointRect(mouseX, mouseY, 0, areaLocation[3].y, areaLocation[6].x, areaLocation[6].y, boxWidth, boxHeight),
    collidePointRect(mouseX, mouseY, areaLocation[6].x, areaLocation[4].y, boxWidth, boxHeight),
    collidePointRect(mouseX, mouseY, areaLocation[7].x, areaLocation[5].y, boxWidth, boxHeight)
    ];

    for(let i = 0; i < areaLocation.length; i++){
        if(areaCollision[i]){
            if(testBool){
                aCircle.display(areaLocation[i].xCenter, areaLocation[i].yCenter);
            }
            else if(!testBool){
                aCross.display(areaLocation[i].xCenter, areaLocation[i].yCenter);
            }
            return areaCollision[i];
        }
    }
}

function mousePressed(){
    // console.log(areaCollision)
    for(let j = 0; j < areaCollision.length; j++){
        if(areaCollision[j]){
            console.log("Area", j, "collision: ", areaCollision[j]);
            aCross.display(areaLocation[j].xCenter, areaLocation[j].yCenter);
        }
    }
    if(testBool) testBool = false;
    else if(!testBool) testBool= true;
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
        // rotate(45);
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