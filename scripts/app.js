function init() {
  //* Sanity check
  console.log('Hello World')

  // * DOM elements
  const gameBoard = document.querySelector('.grid')
  const squares = []
  const drakeArray = ['../Pictures/snake1', '../Pictures/snake2', '../Pictures.snake3', '../Pictures.snake4']
  const drakeSnake = ['drakePosition']
  const score = document.querySelector('.score')

  //GridInfo
  const width = 10
  const numberOfSquares = width * width

  //Variables

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
      // square.textContent = i
      squares.push(square)
    }
    squares[startPosition].classList.add('drake')
  }

  function playTheGame(event) {
    if (event.keyCode === 32) {
      if (beganGame) return
      // console.log('game began')
      beganGame = true
      recordPosition = Math.floor(Math.random() * numberOfSquares)
      squares[recordPosition].classList.add('record')
      document.querySelector('.instructions').style.display = 'none'
      document.querySelector('header').style.display = 'none'
      document.querySelector('.game-board').style.margin = '50px 0 5px 0'
    }
  }

  function handleMovements(event) {
    switch (event.keyCode) {
      case 68:
        clearInterval(movePlease)
        movePlease = setInterval(() => {
          const x = drakePosition % width
          if (x < width - 1) {
            squares[drakePosition].classList.remove('drake')
            squares[drakePosition].classList.remove('drake-left')
            drakePosition++
            squares[drakePosition].classList.add('drake')
            recordsCaught(drakePosition)
            // console.log(drakePosition)
            // console.log(drakePosition % width)
          }
        }, 300)
        break
      case 65:
        clearInterval(movePlease)
        movePlease = setInterval(() => {
          const x = drakePosition % width
          if (x > 0) {
            squares[drakePosition].classList.remove('drake')
            squares[drakePosition].classList.remove('drake-left')
            drakePosition--
            squares[drakePosition].classList.add('drake-left')
            recordsCaught(drakePosition)
          }
        }, 300)
        break
      case 87:
        clearInterval(movePlease)
        movePlease = setInterval(() => {
          const y = Math.floor(drakePosition / width)
          if (y > 0) {
            squares[drakePosition].classList.remove('drake')
            squares[drakePosition].classList.remove('drake-left')
            drakePosition -= width
            squares[drakePosition].classList.add('drake')
            recordsCaught(drakePosition)
          }
        }, 300)
        break
      case 83:
        clearInterval(movePlease)
        movePlease = setInterval(() => {
          const y = Math.floor(drakePosition / width)
          if (y < width - 1) {
            squares[drakePosition].classList.remove('drake')
            squares[drakePosition].classList.remove('drake-left')
            drakePosition += width
            squares[drakePosition].classList.add('drake')
            recordsCaught(drakePosition)
          }
        }, 300)
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
      score.textContent = scoreCount
      recordPosition = Math.floor(Math.random() * numberOfSquares)
      squares[recordPosition].classList.add('record')
      buildTheSnake(drakePosition, recordCount)
      console.log(`record count: ${recordCount} score count: ${scoreCount} `)
      if (recordCount % 10 === 0) {
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
      // console.log(`golden record score: ${scoreCount}`)
    }
  }

  function buildTheSnake(drakePosition, recordCount){
    console.log(drakePosition, recordCount)

  }

  function collision() {
  }

  
  createTheBoard(drakePosition)

  document.addEventListener('keyup', handleMovements)
  document.addEventListener('keyup', playTheGame)
  

}
window.addEventListener('DOMContentLoaded', init)