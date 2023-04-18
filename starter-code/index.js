//DISPLAYING THE HOMEPAGE
let homePage = document.getElementById("homePage"); //HOMEPAGE
let board = document.getElementById("table");       //BOARD
// 
let vsPlayer = document.getElementsByClassName("vs-player")[0];
let vsCpu = document.getElementsByClassName("vs-cpu")[0];



// Defining the Variables
let Board;
let playerX = "<img src='./assets/icon-x.svg' id='x-img'> "; 
let playerO = "<img src='./assets/icon-o.svg' id='o-img'>";
let playerXwin = "<img src='./assets/icon-x-outline.svg' id='xwin-img'> ";
let playerOwin = "<img src='./assets/icon-o-outline.svg' id='owin-img'>";
let playerXX = "<img src='./assets/icon-x-outline1.svg' id='owin1-img'>";
let playerOO = "<img src='./assets/icon-o-outline1.svg' id='owin1-img'>";
var cells = document.getElementsByClassName('cell');
let currPlayer = playerX;
let gameOver = false;
let xWin = false;
let yWin = false;
let i = 0;
let Xscore = document.getElementsByClassName("score-x-num")[0];
let Oscore = document.getElementsByClassName("score-o-num")[0];
let tieScore = document.getElementsByClassName("score-tie-num")[0];
let scoreX = 0;
let scoreO = 0;
let scoreT = 0;

// Xscore.innerText = scoreX;
// Oscore.innerText = scoreO;
// tieScore.innerText = scoreT;


// DEFINING VARIABLES FOR THE WIN-RECTANGLE
let winnerP = document.getElementsByClassName("winnerP")[0];
let takes = document.getElementsByClassName("takes")[0];

let quit = document.getElementsByClassName("quit")[0];
let nextRound = document.getElementsByClassName("next-round")[0];

// DEFINING VARIABLE FOR THE RESTART RECTANGLE
let cancel = document.getElementsByClassName("cancel")[0];
let restart = document.getElementsByClassName("restart")[0];
let redo = document.getElementsByClassName("first-row3")[0];
let redoRectangle = document.getElementsByClassName("rectangle1")[0]
let rectangle = document.getElementsByClassName("rectangle")[0];

//PLAYER'S TURN
let xTurn = "<img src='./assets/xturn.svg' id='xturn'>";
let oTurn = "<img src='./assets/oturn.svg' id='oturn'>";
let turn = document.getElementsByClassName("first-row2")[0];    
turn.innerHTML = xTurn + " TURN";
//END OF PLAYERS TURN

let takeP = document.getElementsByClassName("takee")[0];




playGame()
vsPlayer.addEventListener("click", showBoard)
redo.addEventListener("click",handleReset);
quit.addEventListener("click", quitGame)
cancel.addEventListener('click', cancelRestart)
restart.addEventListener("click",restartGame)
nextRound.addEventListener("click",nextRoundGame)
vsCpu.addEventListener("click", showBoard2)
// player vs player Board display
function showBoard(){
    
    homePage.style.display="none";
    redoRectangle.style.display = "none";
    rectangle.style.display ="none";

    board.style.display="inline-block";
    board.style.position = "absolute";
    // homePage.style.display ="inline-block";
    
    board.style.opacity = "1";
    //setting initial scores to 0
    scoreX = 0;
    scoreO = 0;
    scoreT = 0;
    Xscore.innerText = scoreX;
    Oscore.innerText =  scoreO;
    tieScore.innerText = scoreT;
    startGame()
    
}
// Player vs CPU Board Display
// function showBoardCpu(){
//     homePage.style.display="none"
//     board.style.display="inline-block";
//     renderGame()
// }

function playGame(){
    
    homePage.style.display ="inline-block";
    
}

function startGame(){
     
    for(let i = 0; i < cells.length; i++){
        
        cells[i].innerHTML = "";
        cells[i].classList.remove("winnerO");
        cells[i].classList.remove("winnerX");  
        cells[i].removeEventListener("click", setTile);               
        
    }
    document.getElementsByClassName("score-x")[0].innerHTML = "X(P1)"
    document.getElementsByClassName("score-o")[0].innerHTML = "O(P2)"
    renderGame()
}





