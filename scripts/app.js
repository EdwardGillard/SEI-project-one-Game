function init() {
  //* Sanity check
  console.log('Hello World')

  // * DOM elements
  const gameBoard = document.querySelector('.grid')
  const squares = []

  //GridInfo
  const width = 20
  const numberOfCells = width * width

  let drakePosition = 0


  //* functions

  function createTheBoard() {
    for (let i = 0; i < numberOfCells; i++) {
      const square = document.createElement('div')
      gameBoard.appendChild(square)
      square.textContent = i
      squares.push(square)
    }
    squares[drakePosition].classList.add('drake')
  }

  function handleMovements(event) {
    squares[drakePosition].classList.remove('drake')
    const x = drakePosition % width
    const y = Math.floor(drakePosition / width)
    switch (event.keyCode) {
      case 39:
        if (x < width - 1) drakePosition++
        break
      case 37:
        if (x > 0) drakePosition--
        break
      case 38:
        if (y > 0) drakePosition -= width
        break
      case 40:
        if (y < width - 1) drakePosition += width
        break
      default:
        console.log('invalid keys')
    }
    squares[drakePosition].classList.add('drake')
  }




  createTheBoard()

  document.addEventListener('keyup', handleMovements)
}
window.addEventListener('DOMContentLoaded', init)