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
  changeForm('#sign-in', true)
}

const signoutFail = function (response) {
  console.log(response)
}

const newGameSuccess = function (response) {
  clearBoard()
  store.game = response.game
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
    const target = $('.game-board').children()[element]
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
  $(store.turnInfo.selected).css('background-image', 'url(' + store.turnInfo.image + ')')
}

const getGameSuccess = function (response) {
  store.games = response.games
  const stats = logic.calcStats()
  $('#games-won').text(stats.oWins)
  $('#games-lost').text(stats.xWins)
  $('#total-games').text(store.games.length)
}

const getGameFail = function (error) {
  console.log(error)
}

const clearBoard = function () {
  $('.col').css('background-image', '')
  $('.col').removeClass('wins')
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
  changeForm
}
