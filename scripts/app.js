function init() {
  //* Sanity check
  console.log('Hello World')

  // * DOM elements
  const gameBoard = document.querySelector('.grid')
  const squares = []

  //GridInfo
  const width = 10
  const numberOfSquares = width * width

  let drakePosition = 0
  let movePlease
  let recordPosition = 0
  let scoreCount = 0
  let beganGame = false
  let recordCount = 0


  //* functions

  function createTheBoard(startPosition) {
    for (let i = 0; i < numberOfSquares; i++) {
      const square = document.createElement('div')
      gameBoard.appendChild(square)
      square.textContent = i
      squares.push(square)
    }
    squares[startPosition].classList.add('drake')
  }

  function runTheTrap(event) {
    if (event.keyCode === 32) {
      if (beganGame) return
      console.log('game began')
      beganGame = true
      recordPosition = Math.floor(Math.random() * numberOfSquares)
      squares[recordPosition].classList.add('record')
    }
  }



  function handleMovements(event) {
    const x = drakePosition % width
    const y = Math.floor(drakePosition / width)
    switch (event.keyCode) {
      case 39:
        if (x < width - 1) {
          clearInterval(movePlease)
          movePlease = setInterval(() => {
            squares[drakePosition].classList.remove('drake')
            drakePosition++
            squares[drakePosition].classList.add('drake')
            recordsCaught(drakePosition)
          }, 500)
        }
        break
      case 37:
        if (x > 0) {
          clearInterval(movePlease)
          movePlease = setInterval(() => {
            squares[drakePosition].classList.remove('drake')
            drakePosition--
            squares[drakePosition].classList.add('drake')
            recordsCaught(drakePosition)
          }, 500)
        }
        break
      case 38:
        if (y > 0) {
          clearInterval(movePlease)
          movePlease = setInterval(() => {
            squares[drakePosition].classList.remove('drake')
            drakePosition -= width
            squares[drakePosition].classList.add('drake')
            recordsCaught(drakePosition)
          }, 500)
        }
        break
      case 40:
        if (y < width - 1) {
          clearInterval(movePlease)
          movePlease = setInterval(() => {
            squares[drakePosition].classList.remove('drake')
            drakePosition += width
            squares[drakePosition].classList.add('drake')
            recordsCaught(drakePosition)
          }, 500)
        }
        break
      default:
        // console.log('invalid keys')
        // } console.log(drakePosition)
        squares[drakePosition].classList.add('drake')
    }
  }

  function recordsCaught(drakePosition) {
    if (squares[drakePosition].classList.contains('record')) {
      squares[recordPosition].classList.remove('record')
      recordCount++
      scoreCount += 10
      recordPosition = Math.floor(Math.random() * numberOfSquares)
      squares[recordPosition].classList.add('record')
      console.log(`record court ${scoreCount}`)

    }
  }

  createTheBoard(drakePosition)

  document.addEventListener('keyup', handleMovements)
  document.addEventListener('keyup', runTheTrap)

}
window.addEventListener('DOMContentLoaded', init)