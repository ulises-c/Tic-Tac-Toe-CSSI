let areaLocation, areaCollision;
let boxWidth, boxHeight;
let testVar = false;

function setup(){
    createCanvas(400, 400);
    areaLocations();
    testCircle = new Circle;
    testCross = new Cross;
    boxWidth = width * 1/3;
    boxHeight = height * 1/3;
    // crossImage = loadImage("https://i.imgur.com/a2GcPMe.png");
}

function draw(){
    background(200);
    ticTacToeBoard();
    // testCircle.display();
    // testCross.display();
    // image(crossImage, 100, 100);
    writeNumbers();
    checkCollision();
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
            if(testVar){
                testCircle.display(areaLocation[i].xCenter, areaLocation[i].yCenter);
            }
            else if(!testVar){
                testCross.display(areaLocation[i].xCenter, areaLocation[i].yCenter);
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
            testCross.display(areaLocation[j].xCenter, areaLocation[j].yCenter);
        }
    }
    if(testVar) testVar = false;
    else if(!testVar) testVar= true;
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