//check that renaming account didnt screw up repo

// js link check
// console.log('hello front end')

//Global Variables
// collecting all cells in a variable
const cells = document.querySelectorAll('.cell')
// console.log($cells)
// console.log($cells.length)

// collecting hidden cells (starting) in variable
let $hiddenCells = $('.hidden');
// console.log($hiddenCells)
// console.log($hiddenCells.length)


// collecting revealed cells (with black text) in variable
let $revealedCells = $('.revealed');
// console.log($revealedCells)
// console.log($revealedCells.length)

// collecting bomb cells in a variable
let $bombCells = $('.bomb');
// console.log($bombCells)
// console.log($bombCells.length)

//collecting diffused cells in a variable
let $diffusedCells = $('.diffused');
// console.log($diffusedCells);
// console.log($diffusedCells.length);

// collecting buttons into variable (vanilla JS to avoid click function)
let resetButton = document.querySelector('#resetButton')
// console.log(resetButton)


$hiddenCells.removeClass('revealed bomb diffused').fadeIn()

//mines are live boolean for active game
let minesAreLive = false;

//flag button
let $flagOnButton = $('#flagOnButton');
// console.log(flagOnButton)
let $flagOffButton = $('#flagOffButton');
// console.log(flagOffButton)
$flagOnButton.hide()
$flagOffButton.hide()


//# of bombs

let numberBombs = $bombCells.length
console.log(numberBombs)

//diffused bomb array

let diffusedBombArray = [];

//reset button: press to activate Flag button empties diffusedBombArray

resetButton.addEventListener('click', () => {
    $hiddenCells.removeClass('revealed bomb diffused').fadeIn()
    minesAreLive = true;
    $flagOnButton.fadeIn()
    console.log('Mines Are Live')

    // resets diffused bombs that are collected before reset
    for (i = 0; i<diffusedBombArray.length;i++){
        let cellID = diffusedBombArray[i]
        // console.log(cellID)
        for (j = 0; j < cells.length; j++){
            let cellsArrayElementID = cells[j].id;
            // console.log(cellsArrayElementID)
            if (cellsArrayElementID === cellID){
                cells[j].innerHTML = 'Bomb'
            }
            
        }
    }

    //empties diffused bomb array
    diffusedBombArray = []
    
})



//Flag/diffuser functionality:

//set up bomb to be initially without diffused class, will change with flag added


$flagOnButton.click(() => {

    minesAreLive = false
    console.log('Safety Gear On')

    $flagOnButton.hide()
    $flagOffButton.fadeIn()

   
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            $flagOffButton.hide()
            $flagOnButton.fadeIn()
        })
    })
    $flagOffButton.click(() => {
        console.log('Safety Gear Removed')
        $flagOffButton.hide()
        $flagOnButton.fadeIn()
        minesAreLive = true
    })
})



// using forEach array method to add event listener to each cell
//also using vanilla JS for event listeners/clicks cause my vs code doesnt like functions ie .click




