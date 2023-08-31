const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");


let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//let's create a function to initialize the game
function initGame(){
    currentPlayer = "X";
    gameGrid=["","","","","","","","",""];
    //UI pr bhi empty karna padega
    boxes.forEach((box , index)=>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";

        //one more thing is missing , green color ko bhi remove karna h
        // for that initialize CSS property again
        box.classList = ` box box${index+1}`;

    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = ` Current Player - ${currentPlayer}`;


}

initGame();

function swapTurn(){
     if(currentPlayer ==="X")
     currentPlayer = "O";
    else
    currentPlayer = "X";

    //UI Update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
        let anwser = "";

        winningPositions.forEach((position)=>{

            //all 3 boxes should not be empty and exactly have same value in it
            if((gameGrid[position[0]] !=="" || gameGrid[position[1]]!=="" || gameGrid[position[2]]!=="") && (gameGrid[position[0]]===gameGrid[position[1]]) && (gameGrid[position[1]]===gameGrid[position[2]])){

                //check if winner is X 
                if(gameGrid[position[0]]==="X")
                anwser = "X";
                else
                anwser = "O";

                //winner mil gya hai , to ab pointer events band kara do
                boxes.forEach((box)=>{
                    box.style.pointerEvents = "none";
                })

                //now we know the winner so show it on UI 
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
        });

        //it means have a winer
        if(anwser !==""){
            gameInfo.innerText = `Winner Player - ${anwser}`;
            newGameBtn.classList.add("active");
            return;
        }

        //  No winner found ,also check whether there is tie or not 
        let fillCount=0;
        gameGrid.forEach((box)=>{
            if(box !=="")
            fillCount++;
        });

        //board is filled , game is TIE 
        if(fillCount ===9)
        {
            gameInfo.innerText = "Game Tied !";
            newGameBtn.classList.add("active");
        }
      
}

 function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";

        //swap karo turn ko 
        swapTurn();

        //check koi jeet toh nhi gya 
        checkGameOver();

    }
 }

boxes.forEach((box , index )=>{
    box.addEventListener("click",()=>
    {
        handleClick(index);
    })
})

newGameBtn.addEventListener("click",initGame);