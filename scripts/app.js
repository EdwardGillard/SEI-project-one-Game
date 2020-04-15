function init() {
  //* Sanity check
  // console.log('Hello World')

  // * DOM elements
  const gameBoard = document.querySelector('.grid')
  const squares = []
  const score = document.querySelector('.score')
  const backgroundChange = document.querySelector('#background')
  const buttonsAll = document.querySelector('.difficulty-buttons')
  const audioYeah = document.querySelector('.yeah')
  const goldie = document.querySelector('.goldy')
  const alright = document.querySelector('.alright')

  //* GridInfo
  const width = 10
  const numberOfSquares = width * width

  //* Variables
  let drakePosition = 0
  let recordPosition = 0
  let scoreCount = 0
  let beganGame = false
  let recordCount = 0
  let golden
  let speedChanger
  let speed
  let goldenPosition = 0
  let direction = 'right'
  let drakeSnake = []
  let difficulty
  let timer


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
    //* Event listener
    // console.log(event.target.value)
    if (beganGame) return
    // console.log('game began')
    beganGame = true
    //* create first record
    recordPosition = Math.floor(Math.random() * numberOfSquares)
    squares[recordPosition].classList.add('record')
    //* DOM Changes on game start
    document.querySelector('.instructions').style.display = 'none'
    document.querySelector('header').style.display = 'none'
    document.querySelector('.game-board').style.margin = '40px 0 5px 0'
    document.querySelector('main').style.backgroundColor = 'black'
    //* Start Movement
    difficulty = event.target.value
    if (event.target.value === 'hard') {
      speed = 200
    } else if (event.target.value === 'medium') {
      speed = 500
    } else if (event.target.value === 'easy') {
      speed = 700
    }
    speedChanger = setInterval(moveDrake, speed)
    console.log(speed)
  }


  function moving(event) {
    switch (event.keyCode) {
      case 68:
        direction = direction === 'left' ? 'left' : 'right'
        // console.log('right')
        break

      case 65:
        direction = direction === 'right' ? 'right' : 'left'
        // console.log('left')
        break

      case 87:
        direction = direction === 'down' ? 'down' : 'up'
        // console.log('up')
        break

      case 83:
        direction = direction === 'up' ? 'up' : 'down'
        // console.log('down')
        break
    }
  }

  function moveDrake() {

    //* Parameter Logic
    const x = drakePosition % width
    const y = Math.floor(drakePosition / width)

    //* remove classes
    squares[drakePosition].classList.remove('drake')
    squares[drakePosition].classList.remove('drake-left')
    drakeSnake.forEach(index => {
      squares[index].classList.remove('drake1')
      squares[index].classList.remove('drake2')
      squares[index].classList.remove('drake3')
    })

    //* define array movement movements
    drakeSnake.unshift(drakePosition)
    drakeSnake.pop()

    //* Conditional statements
    if (direction === 'right') {
      if (x === width - 1) {
        console.log('you lost')
        clearInterval(speedChanger)
        // console.log(drakeSnake)
      } else {
        drakePosition++
      }
    } else if (direction === 'left') {
      if (x === 0) {
        console.log('you lost')
        clearInterval(speedChanger)
      } else {
        drakePosition--
        squares[drakePosition].classList.add('drake-left')
      }
    } else if (direction === 'up') {
      if (y === 0) {
        console.log('you lost')
        clearInterval(speedChanger)
      } else {
        drakePosition -= width
      }
    } else if (direction === 'down') {
      if (y === width - 1) {
        console.log('you lost')
        clearInterval(speedChanger)
      } else {
        drakePosition += width
      }
    }
    //* add classes back
    squares[drakePosition].classList.add('drake')
    drakeSnake.forEach(index => {
      if (index % 3 === 0) {
        squares[index].classList.add('drake2')
      } else if (index % 2 === 0) {
        squares[index].classList.add('drake1')
      } else if (index % 1 === 0) {
        squares[index].classList.add('drake3')
      }
    })
    //* call the recordsCaught Function
    recordsCaught(drakePosition)
    collision()
  }

  function recordsCaught(drakePosition) {
    //* Conditional statement for if record is caught.
    if (squares[drakePosition].classList.contains('record')) {
      squares[recordPosition].classList.remove('record')
      //* audio clip
      if (recordCount % 2 === 0) {
        audioYeah.play('/sounds/drake_4.mp3')
      } else if (recordCount % 3 === 0) {
        alright.play('sounds/drake_5.mp3')
      } else {
        alright.play('sounds/drake_5.mp3')
      }
      //* Changes to game variables.
      recordCount++
      if (difficulty === 'hard') {
        scoreCount += 50
      } else if (difficulty === 'medium') {
        scoreCount += 30
      } else if (difficulty === 'easy') {
        scoreCount += 10
      }
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
        //* Hotline Bling
        goldie.play('sounds/hotline-bling.mp3')
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
        //* conditions for timeout
        if (difficulty === 'hard') {
          timer = 5000
        } else if (difficulty === 'medium') {
          timer = 8000
        } else if (difficulty === 'easy') {
          timer = 11000
        }
        //* time out for golden record
        golden = setTimeout(() => {
          goldie.pause('sounds/hotline-bling.mp3')
          squares[goldenPosition].classList.remove('golden')
          backgroundChange.style.backgroundImage = 'url("/Users/edwardgillard/development/Projects/SEI-project-one-Game/Pictures/88-887616_boy-if-you-dont-stop-drake-face-png.png")'
          gameBoard.style.backgroundImage = 'url("Pictures/main-background.jpg")'
        }, timer)
      }
      growTheSnake()
    }
    //* conditions for if drake catches the golden record. Speed up and score differences.
    if (squares[drakePosition].classList.contains('golden')) {
      squares[goldenPosition].classList.remove('golden')
      goldie.pause('sounds/hotline-bling.mp3')
      if (difficulty === 'hard') {
        scoreCount += 100
        speed -= 20
        console.log(speed)
      } else if (difficulty === 'medium') {
        scoreCount += 60
        speed -= 25
        console.log(speed)
      } else if (difficulty === 'easy') {
        scoreCount += 20
        speed -= 30
        console.log(speed)
      }
      recordCount++
      clearTimeout(golden)
      backgroundChange.style.backgroundImage = 'url("/Users/edwardgillard/development/Projects/SEI-project-one-Game/Pictures/88-887616_boy-if-you-dont-stop-drake-face-png.png")'
      gameBoard.style.backgroundImage = 'url("Pictures/main-background.jpg")'
      // console.log(`golden record score: ${scoreCount}`)
    }
    //* display score changes for records & golden records
    score.textContent = scoreCount
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


  function collision() {
    //* create set of rules for if snake crashes
    if (squares[drakePosition].classList.contains('drake1') || squares[drakePosition].classList.contains('drake2') || squares[drakePosition].classList.contains('drake3')) {
      console.log('game over')
      clearInterval(speedChanger)
      drakePosition = 0
      drakeSnake = []
      drakeSnake.forEach(index => {
        squares[index].classList.remove('drake1')
        squares[index].classList.remove('drake2')
        squares[index].classList.remove('drake3')

      })
      squares[recordPosition].classList.remove('record')
      squares[goldenPosition].classList.remove('golden')
      squares[drakePosition].classList.remove('drake')
      squares[drakePosition].classList.remove('drake-left')
      beganGame = false
      document.querySelector('.instructions').style.display = 'flex'
      document.querySelector('header').style.display = 'flex'
      document.querySelector('main').style.backgroundColor = 'white'
      document.querySelector('.game-board').style.margin = '0'
      createTheBoard(drakePosition)
    }
  }

  //* CALLING CREATE BOARD FUNCTION
  createTheBoard(drakePosition)

  buttonsAll.addEventListener('click', playTheGame)
  document.addEventListener('keyup', moving)
}

window.addEventListener('DOMContentLoaded', init)