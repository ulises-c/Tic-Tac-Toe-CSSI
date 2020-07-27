let a1, a2, a3, a4, a5, a6, a7, a8, a9;
let a1Collide = false;
let a2Collide = false;
let a3Collide = false;
let a4Collide = false;
let a5Collide = false;
let a6Collide = false;
let a7Collide = false;
let a8Collide = false;
let a9Collide = false;

function setup(){
    createCanvas(400, 400);
    areaLocations();
    test_circle = new Circle;
    test_cross = new Cross;
    xImage = loadImage("https://i.imgur.com/a2GcPMe.png")
}

function areaLocations(){
    a1 = {
        // top left
        x: width * 1/3,
        y: height * 1/3,
        xCenter: width * 1/6,
        yCenter: height * 1/6
    };
    a2 = {
        // top middle
        x: width * 2/3,
        y: height * 1/3,
        xCenter: width * 3/6,
        yCenter: height * 1/6
    };
    a3 = {
        // top right
        x: width,
        y: height * 1/3,
        xCenter: width * 5/6,
        yCenter: height * 1/6
    };
    a4 = {
        // middle left
        x: width * 1/3,
        y: height * 2/3,
        xCenter: width * 1/6,
        yCenter: height * 3/6,
    };
    a5 = {
        // center
        x: width * 2/3,
        y: height * 2/3,
        xCenter: width * 3/6,
        yCenter: height * 3/6
    }
    a6 = {
        // middle right
        x: width,
        y: height * 2/3,
        xCenter: width * 5/6,
        yCenter: height * 3/6
    };
    a7 = {
        // bottom left
        x: width * 1/3,
        y: height,
        xCenter: width * 1/6,
        yCenter: height * 5/6
    };
    a8 = {
        // bottom middle
        x: width * 2/3,
        y: height,
        xCenter: width * 3/6,
        yCenter: height * 5/6
    };
    a9 = {
        // bottom right
        x: width,
        y: height,
        xCenter: width * 5/6,
        yCenter: height * 5/6
    };
}
  
function draw(){
    background(200);
    ticTacToeBoard();
    // test_circle.display();
    // test_cross.display();
    // image(xImage, 100, 100);
    drawLocations();
    checkCollision();
}

function drawLocations(){
    text("1", a1.xCenter, a1.yCenter);
    text("2", a2.xCenter, a2.yCenter);
    text("3", a3.xCenter, a3.yCenter);
    text("4", a4.xCenter, a4.yCenter);
    text("5", a5.xCenter, a5.yCenter);
    text("6", a6.xCenter, a6.yCenter);
    text("7", a7.xCenter, a7.yCenter);
    text("8", a8.xCenter, a8.yCenter);
    text("9", a9.xCenter, a9.yCenter);
}

function ticTacToeBoard(){
    fill("black");
    stroke(5);
    verticalLine1 = line(width * 1/3, 0, width * 1/3, height);
    verticalLine2 = line(width * 2/3, 0, width * 2/3, height);
    horizontalLine1 = line(0, height * 1/3, width, height * 1/3);
    horizontalLine2 = line(0, height * 2/3, width, height * 2/3);
}

function checkCollision() {
    a1Collide = collidePointRect(mouseX, mouseY, 0, 0, a1.x, a1.y);
    a2Collide = collidePointRect(mouseX, mouseY, a1.x, 0, a2.x, a2.y);
    a3Collide = collidePointRect(mouseX, mouseY, a2.x, 0, a3.x, a3.y);

    a4Collide = collidePointRect(mouseX, mouseY, 0, a1.y, a4.x, a4.y);
    a5Collide = collidePointRect(mouseX, mouseY, a4.x, a2.y, a5.x, a5.y);
    a6Collide = collidePointRect(mouseX, mouseY, a5.x, a3.y, a6.x, a6.y);

    a7Collide = collidePointRect(mouseX, mouseY, 0, a4.y, a7.x, a7.y);
    a8Collide = collidePointRect(mouseX, mouseY, a7.x, a5.y, a8.x, a8.y);
    a9Collide = collidePointRect(mouseX, mouseY, a8.x, a6.y, a9.x, a9.y);

    if(a1Collide){
        test_circle.display(a1.xCenter, a1.yCenter);
        return a1Collide;
    }
    if(a2Collide){
        test_circle.display(a2.xCenter, a2.yCenter);
        return a2Collide;
    }
    if(a2Collide){
        test_circle.display(a3.xCenter, a3.yCenter);
        return a3Collide;
    }
    if(a4Collide){
        test_circle.display(a4.xCenter, a4.yCenter);
        return a4Collide;
    }
    if(a5Collide){
        test_circle.display(a5.xCenter, a5.yCenter);
        return a5Collide;
    }
    if(a6Collide){
        test_circle.display(a6.xCenter, a6.yCenter);
        return a6Collide;
    }
    if(a7Collide){
        test_circle.display(a7.xCenter, a7.yCenter);
        return a7Collide;
    }
    if(a8Collide){
        test_circle.display(a8.xCenter, a8.yCenter);
        return a8Collide;
    }
    if(a9Collide){
        test_circle.display(a9.xCenter, a9.yCenter);
        return a9Collide;
    }
}

function mousePressed(){
    if (a1Collide){
        console.log("Area 1 collision: ", a1Collide);
        test_cross.display();
    }
    if (a2Collide){
        console.log("Area 2 collision: ", a3Collide);
    }
    if (a3Collide){
        console.log("Area 3 collision: ", a3Collide);
    }
    if(a4Collide){
        console.log("Area 4 collision: ", a4Collide);
    }
    if(a5Collide){
        console.log("Area 5 collision: ", a5Collide);
    }
    if(a6Collide){
        console.log("Area 6 collision: ", a6Collide);
    }
    if(a7Collide){
        console.log("Area 7 collision: ", a7Collide);
    }
    if(a8Collide){
        console.log("Area 8 collision: ", a8Collide);
    }
    if(a9Collide){
        console.log("Area 9 collision: ", a9Collide);
    }
}

class Cross {
    constructor(){
        this.x = a1.xCenter;
        this.y = a1.yCenter;
        this.w = 50;
        this.h = 10;
        this.color = "red";
    }
    display(){
        noStroke();
        fill(this.color);
        rectMode(CENTER);
        angleMode(DEGREES);
        // rotate(45);
        rect(this.x, this.y, this.w, this.h);
        rect(this.x, this.y, this.h, this.w);
        // image(xImage, this.x, this.y);
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