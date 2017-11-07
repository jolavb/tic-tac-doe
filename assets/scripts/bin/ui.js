const api = require('./api')
const store = require('./../store')
const logic = require('./logic')

const signUpSuccess = function (response) {
  changeForm('#sign-in')
}

const signUpFail = function (error) {
  $('.error-message').html('<p> Invalid Registration </p>')
  $('.error-box').toggleClass('hidden')
  console.log(error)
}

const changeForm = function (form, overlay) {
  $('.overlay-form').each((index, obj) => {
    if (!$(obj).hasClass('hidden')) {
      $(obj).toggleClass('hidden')
    }
  })
  if (form) {
    $(form).toggleClass('hidden')
  }
  if (overlay) {
    $('.overlay').toggleClass('hidden')
  }
}

const signInSuccess = function (response) {
  store.user = response.user
  changeForm($('.startgame'), true)
  $('.player-name').text(store.user.email)
  api.getGames()
    .then(getGameSuccess)
    .catch(getGameFail)
}

const signInFail = function (error) {
  $('.error-message').html('<p> Please Enter a Valid Email and Password</p>')
  $('.error-box').toggleClass('hidden')
  console.log(error)
}

const changePassSuccess = function (response) {
  changeForm('#sign-in')
}

const changePassFail = function (error) {
  $('.error-message').html('<p> Please Enter a Valid New Password</p>')
  $('.error-box').toggleClass('hidden')
  console.log(error)
}

const signoutSuccess = function (response) {
  clearBoard()
  $('table').hide()
  changeForm('#sign-in', true)
}

const signoutFail = function (response) {
  console.log(response)
}

const newGameSuccess = function (response) {
  clearBoard()
  store.game = response.game
  store.watchGame = api.watchGame(store.game.id)
  store.watchGame.on('change', onGameChange)
  console.log(store.game.id)
}

const newGameFail = function (error) {
  console.log(error)
}

const updateGameSuccess = function (response) {
  store.game = response.game
  if (store.game.over !== true) {
    const winner = logic.checkWin(store.game.cells)
    const events = require('./events')
    if (winner) {
      flashWinner(winner)
      if (winner === 'x') {
        $('#gameMessage').html('<p>Player X wins the game</p>')
      } else if (winner === 'o') {
        $('#gameMessage').html('<p>Player O wins the game</p>')
      }
      events.onWin()
      api.getGames()
        .then(getGameSuccess)
        .catch(getGameFail)
    }
  }
}

const updateGameFail = function (error) {
  console.log(error)
}

const flashWinner = (winner) => {
  store.WinningCombo.forEach(function (element) {
    console.log(element)
    const target = $('.game-board').children()[element].firstElementChild
    $(target).addClass('wins')
  })

  const flash = setInterval(() => {
    $('.' + 'wins').toggleClass('winner')
  }, 200)

  setTimeout(() => {
    clearInterval(flash)
    clearBoard()
    changeForm('.message')
  }, 2000)
}

const updateBoard = function () {
  logic.playerSwitch()
  $(store.turnInfo.selected).html('<img src=' + store.turnInfo.image + ' class = played-image>')
}

const getGameSuccess = function (response) {
  store.games = response.games
  const stats = logic.calcStats()
  const total = stats.oWins + stats.xWins
  const wonPercent = (stats.oWins / total) * 100
  const lostPercent = 100 - wonPercent
  $('.bar-won').html('<p>' + stats.oWins + '</p>')
  $('.bar-lost').html('<p>' + stats.xWins + '</p>')
  $('.bar-total').html('<p>' + store.games.length + '</p>')
  $('.bar-won').css('height', wonPercent + '%')
  $('.bar-lost').css('height', lostPercent + '%')
  $('table').show(500)
}

const getGameFail = function (error) {
  console.log(error)
}

const joinGameSuccess = function (response) {
  changeForm(false, true)
  const id = $('#game-id').val()
  store.watchGame = api.watchGame(id)
  store.watchGame.on('change', onGameChange)
  store.game = response.game
}

const joinGameFail = function (error) {
  console.log(error)
}

const onGameChange = function (data) {
  console.log(data)
  if (data.game && data.game.cells) {
    const diff = changes => {
      const before = changes[0]
      const after = changes[1]
      for (let i = 0; i < after.length; i++) {
        if (before[i] !== after[i]) {
          return {
            index: i,
            value: after[i]
          }
        }
      }

      return { index: -1, value: '' }
    }

    const cell = diff(data.game.cells)
    // const boardCell = $('.game-board').children()[cell.index]

    let img = ''
    if (cell.value === 'x') {
      img = 'https://i.imgur.com/2f8cJVF.jpg'
    } else {
      img = 'https://i.imgur.com/rq7dJ2L.jpg'
    }
    $('[id=' + cell.index + ']').html('<img src=' + img + ' class = played-image>')

    console.log(cell)
  } else if (data.timeout) {
    store.watchGame.close()
  }
}

const clearBoard = function () {
  $('.cell').html('')
  $('.col').removeClass('wins')
  $('.col').removeClass('winnner')
}

module.exports = {
  signUpSuccess,
  signUpFail,
  signInSuccess,
  signInFail,
  changePassSuccess,
  changePassFail,
  signoutSuccess,
  signoutFail,
  newGameSuccess,
  newGameFail,
  updateGameSuccess,
  updateGameFail,
  updateBoard,
  getGameSuccess,
  getGameFail,
  clearBoard,
  changeForm,
  joinGameSuccess,
  joinGameFail
}
