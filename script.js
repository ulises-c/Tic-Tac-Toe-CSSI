let a_loc, a_col;

function setup(){
    createCanvas(400, 400);
    areaLocations();
    test_circle = new Circle;
    test_cross = new Cross;
    xImage = loadImage("https://i.imgur.com/a_loc[1]GcPMe.png");
}

function areaLocations(){
    a_loc = [
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
    for(let i = 0; i < a_loc.length; i++){
        text(i, a_loc[i].xCenter, a_loc[i].yCenter)
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
    a_col = [
    collidePointRect(mouseX, mouseY, 0, 0, a_loc[0].x, a_loc[0].y),
    collidePointRect(mouseX, mouseY, a_loc[0].x, 0, a_loc[1].x, a_loc[1].y),
    collidePointRect(mouseX, mouseY, a_loc[1].x, 0, a_loc[2].x, a_loc[2].y),
    collidePointRect(mouseX, mouseY, 0, a_loc[0].y, a_loc[3].x, a_loc[3].y),
    collidePointRect(mouseX, mouseY, a_loc[3].x, a_loc[1].y, a_loc[4].x, a_loc[4].y),
    collidePointRect(mouseX, mouseY, a_loc[4].x, a_loc[2].y, a_loc[5].x, a_loc[5].y),
    collidePointRect(mouseX, mouseY, 0, a_loc[3].y, a_loc[6].x, a_loc[6].y),
    collidePointRect(mouseX, mouseY, a_loc[6].x, a_loc[4].y, a_loc[7].x, a_loc[7].y),
    collidePointRect(mouseX, mouseY, a_loc[7].x, a_loc[5].y, a_loc[8].x, a_loc[8].y)
    ];

    for(let i = 0; i < a_loc.length; i++){
        if(a_col[i]){
            test_circle.display(a_loc[i].xCenter, a_loc[i].yCenter);
            return a_col[i];
        }
    }
}

function mousePressed(){
    // console.log(a_col)
    for(let j = 0; j < a_col.length; j++){
        if(a_col[j]){
            console.log("Area", j, "collision: ", a_col[j]);
            test_cross.display();
        }
    }
}

class Cross {
    constructor(){
        this.x = a_loc[0].xCenter;
        this.y = a_loc[0].yCenter;
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