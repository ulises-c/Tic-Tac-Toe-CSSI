function setup(){
    createCanvas(400, 400);
}
  
function draw(){
    background(200);
    ticTacToeBoard();
}

function ticTacToeBoard(){
    fill("black");
    verticalLine1 = line(width * 1/3, 0, width * 1/3, height);
    verticalLine2 = line(width * 2/3, 0, width * 2/3, height);
    horizontalLine1 = line(0, height * 1/3, width, height * 1/3);
    horizontalLine2 = line(0, height * 2/3, width, height * 2/3);
}

function checkCollision() {
    area1Collision = something;
}

function mousePressed(){
    if (area1Collision){
        if (alreadyFilled){
            return
        }
        else if(Player1Turn){

        }
        else if (Player2Turn){
            
        }
    }
}

class Cross {
    constructor(){
        this.x = something;
        this.y = something;
        color = "red";
    }
    display(){
        
    }
}

class Circle {
    constructor(){
        this.x = something;
        this.y = something;
        this.radius = something;
        color = "blue";
    }
    display(){
        ellipse(this.x, this.y, this.radius);
    }
}