//Starting the Game for Player vs Player

function renderGame(){  
    currPlayer = playerX;
    Board = [
        [' ',' ',' '],
        [' ',' ',' '],
        [' ',' ',' ']
    ]
    
    let i = 0;
    for (let r = 0; r < 3; r++ ){
        for (let c = 0; c < 3; c++){
            let tile = document.getElementsByClassName("cell")[i];
            i++;
            if(tile){
                tile.addEventListener("click",setTile) 

            }
                              
        }
    }
    
}


function setTile(){
    // if(gameOver){
    //     return;
    // }
    
    let coords = this.id.split("-")
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if(Board[r][c] != " "){
        return; 
    }
    

    Board[r][c] = currPlayer;
    this.innerText = currPlayer;    

    if (currPlayer == playerO){
        currPlayer = playerX;
        
    }else{
        currPlayer = playerO;   
    } 
    
     
    
        if(this.innerText == playerO){            
            this.innerHTML = playerO;
            turn.innerHTML =  xTurn+ "TURN";
        }else{            
            this.innerHTML = playerX ;
            turn.innerHTML =  oTurn+ "TURN";
            }
    
    
    checkWinner();
    hover();
    
    
}


// CHECKING FOR THE WINNER

function checkWinner(){
    //Horizontally
    for (let r = 0; r < 3; r++){
        if (Board[r][0] == Board[r][1] && Board[r][1] == Board[r][2] && Board[r][0] != " " ){
            for (let i = 0; i < 3; i++){
                let tile = document.getElementById(r.toString() + "-" + i.toString());
                if(Board[r][0] == playerO){
                    tile.classList.add("winnerO")
                    tile.innerHTML = playerOO;
                    winEffectO()
                    
                    
                    
                }else{
                    tile.classList.add("winnerX")                    
                    tile.innerHTML = playerXX;
                    winEffectX()
                    
                          
            }
        }
            gameOver = true;
            if (Board[r][0] == playerO) {
                scoreO++; // Update playerO score
              } else {
                scoreX++; // Update playerX score
              }
            handleWin()
            return;
            
        
        
    }
}
    
    //Vertically**
    for(let c = 0; c < 3; c++){
        if(Board[0][c] == Board[1][c]  && Board[1][c] == Board[2][c] && Board[0][c] != " "){
            for (let i = 0; i < 3; i++){
                let tile = document.getElementById(i.toString() + "-" + c.toString());
                if(Board[0][c] == playerO){
                    tile.classList.add("winnerO")
                    tile.innerHTML = playerOO;
                    winEffectO()
                    
                }else{
                    tile.classList.add("winnerX")                    
                    tile.innerHTML = playerXX;
                    winEffectX()
                 }
            
            }
            gameOver = true;
            if (Board[0][c] == playerO) {
                scoreO++; // Update playerO score
              } else {
                scoreX++; // Update playerX score
              }
            handleWin()
            return;
        }
    }

    //Diagonally**
    if(Board[0][0] == Board[1][1] && Board[1][1] == Board[2][2] && Board[0][0] != " "){
      for(let i = 0; i < 3; i++){
        let tile = document.getElementById(i.toString() + "-" + i.toString());
        if(Board[0][0] == playerO){
                    tile.classList.add("winnerO")
                    tile.innerHTML = playerOO;
                    winEffectO()
                    
                }else{
                    tile.classList.add("winnerX")                    
                    tile.innerHTML = playerXX;
                    winEffectX()
                 }
      }  
      gameOver = true;
      if (Board[0][0] == playerO) {
        scoreO++; // Update playerO score
      } else {
        scoreX++; // Update playerX score
      }
      handleWin()
      return;
    }

    //Anti-Digonally**
    if (Board[0][2] == Board[1][1] && Board[1][1] == Board[2][0] && Board[0][2] != " "){
        // 0-2
        let tile = document.getElementById("0-2");
        if(Board[0][2] == playerO){
            tile.classList.add("winnerO")
            tile.innerHTML = playerOO;
            winEffectO()
                    
            }else{
                tile.classList.add("winnerX")                    
                tile.innerHTML = playerXX;
                winEffectX()
            }

        // 1-1
       tile = document.getElementById("1-1");
        if(Board[1][1] == playerO){
            tile.classList.add("winnerO")
            tile.innerHTML = playerOO;
            winEffectO()
                    
        }else{
            tile.classList.add("winnerX")                    
            tile.innerHTML = playerXX;
            winEffectX()
        }

        // 2-0
        tile = document.getElementById("2-0");
        if(Board[2][0] == playerO){
            tile.classList.add("winnerO")
            tile.innerHTML = playerOO;
            winEffectO()
                    
            }else{
                tile.classList.add("winnerX")                    
                tile.innerHTML = playerXX;
                winEffectX()
                }

        gameOver = true;
        if (Board[0][2] == playerO) {
            scoreO++; // Update playerO score
          } else {
            scoreX++; // Update playerX score
          }
        handleWin()
        
        return;
    }
    checkTie(!gameOver)
    
    
    
}