cells.forEach(cell => {
    cell.addEventListener('click', () => {
        cell.classList.add('revealed')
        if (cell.innerHTML === 'Bomb') {
            
            console.log('You found a bomb')

            if (minesAreLive === true) {
               
                cell.classList.add('bomb')

                 // alert to see loss in browser
                 console.log('You Lose! Game Over!')
                 alert('You Lose! Game Over!!')


                 // resets diffused bombs collected before bomb hit
                 for (i = 0; i<diffusedBombArray.length;i++){
                    let cellID = diffusedBombArray[i]
                    // console.log(cellID)
                    for (j = 0; j < cells.length; j++){
                        let cellsArrayElementID = cells[j].id;
                        // console.log(cellsArrayElementID)
                        if (cellsArrayElementID === cellID){
                            cells[j].innerHTML = 'Bomb'
                        }
                        
                    }
                }

            }

            //check win function is fully for the Flag On button, last flag placed on bomb results in win
            
            else {
                    minesAreLive = true
                    console.log('You diffused a bomb')
                    cell.classList.add('diffused')
                    let diffusedBombID = cell.getAttribute('id')
                    console.log(diffusedBombID)
                    diffusedBombArray.push(diffusedBombID)
                    console.log(diffusedBombArray)
                    console.log('Safety Gear Removed')

                    //remove bomb html from cell so can't add twice!
                    //diffused bomb area is also safe!
                    // console.log (cell.innerHTML)
                    let bombText = cell.innerHTML
                    bombText = 'Diffused Bomb'
                    cell.innerHTML = bombText
                    // console.log (cell.innerHTML)

                    // dont need loop just do conditional!
                    if (diffusedBombArray.length !== numberBombs){
                        console.log(`Keep looking! There are ${numberBombs - diffusedBombArray.length} left!!`)
                    }
                    else if (diffusedBombArray.length === numberBombs){
                        //for browser and console win check
                        console.log ('You Win!!!')
                        alert('You Win!!!')
                        
                        for (i = 0; i<diffusedBombArray.length;i++){
                            let cellID = diffusedBombArray[i]
                            // console.log(cellID)
                            for (j = 0; j < cells.length; j++){
                                let cellsArrayElementID = cells[j].id;
                                // console.log(cellsArrayElementID)
                                if (cellsArrayElementID === cellID){
                                    cells[j].innerHTML = 'Bomb'
                                }
                                
                            }
                        }
                    }
                }
        }
        else if (parseInt(cell.innerHTML) > 0 && parseInt(cell.innerHTML) <= 2) { 

            // Console logs to play in console
            console.log(`${cell.innerHTML} bombs are close`)
            // console.log(cell)
        }
        else if (parseInt(cell.innerHTML) === 0){

            // Console logs to play in console
            // console.log('no bombs are near')
            // console.log(cell)

            //find coordinates of click
            const colClick = parseInt(cell.getAttribute('id').split('-').slice(3))
            // console.log(colClick)
            const rowClick = parseInt(cell.getAttribute('id').split('-').slice(1,2))
            // console.log(rowClick)
            const clickCoordinates = [colClick, rowClick];
            // console.log(clickCoordinates)
            
            //function to get cells in column of clicked empty square
            let blankCellCoordinatesInClickedColumn = [];
            let blankCellCoordinatesInClickedRow =[];
            let rowChildrenElementNumber = 0;
            // console.log(rowChildrenElementNumber)
            let lengthOfColumn = 0;

            //index variable for expanded row column function and for loop in blank cell click
            let columnRowIndex = null;

            for (i = 0; i<cells.length ;i++) {
                //collects just blank columns (no bombs in array)
                if (cellCoordinateArray[i][0] === colClick && cellCoordinateArray[i][2] !== 'Bomb'){
                    blankCellCoordinatesInClickedColumn.push(cellCoordinateArray[i])
                    cells[i].classList.add('revealed')

                    //getting rows off of columns to reveal through parent Node
                    let parentNode = cells[i].parentElement
                    // console.log(parentNode)
                    let childrenOfRowNode = parentNode.children
                    // console.log(childrenOfRowNode)
                    // console.log(childrenOfRowNode.length)
                    rowChildrenElementNumber = childrenOfRowNode.length

                    for (j = 0 ; j < childrenOfRowNode.length; j++){
                        // console.log(childrenOfRowNode[j])
                        if (childrenOfRowNode[j].innerHTML !== 'Bomb'){
                            childrenOfRowNode[j].classList.add('revealed')
                        }
                    }
                    
                }
            }

            // console.log(blankCellCoordinatesInClickedColumn)

            for (i = 0; i<cells.length ;i++) {
                //collects just blank cells with no bombs
                if (cellCoordinateArray[i][1] === rowClick && cellCoordinateArray[i][2] !== 'Bomb'){
                    blankCellCoordinatesInClickedRow.push(cellCoordinateArray[i])
                    cells[i].classList.add('revealed')

                    // need loop here that goes through columns, since parents are rows, can't use that trick
                    //length of column = (length of cells array)/childrenOfRowNode.length
                    lengthOfColumn = cells.length/rowChildrenElementNumber
                    // console.log(lengthOfColumn)

                    // loop through column off of each row and reveal till bomb
                    

                } 
            }

            // console.log(blankCellCoordinatesInClickedRow)

             for (i = 0; i < blankCellCoordinatesInClickedRow.length; i++){
                // console.log(blankCellCoordinatesInClickedRow[i])
                let columnIndex = blankCellCoordinatesInClickedRow[i][0];
                // console.log(columnIndex)

                let columnFromExpandingIndex = [];

                for (j = 0; j<cellCoordinateArray.length; j++){
                    if (cellCoordinateArray[j][0] === columnIndex) {
                        columnFromExpandingIndex.push(cellCoordinateArray[j])
                    }
                } 
                // console.log(columnFromExpandingIndex)

                let blankElementsOfColumns = [];

                for (j = 0; j<columnFromExpandingIndex.length; j++) {
                    if (columnFromExpandingIndex[j][2] !== 'Bomb'){
                        blankElementsOfColumns.push(columnFromExpandingIndex[j])
                        let revealedID = columnFromExpandingIndex[j][3];
                        // console.log(revealedID)
                        let revealedElement = document.getElementById(revealedID)
                        // console.log(revealedElement)
                        revealedElement.classList.add('revealed')
                    }
                } 
                
                // console.log(blankElementsOfColumns)
                
             }

            //might need an else if === bomb break loop for bombs in center here
        }
    })
})
                

// function that gives coordinates for all cells in gameboard:
let cellCoordinateArray = [];

function coordinatesFromIDGeneration () {
    for (i = 0; i<cells.length; i++){
        const col = parseInt(cells[i].getAttribute('id').split('-').slice(3))
        const row = parseInt(cells[i].getAttribute('id').split('-').slice(1,2))
        cellCoordinateArray.push([col, row, cells[i].innerHTML, cells[i].getAttribute('id')])
    }
    return cellCoordinateArray
}

coordinatesFromIDGeneration()
// console.log(cellCoordinateArray)











// thoughts:
//can I create a game board object? or a cell object with the content?

// I probably want a player object!



// Extra stuff

// console.log($bombCells) // diffused bomb (diffused class remains)
// $bombCells.removeClass('diffused')
// console.log($bombCells) //un-diffused (no diffused class)


//mabye put this into an active mine function?