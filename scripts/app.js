function init() {
  //* Sanity check
  // console.log('Hello World')

  // * DOM elements
  const gameBoard = document.querySelector('.grid')
  const squares = []
  const score = document.querySelector('.score')
  const scorePageTwo = document.querySelector('.score-page-two')
  const backgroundChange = document.querySelector('#background')
  const buttonsAll = document.querySelector('.difficulty-buttons')
  const backToGame = document.querySelector('#option-one')
  const NavToScoreBoard = document.querySelector('#option-two')
  const addScore = document.querySelector('form')
  const returnToMp = document.querySelector('.return-mainpage')
  const buttonsForMediaQ = document.querySelector('.movement-buttons')
  const muteButton = document.querySelector('.mute-button')
  const allAudio = document.querySelector('#audio')
  const recordSounds = document.querySelector('#record-sounds')
  const mainPage = document.querySelector('main')


  //* High score Globals
  const nameLogWindow = document.querySelector('#name-log-window')
  const scoreThreeWindow = document.querySelector('#score-three-window')
  const localStorage = window.localStorage
  localStorage.setItem('nameLog', 'Aubrey Graham')
  localStorage.setItem('scoreThree', '2000')
  let highScoreName = localStorage.getItem('nameLog')
  let highScore = localStorage.getItem('scoreThree')

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
    //* pause previous audio
    //* reset score
    scoreCount = 0
    recordCount = 0
    //* Event listener
    // console.log(event.target.value)
    if (beganGame) return
    direction = 'right'
    // console.log('game began')
    beganGame = true
    //* create first record
    recordPosition = Math.floor(Math.random() * numberOfSquares)
    squares[recordPosition].classList.add('record')
    //* DOM Changes on game start
    document.querySelector('.instructions').style.display = 'none'
    document.querySelector('h1').style.display = 'none'
    muteButton.style.backgroundColor = 'black'
    mainPage.style.backgroundColor = 'black'
    mainPage.style.height = '95vh'
    document.querySelector('.score').marginBottom = '10px'
    document.querySelector('.difficulty-buttons').style.display = 'none'
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
    // console.log(speed)
  }


  function moving(event) {
    switch (event.keyCode) {
      case 39:
        direction = direction === 'left' ? 'left' : 'right'
        // console.log('right')
        event.preventDefault()
        break

      case 37:
        direction = direction === 'right' ? 'right' : 'left'
        // console.log('left')
        event.preventDefault()
        break

      case 38:
        direction = direction === 'down' ? 'down' : 'up'
        // console.log('up')
        event.preventDefault()
        break

      case 40:
        direction = direction === 'up' ? 'up' : 'down'
        // console.log('down')
        event.preventDefault()
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
        loser()
      } else {
        drakePosition++
      }
    } else if (direction === 'left') {
      if (x === 0) {
        loser()
      } else {
        drakePosition--
        squares[drakePosition].classList.add('drake-left')
      }
    } else if (direction === 'up') {
      if (y === 0) {
        loser()
      } else {
        drakePosition -= width
      }
    } else if (direction === 'down') {
      if (y === width - 1) {
        loser()
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
        yeahAudio()
      } else if (recordCount % 3 === 0) {
        alrightAudio()
      } else {
        alrightAudio()
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
      while (squares[recordPosition].classList.contains('drake') || squares[recordPosition].classList.contains('drake-left') || squares[recordPosition].classList.contains('drake1') || squares[recordPosition].classList.contains('drake2') || squares[recordPosition].classList.contains('drake3') || squares[recordPosition].classList.contains('golden')) {
        recordPosition = Math.floor(Math.random() * numberOfSquares)
      }
      squares[recordPosition].classList.add('record')
      //* if recordCount is a multiple of 10...
      if (recordCount % 10 === 0) {
        //* Hotline Bling
        hotLineB()
        //* produce a random position for golden record
        goldenPosition = Math.floor(Math.random() * numberOfSquares)
        //* to prevent golden label from clashing with any other classes
        while (squares[goldenPosition].classList.contains('drake') || squares[goldenPosition].classList.contains('drake-left') || squares[goldenPosition].classList.contains('drake1') || squares[goldenPosition].classList.contains('drake2') || squares[goldenPosition].classList.contains('drake3') || squares[goldenPosition].classList.contains('record')) {
          goldenPosition = Math.floor(Math.random() * numberOfSquares)
        }
        squares[goldenPosition].classList.add('golden')
        //* DOM changes for golden record timer
        backgroundChange.style.backgroundImage = 'url("./Pictures/giphy (1).gif")'
        backgroundChange.style.backgroundSize = '200px'
        backgroundChange.style.backgroundRepeat = 'repeat'
        gameBoard.style.backgroundImage = 'url("./Pictures/backgroundchanger.gif")'
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
          hotlinePause()
          squares[goldenPosition].classList.remove('golden')
          backgroundChange.style.backgroundImage = 'url("./Pictures/88-887616_boy-if-you-dont-stop-drake-face-png.png")'
          gameBoard.style.backgroundImage = 'url("./Pictures/main-background.jpg")'
        }, timer)
      }
      growTheSnake()
    }
    //* conditions for if drake catches the golden record. Speed up and score differences.
    if (squares[drakePosition].classList.contains('golden')) {
      squares[goldenPosition].classList.remove('golden')
      hotlinePause()
      if (difficulty === 'hard') {
        scoreCount += 100
        speed -= 20
        // console.log(speed)
      } else if (difficulty === 'medium') {
        scoreCount += 60
        speed -= 25
        // console.log(speed)
      } else if (difficulty === 'easy') {
        scoreCount += 20
        speed -= 30
        // console.log(speed)
      }
      recordCount++
      clearTimeout(golden)
      backgroundChange.style.backgroundImage = 'url("./Pictures/88-887616_boy-if-you-dont-stop-drake-face-png.png")'
      gameBoard.style.backgroundImage = 'url("./Pictures/main-background.jpg")'
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
      // console.log('problem in the collision')
      //* call board clear function
      loser()
    }
  }

  function loser() {
    //* console log & audio clips
    // console.log('game over')
    hotlinePause()
    startedFromTheBottom()
    //* clear up loose ends
    clearInterval(speedChanger)
    squares[recordPosition].classList.remove('record')
    squares[goldenPosition].classList.remove('golden')
    squares[drakePosition].classList.remove('drake')
    squares[drakePosition].classList.remove('drake-left')
    drakeSnake.forEach(index => {
      squares[index].classList.remove('drake1')
      squares[index].classList.remove('drake2')
      squares[index].classList.remove('drake3')
    })
    drakeSnake = []
    drakePosition = 0
    beganGame = false
    //* events
    scorePageTwo.textContent = scoreCount
    document.querySelector('#background').style.display = 'none'
    document.querySelector('#game-over').style.display = 'flex'
  }

  function backToTheGame() {
    // console.log('clicked')
    //* reset score
    scoreCount = 0
    //* DOM manipulations
    document.querySelector('#game-over').style.display = 'none'
    muteButton.style.backgroundColor = 'white'
    document.querySelector('#background').style.display = 'flex'
    document.querySelector('.difficulty-buttons').style.display = 'flex'
    document.querySelector('.difficulty-buttons').style.marginTop = '20px'
    mainPage.style.backgroundColor = 'black'
    mainPage.style.height = '110vh'
    muteButton.style.backgroundColor = 'black'
    startedFromTheBottomPause()
  }

  function NavToScore() {
    //* DOM manipulations
    document.querySelector('#game-over').style.display = 'none'
    document.querySelector('#score-board').style.display = 'flex'
    startedFromTheBottomPause()
    document.querySelector('.your-score').style.display = 'initial'
    //* display current high score variables.
    nameLogWindow.textContent = highScoreName
    scoreThreeWindow.textContent = highScore
    //* return drake pics to original state before loading.
    document.querySelector('.drake-score-left').src = './Pictures/scoreboard-one.jpg'
    document.querySelector('.drake-score-right').src = './Pictures/scoreboardOneflipped.jpg'
  }

  function addToScoreBoard(event) {
    //* prevent refreshing on click
    event.preventDefault()
    //* change drake pics
    document.querySelector('.drake-score-left').src = './Pictures/scoreboard-2.jpg'
    document.querySelector('.drake-score-right').src = './Pictures/scoreboard2-flipped.jpg'
    //* Store name in a variable
    const nameValue = document.querySelector('#name').value
    //* Put that variable 
    const nameLog = document.querySelector('#name-log')
    const scoreThree = document.querySelector('#score-three')
    // * Condition to replace highscore
    if (scoreCount > highScore) {
      document.querySelector('.your-score').style.display = 'none'
      //* remove incumbent highscore
      localStorage.removeItem('nameLog')
      localStorage.removeItem('scoreThree')
      //* add new high score to local storage
      localStorage.setItem('nameLog', nameValue)
      localStorage.setItem('scoreThree', scoreCount)
      highScore = localStorage.getItem('scoreThree')
      highScoreName = localStorage.getItem('nameLog')
      nameLogWindow.textContent = highScoreName
      scoreThreeWindow.textContent = highScore
      yeahAudio()
    } else {
      nameLog.textContent = nameValue
      scoreThree.textContent = scoreCount
    }
  }

  function returnToMain() {
    //* reset score
    scoreCount = 0
    //* return to original page - header and instructions. 
    document.querySelector('#score-board').style.display = 'none'
    document.querySelector('#background').style.display = 'flex'
    muteButton.style.backgroundColor = 'white'
    document.querySelector('.difficulty-buttons').style.display = 'flex'
    document.querySelector('.difficulty-buttons').style.marginTop = '20px'
    document.querySelector('.game-board').style.margin = '0'
    document.querySelector('main').style.backgroundColor = 'black'
    muteButton.style.backgroundColor = 'black'
  }

  function buttonsForMedia(event) {
    //* switch statement using buttons. Same as ASDW logic.
    // console.log(event.target.value)
    switch (event.target.value) {
      case 'right':
        direction = direction === 'left' ? 'left' : 'right'
        // console.log('direction right')
        break

      case 'left':
        direction = direction === 'right' ? 'right' : 'left'
        // console.log('direction left')
        break

      case 'up':
        direction = direction === 'down' ? 'down' : 'up'
        // console.log('direction up')
        break

      case 'down':
        direction = direction === 'up' ? 'up' : 'down'
        // console.log('direction down')
        break
    }
  }

  function yeahAudio() {
    recordSounds.src = './sounds/drake_4.mp3'
    recordSounds.play()
  }

  function alrightAudio() {
    recordSounds.src = './sounds/drake_5.mp3'
    recordSounds.play()
  }

  function startedFromTheBottom() {
    allAudio.src = './sounds/started-from-the-bottom.wav'
    allAudio.play()
  }

  function startedFromTheBottomPause() {
    allAudio.src = './sounds/started-from-the-bottom.wav'
    allAudio.pause()
  }

  function hotLineB() {
    allAudio.src = './sounds/hotline-bling.mp3'
    allAudio.play()
  }

  function hotlinePause() {
    allAudio.src = './sounds/hotline-bling.mp3'
    allAudio.pause()
  }

  function muteAudio() {
    // console.log('clicked')
    const mute = document.querySelector('.mute-button-class')
    if (allAudio.muted === true) {
      allAudio.muted = false
      recordSounds.muted = false
      mute.classList.remove('muted')
      mute.textContent = 'Mute'
    } else {
      allAudio.muted = true
      recordSounds.muted = true
      mute.classList.add('muted')
      mute.textContent = 'Muted'
    }
  }

  //* CALLING CREATE BOARD FUNCTION
  createTheBoard(drakePosition)

  //* Event Listeners
  NavToScoreBoard.addEventListener('click', NavToScore)
  backToGame.addEventListener('click', backToTheGame)
  buttonsAll.addEventListener('click', playTheGame)
  document.addEventListener('keyup', moving)
  addScore.addEventListener('submit', addToScoreBoard)
  returnToMp.addEventListener('click', returnToMain)
  buttonsForMediaQ.addEventListener('click', buttonsForMedia)
  muteButton.addEventListener('click', muteAudio)
}

window.addEventListener('DOMContentLoaded', init)