function hover(){
    // Loop through cells
  for (let i = 0; i < cells.length; i++) {
      cells[i].addEventListener('mouseenter', function() {
          // Change image on mouseenter         
          if(this.innerHTML.length === playerO.length){
              this.innerHTML = playerOwin;             

          } else if (this.innerHTML.length === playerX.length){
              this.innerHTML = playerXwin;                
          } else {                
                  return
          }
      });
      cells[i].addEventListener('mouseleave', function() {
          // Change image back on mouseleave   
          if(this.innerHTML.length == playerOwin.length){
              this.innerHTML = playerO;                
          } else if (this.innerHTML.length == playerXwin.length){
              this.innerHTML = playerX;                
          } else {
              return;
          }
      });
  }
}
function checkTie(){
    // Get all div elements with class "cell"
    // Convert the HTMLCollection to an array
    const cellArray = Array.from(cells);
    // Check if all cell divs are full
    const allCellsFull = cellArray.every(cell => cell.childNodes.length > 0);
    if (allCellsFull) {
  // All divs with class "cell" are full         
        handleTie();      
        tieScore.innerText = scoreT + 1;
        scoreT++
        

        }
}




function winEffectO(){
    takes.innerHTML = playerO + "<span class='takee'>TAKES THE ROUND</span> ";
    takes.style.color ="#F2B137";
    winnerP.textContent = "Player 2 wins";
    yWin = true;
    
    
}

function winEffectX(){
    takes.innerHTML = playerX + "<span class='takee'>TAKES THE ROUND</span> ";
    takes.style.color ="#31C3BD";
    winnerP.textContent = "Player 1 wins";
    xWin = true;     
}

//UPDATING SCORES FUNCTION
function updateScore(){
    Xscore.innerText = scoreX;
    Oscore.innerText =  scoreO;
    tieScore.innerText = scoreT;    
}

//HANDLE RESET FUNCTION
function handleReset(){
    board.style.position = "absolute"
    board.style.opacity = "0.1";
    redoRectangle.style.position = "absolute";
    redoRectangle.style.display = "inline-block";
    redoRectangle.style.top = "0";
    redoRectangle.style.left = "0";
    redoRectangle.style.zIndex = "1";      
}
// HANDLE WIN FUNCTION
function handleWin(){
    board.style.position = "absolute"
    board.style.opacity = "0.1";
   
    //FOR THE RECTANGLE WIN
    rectangle.style.display = "inline-block"; 
    rectangle.style.position = "absolute";
    rectangle.style.top = "0";
    rectangle.style.left = "0";
    rectangle.style.zIndex = "1"; 
    updateScore()
}
//HANDLE TIE FUNCTION
function handleTie(){
    board.style.position = "absolute"
    board.style.opacity = "0.1";
    //FOR THE RECTANGLE WIN
    rectangle.style.display = "inline-block"; 
    rectangle.style.position = "absolute";
    rectangle.style.top = "0";
    rectangle.style.left = "0";
    rectangle.style.zIndex = "1"; 
    takes.innerHTML = "<span class='takee'> ROUND TIED</span> ";
    takes.style.color ="#A8BFC9";
    winnerP.textContent = "";
}

