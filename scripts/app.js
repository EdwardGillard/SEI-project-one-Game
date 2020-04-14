function init() {
  //* Sanity check
  // console.log('Hello World')

  // * DOM elements
  const gameBoard = document.querySelector('.grid')
  const squares = []
  const score = document.querySelector('.score')
  const backgroundChange = document.querySelector('#background')
  // const buttonEasy = document.querySelector('#but-one')
  // const buttonMed = document.querySelector('#but-two')
  // const buttonHard = document.querySelector('#but-three')
  const buttonsAll = document.querySelector('.difficulty-buttons')

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
  let goldenPosition = 0
  let direction = 'right'
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
    //* Event listener
    if (event.keyCode === 32) {
      if (beganGame) return
      // console.log('game began')
      beganGame = true
      //* create first record
      recordPosition = Math.floor(Math.random() * numberOfSquares)
      squares[recordPosition].classList.add('record')
      //* Start Movement
      setInterval(moveDrake, 200)
      //* DOM Changes on game start
      document.querySelector('.instructions').style.display = 'none'
      document.querySelector('header').style.display = 'none'
      document.querySelector('.game-board').style.margin = '90px 0 5px 0'
      document.querySelector('main').style.backgroundColor = 'black'
    }
  }

  function moving(event) {
    switch (event.keyCode) {
      case 68:
        direction = 'right'
        direction ? 'right' : 'left'
        // console.log('right')
        break

      case 65:
        direction = 'left'
        console.log('left')
        break

      case 87:
        direction = 'up'
        console.log('up')
        break

      case 83:
        direction = 'down'
        console.log('down')
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
      squares[index].classList.remove('drake')
      squares[index].classList.remove('drake-left')
    })

    //* define array movement movements
    drakeSnake.unshift(drakePosition)
    drakeSnake.pop()

    //* Conditional statements
    if (direction === 'right') {
      if (x < width - 1) {
        drakePosition++
        // console.log(drakeSnake)
      }
    } else if (direction === 'left') {
      if (x > 0) {
        drakePosition--
        squares[drakePosition].classList.add('drake-left')
        drakeSnake.forEach(index => {
          squares[index].classList.add('drake-left')
        })
      }
    } else if (direction === 'up') {
      if (y > 0) {
        drakePosition -= width
      }
    } else if (direction === 'down') {
      if (y < width - 1) {
        drakePosition += width
      }
    }
    //* add classes back
    squares[drakePosition].classList.add('drake')
    drakeSnake.forEach(index => {
      squares[index].classList.add('drake')
    })
    //* call the recordsCaught Function
    recordsCaught(drakePosition)
  }

  function recordsCaught(drakePosition) {
    //* Conditional statement for if record is caught.
    if (squares[drakePosition].classList.contains('record')) {
      squares[recordPosition].classList.remove('record')
      //* Changes to game variables.
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

  function difficulty (event){
    console.log(event.target.value)
    if (event.target.value === 'hard'){
      console.log('clicked hard')
    } else if (event.target.value === 'medium'){
      console.log('clicked Medium')
    } else if (event.target.value === 'easy'){
      console.log('clicked easy')
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

  buttonsAll.addEventListener('click', difficulty)
  document.addEventListener('keyup', moving)
  document.addEventListener('keyup', playTheGame)
}

window.addEventListener('DOMContentLoaded', init)