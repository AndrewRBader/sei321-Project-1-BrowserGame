document.addEventListener ('DOMContentLoaded', () => {


// grabbing gameboard (cellfield) for easy/tutorial board

const gameBoard = document.querySelector('.cellfield')
let width = 10 
let numberOfCells = width*width;





//used to collect custom gameboard tiles
let cellEls = [];

// # of bombs to input into game board with corresponding aray

const numberOfBombs = 20;
const bombsArray = [];


//used to collect empty cells that are not bombs
const emptyCellArray = [];
const emptyCellElsNumber = numberOfCells - numberOfBombs;

//creating game board tiles of bombs and empty cells

function gameTilesGeneration () {
    
    // bomb tile generation
    // giving bomb array 'bomb' strings

    for (let bomb = 0; bomb<numberOfBombs; bomb++){
        bombsArray.push('bomb')
    }

    //Empty tile generation
    for (let emptyCellEl = 0; emptyCellEl < emptyCellElsNumber; emptyCellEl++){
        emptyCellArray.push('empty');
    }
}

gameTilesGeneration()

//combining the empty and bomb cells to create a "filled array" of bombs and empty squares
const customGameBoardArray = emptyCellArray.concat(bombsArray);

//randomizing the tiles of the game board array
const randomGameBoardArray = customGameBoardArray.sort(() => Math.random() -0.5);
console.log(randomGameBoardArray)

// randomizing the game tiles for random distribution within custom gameboard

//custom board creation:
function customBoardGeneration () {

    for (let cell = 0; cell < numberOfCells; cell++){
        const cellEl = document.createElement('div');
        // giving each cell element a unique ID
        cellEl.setAttribute('id', cell);
        // add the class from random Game Board Array to the divs of the cellfield game board
        cellEl.classList.add(randomGameBoardArray[cell])
        // put these cells into a gameBoard grid
        gameBoard.appendChild(cellEl)
        //collect tiles in an array to manipulate with functions
        cellEls.push(cellEl)
    }
}

customBoardGeneration()



 //finding the cells element with cellID number

 //checking if cell is on right edge or left edge

 let onLeftEdge = false
 let onRightEdge = false


function checkSides() {
    for (let cell = 0 ; cell < numberOfCells ; cell++) {    
        if(cell % width === 0) {
            onLeftEdge = true
            console.log('click is on left')  
        }
        if(cell % width === width - 1) {
            onRightEdge = true
            console.log('click is on right')  
        } 
    }
} 

checkSides()

//adding adjacent bomb number to empty (numbered squares)

let numberAdjacentBombs = 0;

function addingNumberToAdjacentSquare () {
    for (let cell = 0 ; cell < numberOfCells ; cell++) {
        // if empty element is not on left side and cell to the right has a bomb, add one to total number of adjacent bombs
        if (cellEls[cell].classList.contains('empty') && cell > 0 && onLeftEdge === false && 
            cellEls[cell - 1].classList.contains('bomb')){
                numberAdjacentBombs++
        }
    }
}












})