//QUIT GAME FUNCTION
function quitGame(){
   console.log("You Quit")
   board.style.display ="none";
   rectangle.style.display ="none";
   homePage.style.display= "inline-block";    
}

function cancelRestart(){
    board.style.position = "inline-block"
    board.style.opacity = "1";    
    redoRectangle.style.display = "none";        
}

//RESTART GAME
function restartGame(){
    redoRectangle.style.display = "none";
    board.style.opacity = "1";
    scoreX = 0;
    scoreO = 0;
    scoreT = 0;
    updateScore()
    startGame()
}

function nextRoundGame(){
    rectangle.style.display ="none";
    board.style.opacity = "1";   
    board.style.position = "absolute"; 
    startGame()
}


//the minimax algorithm


// PLAYER VS CPU CODE











function showBoard2(){
    
    homePage.style.display="none";
    redoRectangle.style.display = "none";
    rectangle.style.display ="none";

    board.style.display="inline-block";
    
    // homePage.style.display ="inline-block";
    
    board.style.opacity = "1";
    //setting initial scores to 0
    scoreX = 0;
    scoreO = 0;
    scoreT = 0;
    Xscore.innerText = scoreX;
    Oscore.innerText =  scoreO;
    tieScore.innerText = scoreT;
    startGame2()
    
}
// Player vs CPU Board Display
// function showBoardCpu(){
//     homePage.style.display="none"
//     board.style.display="inline-block";
//     renderGame()
// }

function playGame2(){
    
    homePage.style.display ="inline-block";
    
}

function startGame2(){
     
    for(let i = 0; i < cells.length; i++){
        
        cells[i].innerHTML = "";
        cells[i].classList.remove("winnerO");
        cells[i].classList.remove("winnerX");  
        cells[i].removeEventListener("click", setTile2);               
        
    }
    renderGame2()
    document.getElementsByClassName("score-x")[0].innerHTML = "X(YOU)"
    document.getElementsByClassName("score-o")[0].innerHTML = "O(CPU)"
}





//Starting the Game for Player vs Player

function renderGame2(){  
    currPlayer = playerX;
    Board = [
        [' ',' ',' '],
        [' ',' ',' '],
        [' ',' ',' ']
    ]
    
    let i = 0;
    for (let r = 0; r < 3; r++ ){
        for (let c = 0; c < 3; c++){
            let tile = document.getElementsByClassName("cell")[i];
            i++;
            if(tile){
                tile.addEventListener("click",setTile2) 

            }
                              
        }
    }    
}



function setTile2(){
    // if(gameOver){
    //     return;
    // }
    
    let coords = this.id.split("-")
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if(Board[r][c] != " "){
        return; 
    }
    

    Board[r][c] = currPlayer;
    this.innerText = currPlayer;  
        getBestMove() 
    
        
   
     
    
        if(this.innerText == playerO){            
            this.innerHTML = playerO;
            turn.innerHTML =  xTurn+ "TURN";
        }else{            
            this.innerHTML = playerX ;
            turn.innerHTML =  oTurn+ "TURN";
            }
    
    
    checkWinner2();
    hover2();
    
    
}











// CHECKING FOR THE WINNER

