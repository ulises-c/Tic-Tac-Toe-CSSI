let area1, area2, area3, area4, area5, area6, area7, area8, area9;
let area1Collision = false;

function setup(){
    createCanvas(400, 400);
    areaLocations();
    test_circle = new Circle;
    test_cross = new Cross;
}

function areaLocations(){
    area1 = {
        // top left
        x: width * 1/3,
        y: height * 1/3,
        xCenter: width * 1/6,
        yCenter: height * 1/6
    };
    area2 = {
        // top middle
        x: width * 2/3,
        y: height * 1/3
    };
    area3 = {
        // top right
        x: width,
        y: height * 1/3
    };
    area4 = {
        // middle left
        x: width * 1/3,
        y: height * 2/3
    };
    area5 = {
        // center
        x: width * 2/3,
        y: height * 2/3
    }
    area6 = {
        // middle right
        x: width,
        y: height * 2/3
    };
    area7 = {
        // bottom left
        x: width * 1/3,
        y: height
    };
    area8 = {
        // bottom middle
        x: width * 2/3,
        y: height
    };
    area9 = {
        // bottom right
        x: width,
        y: height
    };
}
  
function draw(){
    background(200);
    ticTacToeBoard();
    // test_circle.display();
    // test_cross.display();
    checkCollision();
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
    area1Collision = collidePointRect(mouseX, mouseY, 0, 0, area1.x, area1.y);
    // console.log("Mouse pressed: ", mousePressed);
    if(area1Collision){
        test_circle.display();
        return area1Collision;
    };
}

function mousePressed(){
    if (area1Collision){
        console.log("Area 1 collision: ", area1Collision);
        test_cross.display();
        console.log(test_cross);
        // if (alreadyFilled){
        //     return
        // }
        // else if(Player1Turn){
        //     console.log('test')
        // }
        // else if (Player2Turn){
        //     console.log('test')
        // }
    }
}

class Cross {
    constructor(){
        this.x = area1.xCenter;
        this.y = area1.yCenter;
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
    }
}

class Circle {
    constructor(){
        this.x = 200;
        this.y = 50;
        this.radius = 50;
        this.color = "blue";
    }
    display(){
        stroke(this.color);
        noFill();
        ellipse(this.x, this.y, this.radius);
    }
}