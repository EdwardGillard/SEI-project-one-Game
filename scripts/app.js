function init() {
  //* Sanity check
  // console.log('Hello World')

  // * DOM elements
  const gameBoard = document.querySelector('.grid')
  const squares = []
  const drakeArray = ['../Pictures/snake1', '../Pictures/snake2', '../Pictures.snake3', '../Pictures.snake4']
  const score = document.querySelector('.score')
  const backgroundChange = document.querySelector('#background')

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
  let direction = 'right'
  let nextDirection
  let drakeSnake = []


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
      document.querySelector('.game-board').style.margin = '90px 0 5px 0'
      document.querySelector('main').style.backgroundColor = 'black'
    }
  }

  function handleMovements(event) {
    switch (event.keyCode) {
      case 68:
        //* current direction
        direction = 'right'
        //* listen for next direction
        // nextDirection = event.keyCode
        //* if current direction is right and nextDirection is left do nothing
        // if (direction === 'right' && nextDirection === 'left')
        clearInterval(movePlease)
        movePlease = setInterval(() => {
          const x = drakePosition % width
          if (x < width - 1 && direction !== 'left') {
            if (recordCount === 0) {
              squares[drakePosition].classList.remove('drake')
              squares[drakePosition].classList.remove('drake-left')
              drakePosition++
              squares[drakePosition].classList.add('drake')
            } else {
              drakeSnake.forEach(index => {
                squares[index].classList.remove('drake')
                squares[index].classList.remove('drake-left')
                squares[index].classList.remove('drake1')
              })
              drakePosition++
              drakeSnake.unshift(drakePosition)
              drakeSnake.pop()
              // console.log(drakeSnake)
              drakeSnake.forEach(index => {
                squares[index].classList.add('drake')
              })
            }
          }
          recordsCaught(drakePosition)
          // console.log(drakePosition)
          // console.log(drakePosition % width)
        }, 300)
        break
      case 65:
        direction = 'left'
        clearInterval(movePlease)
        movePlease = setInterval(() => {
          const x = drakePosition % width
          if (x > 0) {
            if (recordCount === 0) {
              squares[drakePosition].classList.remove('drake')
              squares[drakePosition].classList.remove('drake-left')
              drakePosition--
              squares[drakePosition].classList.add('drake-left')
            } else {
              drakeSnake.forEach(index => {
                squares[index].classList.remove('drake')
                squares[index].classList.remove('drake-left')
                squares[index].classList.remove('drake1')
              })
              squares[drakePosition].classList.remove('drake')
              squares[drakePosition].classList.remove('drake-left')
              drakePosition--
              drakeSnake.unshift(drakePosition)
              drakeSnake.pop()
              squares[drakePosition].classList.add('drake-left')
              drakeSnake.forEach(index => {
                squares[index].classList.add('drake-left')
              })
              // console.log(drakeSnake)
            }
          }
          recordsCaught(drakePosition)
        }, 300)
        break
      case 87:
        direction = 'up'
        clearInterval(movePlease)
        movePlease = setInterval(() => {
          const y = Math.floor(drakePosition / width)
          if (y > 0) {
            if (recordCount === 0) {
              squares[drakePosition].classList.remove('drake')
              squares[drakePosition].classList.remove('drake-left')
              drakePosition -= width
              squares[drakePosition].classList.add('drake')
            } else {
              drakeSnake.forEach(index => {
                squares[index].classList.remove('drake')
                squares[index].classList.remove('drake-left')
                squares[index].classList.remove('drake1')
              })
              drakePosition -= width
              drakeSnake.unshift(drakePosition)
              drakeSnake.pop()
              drakeSnake.forEach(index => {
                squares[index].classList.add('drake')
              })
              // console.log(drakeSnake)
            }
          }
          recordsCaught(drakePosition)
        }, 300)
        break
      case 83:
        direction = 'down'
        clearInterval(movePlease)
        movePlease = setInterval(() => {
          const y = Math.floor(drakePosition / width)
          if (y < width - 1) {
            if (recordCount === 0) {
              squares[drakePosition].classList.remove('drake')
              squares[drakePosition].classList.remove('drake-left')
              drakePosition += width
              squares[drakePosition].classList.add('drake')
            } else {
              drakeSnake.forEach(index => {
                squares[index].classList.remove('drake')
                squares[index].classList.remove('drake-left')
                squares[index].classList.remove('drake1')
              })
              drakePosition += width
              drakeSnake.unshift(drakePosition)
              drakeSnake.pop()
              drakeSnake.forEach(index => {
                squares[index].classList.add('drake')
              })
              // console.log(drakeSnake)
            }
          }
          recordsCaught(drakePosition)
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
      //* Randomised record position.
      recordPosition = Math.floor(Math.random() * numberOfSquares)
      //* Preventing randomised record position from clashing with drakePosition or drakeSnake.
      while (squares[recordPosition].classList.contains('drake') || squares[recordPosition].classList.contains('drake-left')) {
        recordPosition = Math.floor(Math.random() * numberOfSquares)
      }
      squares[recordPosition].classList.add('record')

      // console.log(`record count: ${recordCount} score count: ${scoreCount} `)
      //* if recordCount is a multiple of 10...
      if (recordCount % 10 === 0) {
        //* produce a random position for golden record
        goldenPosition = Math.floor(Math.random() * numberOfSquares)
        //* to prevent golden label from clashing with any other classes
        while (squares[goldenPosition].classList.contains('drake') || squares[goldenPosition].classList.contains('drake-left') || squares[goldenPosition].classList.contains('record')) {
          goldenPosition = Math.floor(Math.random() * numberOfSquares)
        }
        squares[goldenPosition].classList.add('golden')
        //* DOM changes for golden record timer
        backgroundChange.style.backgroundImage = 'url("Pictures/backgroundchange.png")'
        backgroundChange.style.backgroundSize = '200px'
        backgroundChange.style.backgroundRepeat = 'repeat'
        gameBoard.style.backgroundImage = 'url("Pictures/backgroundchange1.png")'
        gameBoard.style.backgroundSize = 'cover'
        //* time out for golden record
        golden = setTimeout(() => {
          squares[goldenPosition].classList.remove('golden')
          backgroundChange.style.backgroundImage = 'url("/Users/edwardgillard/development/Projects/SEI-project-one-Game/Pictures/88-887616_boy-if-you-dont-stop-drake-face-png.png")'
          gameBoard.style.backgroundImage = 'url("Pictures/main-background.jpg")'
        }, 10000)
      }
      growTheSnake()
    }
    if (squares[drakePosition].classList.contains('golden')) {
      squares[goldenPosition].classList.remove('golden')
      scoreCount += 30
      recordCount++
      clearTimeout(golden)
      backgroundChange.style.backgroundImage = 'url("/Users/edwardgillard/development/Projects/SEI-project-one-Game/Pictures/88-887616_boy-if-you-dont-stop-drake-face-png.png")'
      gameBoard.style.backgroundImage = 'url("Pictures/main-background.jpg")'
      // console.log(`golden record score: ${scoreCount}`)
    }
  }

  function growTheSnake() {
    // console.log(direction)
    // console.log(recordCount)
    // console.log(drakeSnake.length)
    // * defining the direction the snakes moving.
    if (direction === 'right') {
      drakeSnake.unshift(drakePosition)
      // console.log(drakePosition)
      // console.log(drakeSnake)
    } else if (direction === 'left') {
      drakeSnake.unshift(drakePosition)
    } else if (direction === 'up') {
      drakeSnake.unshift(drakePosition)
      // console.log('drake is going up')
    } else if (direction === 'down') {
      drakeSnake.unshift(drakePosition)
      // console.log('drake is going down')
    }
  }


  // function collision() {
  //   //* create set of rules for if snake crashes
  //   // if (squares[drakePosition + 1].classList.contains('drake')){
  //   //   console.log('crashed right')
  //   // }
  // }

  //* CALLING CREATE BOARD FUNCTION
  createTheBoard(drakePosition)


  document.addEventListener('keyup', handleMovements)
  document.addEventListener('keyup', playTheGame)


}

window.addEventListener('DOMContentLoaded', init)