function checkWinner2(){
    //Horizontally
    for (let r = 0; r < 3; r++){
        if (Board[r][0] == Board[r][1] && Board[r][1] == Board[r][2] && Board[r][0] != " " ){
            for (let i = 0; i < 3; i++){
                let tile = document.getElementById(r.toString() + "-" + i.toString());
                if(Board[r][0] == playerO){
                    tile.classList.add("winnerO")
                    tile.innerHTML = playerOO;
                    winEffectO2()
                    
                    
                    
                }else{
                    tile.classList.add("winnerX")                    
                    tile.innerHTML = playerXX;
                    winEffectX2()
                    
                          
            }
        }
            gameOver = true;
            if (Board[r][0] == playerO) {
                scoreO++; // Update playerO score
              } else {
                scoreX++; // Update playerX score
              }
            handleWin2()
            return Board[r][0];
            
        
        
    }
}
    
    //Vertically**
    for(let c = 0; c < 3; c++){
        if(Board[0][c] == Board[1][c]  && Board[1][c] == Board[2][c] && Board[0][c] != " "){
            for (let i = 0; i < 3; i++){
                let tile = document.getElementById(i.toString() + "-" + c.toString());
                if(Board[0][c] == playerO){
                    tile.classList.add("winnerO")
                    tile.innerHTML = playerOO;
                    winEffectO2()
                    
                }else{
                    tile.classList.add("winnerX")                    
                    tile.innerHTML = playerXX;
                    winEffectX2()
                 }
            
            }
            gameOver = true;
            if (Board[0][c] == playerO) {
                scoreO++; // Update playerO score
              } else {
                scoreX++; // Update playerX score
              }
            handleWin2()
            return Board[0][c];
        }
    }

    //Diagonally**
    if(Board[0][0] == Board[1][1] && Board[1][1] == Board[2][2] && Board[0][0] != " "){
      for(let i = 0; i < 3; i++){
        let tile = document.getElementById(i.toString() + "-" + i.toString());
        if(Board[0][0] == playerO){
                    tile.classList.add("winnerO")
                    tile.innerHTML = playerOO;
                    winEffectO2()
                    
                }else{
                    tile.classList.add("winnerX")                    
                    tile.innerHTML = playerXX;
                    winEffectX2()
                 }
      }  
      gameOver = true;
      if (Board[0][0] == playerO) {
        scoreO++; // Update playerO score
      } else {
        scoreX++; // Update playerX score
      }
      handleWin2()
      return Board[0][0] ;
    }

    //Anti-Digonally**
    if (Board[0][2] == Board[1][1] && Board[1][1] == Board[2][0] && Board[0][2] != " "){
        // 0-2
        let tile = document.getElementById("0-2");
        if(Board[0][2] == playerO){
            tile.classList.add("winnerO")
            tile.innerHTML = playerOO;
            winEffectO2()
                    
            }else{
                tile.classList.add("winnerX")                    
                tile.innerHTML = playerXX;
                winEffectX2()
            }

        // 1-1
       tile = document.getElementById("1-1");
        if(Board[1][1] == playerO){
            tile.classList.add("winnerO")
            tile.innerHTML = playerOO;
            winEffectO2()
                    
        }else{
            tile.classList.add("winnerX")                    
            tile.innerHTML = playerXX;
            winEffectX2()
        }

        // 2-0
        tile = document.getElementById("2-0");
        if(Board[2][0] == playerO){
            tile.classList.add("winnerO")
            tile.innerHTML = playerOO;
            winEffectO2()
                    
            }else{
                tile.classList.add("winnerX")                    
                tile.innerHTML = playerXX;
                winEffectX2()
                }

        gameOver = true;
        if (Board[0][2] == playerO) {
            scoreO++; // Update playerO score
          } else {
            scoreX++; // Update playerX score
          }
        handleWin2()
        
        return Board[0][2] ;
    }
    checkTie2(!gameOver)
    
    
    
}



function hover2(){
    // Loop through cells
  for (let i = 0; i < cells.length; i++) {
      cells[i].addEventListener('mouseenter', function() {
          // Change image on mouseenter         
          if(this.innerHTML.length === playerO.length){
              this.innerHTML = playerOwin;             

          } else if (this.innerHTML.length === playerX.length){
              this.innerHTML = playerXwin;                
          } else {                
                  return
          }
      });
      cells[i].addEventListener('mouseleave', function() {
          // Change image back on mouseleave   
          if(this.innerHTML.length == playerOwin.length){
              this.innerHTML = playerO;                
          } else if (this.innerHTML.length == playerXwin.length){
              this.innerHTML = playerX;                
          } else {
              return;
          }
      });
  }
}
function checkTie2(){
    // Get all div elements with class "cell"
    // Convert the HTMLCollection to an array
    const cellArray = Array.from(cells);
    // Check if all cell divs are full
    const allCellsFull = cellArray.every(cell => cell.childNodes.length > 0);
    if (allCellsFull) {
  // All divs with class "cell" are full         
        handleTie2();      
        tieScore.innerText = scoreT + 1;
        scoreT++       

        }
}

