const gameInfo = document.querySelector(".game-info");
const boxes = document.querySelectorAll(".box");
const newGameBtn = document.querySelector(".btn");


let currentPlayer;
let gameGrid;

const winningPosition=[
   [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
];

//fun to initialise the game

function initGame() {
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];

    //UI change - box enmpty
    boxes.forEach((box, index) => {
        box.innerText="";
        boxes[index].style.pointerEvents = "all";

        // initialise box with css properties again
        box.classList=`box box${index+1}`;

    });

    newGameBtn.classList.remove("active");
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn() {
    if(currentPlayer === "X"){
        currentPlayer="O";
    }else{
        currentPlayer="X";
    }

    //UI updete
    gameInfo.innerText=`Current Player- ${currentPlayer}`;
}

function checkGameOver() {
    
    let answer="";

    winningPosition.forEach((position) => {
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "" )
            && ( gameGrid[position[0]] === gameGrid[position[1]] ) && ( gameGrid[position[1]] === gameGrid[position[2]] ) ){

            //check if winner is X

            if(gameGrid[position[0]]==='X'){
                answer='X';
            }else{
                answer='O';
            }

            //disable pointer event
            boxes.forEach((box) => {
                box.style.pointerEvents="none";
            })
            //now we know X/O winner

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    // new game
    // got winner
    if(answer !== ""){
        //we have winner
        gameInfo.innerText=`Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    // let there is no winner

    let fillCount=0;

    gameGrid.forEach((box) => {
        if(box !== ""){
            fillCount++;
        }
    });

    if(fillCount===9){
        gameInfo.innerText="Game Tied !=";
        newGameBtn.classList.add("active");
    }
}



function handleClick(index) {
    if(gameGrid[index] === ""){
        boxes[index].innerHTML = currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents = "none";
        newGameBtn.classList.add("active");

        // swap trun 
        swapTurn();
        // someone win or not
        checkGameOver();
    }
}

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    });
});

newGameBtn.addEventListener("click", initGame);