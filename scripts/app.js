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
  let goldenPosition = 0
  let golden


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
      case 68:
        if ((x < width - 1)) {
          clearInterval(movePlease)
          movePlease = setInterval(() => {
            squares[drakePosition].classList.remove('drake')
            squares[drakePosition].classList.remove('drake-left')
            drakePosition++
            squares[drakePosition].classList.add('drake')
            recordsCaught(drakePosition)
          }, 500)
        }
        break
      case 65:
        if (x > 0) {
          clearInterval(movePlease)
          movePlease = setInterval(() => {
            squares[drakePosition].classList.remove('drake')
            squares[drakePosition].classList.remove('drake-left')
            drakePosition--
            squares[drakePosition].classList.add('drake-left')
            recordsCaught(drakePosition)
          }, 500)
        }
        break
      case 87:
        if (y > 0) {
          clearInterval(movePlease)
          movePlease = setInterval(() => {
            squares[drakePosition].classList.remove('drake')
            squares[drakePosition].classList.remove('drake-left')
            drakePosition -= width
            squares[drakePosition].classList.add('drake')
            recordsCaught(drakePosition)
          }, 500)
        }
        break
      case 83:
        if (y < width - 1) {
          clearInterval(movePlease)
          movePlease = setInterval(() => {
            squares[drakePosition].classList.remove('drake')
            squares[drakePosition].classList.remove('drake-left')
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
      console.log(`record count: ${recordCount} score count: ${scoreCount} `)
      if (recordCount % 10 === 0 ) {
        goldenPosition = Math.floor(Math.random() * numberOfSquares)
        squares[goldenPosition].classList.add('golden')
        golden = setTimeout(() => {
          squares[goldenPosition].classList.remove('golden')
          
        }, 8000)
      }
    } 
    if (squares[drakePosition].classList.contains('golden')) {
      squares[goldenPosition].classList.remove('golden')
      scoreCount += 30
      clearTimeout(golden)
      console.log(`golden record score: ${scoreCount}`)
    }
  }

  createTheBoard(drakePosition)

  document.addEventListener('keyup', handleMovements)
  document.addEventListener('keyup', runTheTrap)

}
window.addEventListener('DOMContentLoaded', init)