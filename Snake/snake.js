$("document").ready(function(){
    let upFlag = false;
    let leftFlag = false;
    let rightFlag = false;
    let downFlag = false;

    let prevDir = 0;
    let speed = 100;
    let count = 0;

    let prevX = 0;
    let prevY = 0
    let prevX1 = 0;
    let prevY1 = 0;

    let loopStart = 5;
    let score = 0;

    let currWidth = Math.round($("#innerframe").outerWidth());
    let newWidth = currWidth - (currWidth % 20);
    $("#innerframe").css("width", newWidth + "px");
    console.log("Width changed " + newWidth);

    let currHeight = Math.round($("#innerframe").outerHeight());
    let newHeight = currHeight - (currHeight % 20);
    $("#innerframe").css("height", newHeight + "px");

    let parentLeft = Math.round($("#innerframe").offset()["left"]);
    let parentRight = Math.round($("#innerframe").width());
    let parentTop = Math.round($("#innerframe").offset()["top"]);
    let parentBottom = Math.round($("#innerframe").height());

    console.log("Window : " + $(window).height());
    console.log("Inner Frame Height : " + $("#innerframe").height());
    console.log("Inner Frame Start : " + parentTop);
    console.log("Inner Frame End : " + parentBottom);

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        let r = Math.floor(Math.random() * (max - min + 1)) + min;
        r -= r % 20;
        return r;
    }
    
    // Generate a snake at start
    let generateSnake = () => {
        $("#initialBlock").css("left", getRandomInt(parentLeft, parentRight));
        $("#initialBlock").css("bottom", getRandomInt(parentTop, parentBottom));
    }

    let resetFlag = () => {
        upFlag = rightFlag = leftFlag = downFlag = false;
    }


    let setFlag = (x) => {
        switch(x){
            case 0:
                leftFlag = true;
                upFlag = rightFlag = downFlag = false;
                break;

            case 1:
                upFlag = true;
                leftFlag = rightFlag = downFlag = false;
                break;

            case 2:
                rightFlag = true;
                upFlag = leftFlag = downFlag = false;
                break;

            case 3:
                downFlag = true;
                upFlag = leftFlag = rightFlag = false;
                break;
        }
    }


    // Event listener to check which key was pressed
    let checkKey = (event) => {

        setFlag(event.keyCode % 37);

        if (event.keyCode == 32) {
            if (count % 2 == 0){
                clearInterval(eve);
                resetFlag();
            }   

            else {
                eve = setInterval(down, speed);
            }
            count++;
        }
    }


    // Generate a random food
    let generateFood = () =>{
        let x = getRandomInt(parentLeft, parentRight-20);
        let y = getRandomInt(parentTop, parentBottom-20);

        $("#food").css("left", x);
        $("#food").css("bottom", y);
    }

    
    // Motion in upward direction
    let up = () => {

        if(leftFlag){
            clearInterval(eve);
            eve = setInterval(left, speed);
        }

        else if(rightFlag){
            clearInterval(eve);
            eve = setInterval(right, speed);
        }

        else if(downFlag){
            clearInterval(eve);
            eve = setInterval(down, speed);
        }

        prevX = parseInt($("#initialBlock").css("left"));
        prevY = parseInt($("#initialBlock").css("bottom"));
        
        
        let x = parseInt($("#initialBlock").css("bottom")) + 20;
        console.log("X : " + x);
        if(x > parentBottom - 20){
            alert("Game Over");
            clearInterval(eve);
        }

        checkFoodStat();
        checkCollision();

        let elements = document.getElementsByTagName("div");
        
        for(let i = loopStart; i < elements.length; i++){
            prevX1 = parseInt(elements[i].style.left);
            prevY1 = parseInt(elements[i].style.bottom);
            elements[i].style.left = prevX + "px";
            elements[i].style.bottom = prevY + "px";
            prevX = prevX1;
            prevY = prevY1;
        }

        $("#initialBlock").css("bottom", x);
        showScore();
    }


    // Moton in left direction
    let left = () => {
        if(upFlag){
            clearInterval(eve);
            eve = setInterval(up, speed);
        }

        else if(rightFlag){
            clearInterval(eve);
            eve = setInterval(right, speed);
        }

        else if(downFlag){
            clearInterval(eve);
            eve = setInterval(down, speed);
        }

        let snake = document.getElementById("initialBlock");
        prevX = parseInt(snake.style.left);
        prevY = parseInt(snake.style.bottom);
        let x = parseInt($("#initialBlock").css("left")) - 20;

        if (x < 0){
            alert("Game over");
            clearInterval(eve);
        }

        checkFoodStat();
        checkCollision();

        let elements = document.getElementsByTagName("div");
        
        for(let i = loopStart; i < elements.length; i++){
            prevX1 = parseInt(elements[i].style.left);
            prevY1 = parseInt(elements[i].style.bottom);
            elements[i].style.left = prevX + "px";
            elements[i].style.bottom = prevY + "px";
            prevX = prevX1;
            prevY = prevY1;
        }

        $("#initialBlock").css("left", x);
        showScore();
    }


    // Motion in downward direction
    let down = () => {
        if(upFlag){
            clearInterval(eve);
            eve = setInterval(up, speed);
        }

        else if(rightFlag){
            clearInterval(eve);
            eve = setInterval(right, speed);
        }

        else if(leftFlag){
            clearInterval(eve);
            eve = setInterval(left, speed);
        }

        let snake = document.getElementById("initialBlock");
        prevX = parseInt(snake.style.left);
        prevY = parseInt(snake.style.bottom);
        let x = parseInt($("#initialBlock").css("bottom")) - 20;
        if(x < 0) {
            alert("Game over");
            clearInterval(eve);
        }
        
        checkFoodStat();
        checkCollision();

        let elements = document.getElementsByTagName("div");

        for(let i = loopStart; i < elements.length; i++){
            prevX1 = parseInt(elements[i].style.left);
            prevY1 = parseInt(elements[i].style.bottom);
            elements[i].style.left = prevX + "px";
            elements[i].style.bottom = prevY + "px";
            prevX = prevX1;
            prevY = prevY1;
        }

        $("#initialBlock").css("bottom", x)
        showScore();
    }


    // Motion in right direction
    let right = () => {
        if(upFlag){
            clearInterval(eve);
            eve = setInterval(up, speed);
        }

        else if(leftFlag){
            clearInterval(eve);
            eve = setInterval(left, speed);
        }

        else if(downFlag){
            clearInterval(eve);
            eve = setInterval(down, speed);
        }

        let snake = document.getElementById("initialBlock");
        prevX = parseInt(snake.style.left);
        prevY = parseInt(snake.style.bottom);
        

        let x = parseInt($("#initialBlock").css("left")) + 20;
        console.log(x);
        if(x > parentRight - 20) {
            alert("Game over");
            console.log("Done : " + $("#initialBlock").offset().left);
            clearInterval(eve);
        }

        checkFoodStat();
        checkCollision();

        let elements = document.getElementsByTagName("div");
        
        for(let i = loopStart; i < elements.length; i++){
            prevX1 = parseInt(elements[i].style.left);
            prevY1 = parseInt(elements[i].style.bottom);
            elements[i].style.left = prevX + "px";
            elements[i].style.bottom = prevY + "px";
            prevX = prevX1;
            prevY = prevY1;
        }

        $("#initialBlock").css("left", x);
        showScore();
    }


    let checkFoodStat = (x) => {
        let snake = document.getElementById("initialBlock");
        let node = document.createElement("div");
        node.setAttribute("id", "follower")
        if (snake.style.left == food.style.left && snake.style.bottom == food.style.bottom){
            console.log("Food Captured");
            generateFood();
            document.getElementById("innerframe").append(node);
            score += 10;
        }
    }


    let checkCollision = () => {
        let snake = document.getElementById("initialBlock");
        let elements = document.getElementsByTagName("div");

        for(let i = 4; i < elements.length; i++){
            if ((parseInt(snake.style.left) == parseInt(elements[i].style.left) && (parseInt(snake.style.bottom) == parseInt(elements[i].style.bottom)))) {
                alert("Game Over");
                clearInterval(eve);
            }
        }
    }


    let showScore = () => {
        document.getElementById("score").innerHTML = "Score : " + score;
        if (score % 100 == 0 && score != 0){
            speed -= 20;
            score += 10;
        }   
        if (speed < 10) speed = 10;

        console.log(score);
    }

    document.addEventListener('keydown', checkKey);

    generateSnake();
    generateFood();

    let eve = window.setInterval(down, speed);
})