function winEffectO2(){
    takes.innerHTML = playerO + "<span class='takee'>TAKES THE ROUND</span> ";
    takes.style.color ="#F2B137";
    winnerP.textContent = "OH NO, YOU LOST...";
    yWin = true;
    
    
}
function winEffectX2(){
    takes.innerHTML = playerX + "<span class='takee'>TAKES THE ROUND</span> ";
    takes.style.color ="#31C3BD";
    winnerP.textContent = "YOU WON!";
    xWin = true;     
}

//UPDATING SCORES FUNCTION
function updateScore2(){
    Xscore.innerText = scoreX;
    Oscore.innerText =  scoreO;
    tieScore.innerText = scoreT;
    
}
//HANDLE RESET FUNCTION
function handleReset2(){
    board.style.position = "absolute";
    board.style.opacity = "0.1";
    redoRectangle.style.position = "absolute";
    redoRectangle.style.display = "inline-block";
    redoRectangle.style.top = "0";
    redoRectangle.style.left = "0";
    redoRectangle.style.zIndex = "1";      
}
// HANDLE WIN FUNCTION
function handleWin2(){
    board.style.position = "absolute"
    board.style.opacity = "0.1";
   
    //FOR THE RECTANGLE WIN
    rectangle.style.display = "inline-block"; 
    rectangle.style.position = "absolute";
    rectangle.style.top = "0";
    rectangle.style.left = "0";
    rectangle.style.zIndex = "1"; 
    updateScore2()
}
//HANDLE TIE FUNCTION
function handleTie2(){
    board.style.position = "absolute";
    board.style.opacity = "0.1";
    //FOR THE RECTANGLE WIN
    rectangle.style.display = "inline-block"; 
    rectangle.style.position = "absolute";
    rectangle.style.top = "0";
    rectangle.style.left = "0";
    rectangle.style.zIndex = "1"; 
    takes.innerHTML = "<span class='takee'> ROUND TIED</span> ";
    takes.style.color ="#A8BFC9";
    winnerP.textContent = "";
}
//QUIT GAME FUNCTION
function quitGame2(){
   console.log("You Quit")
   board.style.display ="none";
   rectangle.style.display ="none";
   homePage.style.display= "inline-block";    
}
function cancelRestart2(){
    board.style.position = "inline-block"
    board.style.opacity = "1";    
    redoRectangle.style.display = "none";        
}

//RESTART GAME
function restartGame2(){
    redoRectangle.style.display = "none";
    board.style.opacity = "1";
    scoreX = 0;
    scoreO = 0;
    scoreT = 0;
    updateScore2()
    startGame2()
}

function nextRoundGame2(){
    rectangle.style.display ="none";
    board.style.opacity = "1";    
    startGame2()
}
function getBestMove() {
    let bestScore = -Infinity;
    let move = { row: -1, col: -1 }; // Initialize move object
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            if (Board[r][c] === ' ') {
                Board[r][c] = playerO;
                let score = minimax(Board, 0, false);
                Board[r][c] = ' ';
                if (score > bestScore) {
                    bestScore = score;
                    move.row = r; // Update row
                    move.col = c; // Update col
                }
            }
        }
    }
    if (move.row !== -1 && move.col !== -1) { // Check if a valid move was found
        Board[move.row][move.col] = playerO;
        let tile = document.getElementById(move.row + '-' + move.col);
        tile.innerHTML = playerO;
        
        
    }currPlayer = playerX
    
}


function minimax(board, depth, isMaximizingPlayer) {
    let result = checkTie2(board);
    if (result !== null) {
        if (result === playerO) {
            return 10 - depth;
        } else if (result === playerX) {
            return depth - 10;
        } else {
            return 0;
        }
    }

    if (isMaximizingPlayer) {
        let maxScore = -Infinity;
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                if (board[r][c] === ' ') {
                    board[r][c] = playerO;
                    let score = minimax(board, depth + 1, false);
                    board[r][c] = ' ';
                    maxScore = Math.max(maxScore, score);
                }
            }
        }
        return maxScore;
    } else {
        let minScore = Infinity;
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                if (board[r][c] === ' ') {
                    board[r][c] = playerX;
                    let score = minimax(board, depth + 1, true);
                    board[r][c] = ' ';
                    minScore = Math.min(minScore, score);
                }
            }
        }
        return minScore;        
    }
    
}
