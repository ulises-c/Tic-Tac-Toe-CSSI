let a1, a2, a3, a4, a5, a6, a7, a8, a9, area_locations_list, area_collide_list;
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
    xImage = loadImage("https://i.imgur.com/a2GcPMe.png");
}

function areaLocations(){
    area_locations_list = [
        a1 = {
            // top left
            x: width * 1/3,
            y: height * 1/3,
            xCenter: width * 1/6,
            yCenter: height * 1/6
        },
        a2 = {
            // top middle
            x: width * 2/3,
            y: height * 1/3,
            xCenter: width * 3/6,
            yCenter: height * 1/6
        },
        a3 = {
            // top right
            x: width,
            y: height * 1/3,
            xCenter: width * 5/6,
            yCenter: height * 1/6
        },
        a4 = {
            // middle left
            x: width * 1/3,
            y: height * 2/3,
            xCenter: width * 1/6,
            yCenter: height * 3/6,
        },
        a5 = {
            // center
            x: width * 2/3,
            y: height * 2/3,
            xCenter: width * 3/6,
            yCenter: height * 3/6
        },
        a6 = {
            // middle right
            x: width,
            y: height * 2/3,
            xCenter: width * 5/6,
            yCenter: height * 3/6
        },
        a7 = {
            // bottom left
            x: width * 1/3,
            y: height,
            xCenter: width * 1/6,
            yCenter: height * 5/6
        },
        a8 = {
            // bottom middle
            x: width * 2/3,
            y: height,
            xCenter: width * 3/6,
            yCenter: height * 5/6
        },
        a9 = {
            // bottom right
            x: width,
            y: height,
            xCenter: width * 5/6,
            yCenter: height * 5/6
        }
    ];
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
    for(let i = 0; i < area_locations_list.length; i++){
        text(i+1, area_locations_list[i].xCenter, area_locations_list[i].yCenter)
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

function checkCollision() {
    area_collide_list = [
    collidePointRect(mouseX, mouseY, 0, 0, a1.x, a1.y),
    collidePointRect(mouseX, mouseY, a1.x, 0, a2.x, a2.y),
    collidePointRect(mouseX, mouseY, a2.x, 0, a3.x, a3.y),
    collidePointRect(mouseX, mouseY, 0, a1.y, a4.x, a4.y),
    collidePointRect(mouseX, mouseY, a4.x, a2.y, a5.x, a5.y),
    collidePointRect(mouseX, mouseY, a5.x, a3.y, a6.x, a6.y),
    collidePointRect(mouseX, mouseY, 0, a4.y, a7.x, a7.y),
    collidePointRect(mouseX, mouseY, a7.x, a5.y, a8.x, a8.y),
    collidePointRect(mouseX, mouseY, a8.x, a6.y, a9.x, a9.y)
    ];

    for(let i = 0; i < area_locations_list.length; i++){
        if(area_collide_list[i]){
            test_circle.display(area_locations_list[i].xCenter, area_locations_list[i].yCenter);
            return area_collide_list[i];
        }
    }
}

function mousePressed(){
    // console.log(area_collide_list)
    for(let j = 0; j < area_collide_list.length; j++){
        if(area_collide_list[j]){
            console.log("Area", j+1, "collision: ", area_collide_list[j]);
            test_cross.display();
        }
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