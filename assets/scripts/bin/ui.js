const api = require('./api')
const store = require('./../store')
const logic = require('./logic')

const signUpSuccess = function (response) {
  $('#registration').toggleClass('hidden')
  $('#sign-in').toggleClass('hidden')
}

const signUpFail = function (error) {
  $('.error-message').html('<p> Invalid Registration </p>')
  $('.error-box').toggleClass('hidden')
  console.log(error)
}

const signInSuccess = function (response) {
  store.user = response.user
  $('.overlay').toggleClass('hidden')
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
  $('#sign-in, .overlay, #change-password').toggleClass('hidden')
}

const changePassFail = function (error) {
  $('.error-message').html('<p> Please Enter a Valid New Password</p>')
  $('.error-box').toggleClass('hidden')
  console.log(error)
}

const signoutSuccess = function (response) {
  $('.overlay').toggleClass('hidden')
}

const signoutFail = function (response) {
  console.log(response)
}

const newGameSuccess = function (response) {
  store.game = response.game
  console.log(response)
  api.getGames()
    .then(getGameSuccess)
    .catch(getGameFail)
}

const newGameFail = function (error) {
  console.log(error)
}

const updateGameSuccess = function (response) {
  store.game = response.game
  if (store.game.over !== true) {
    const winner = logic.checkWin()
    const events = require('./events')
    if (winner) {
      if (winner === 'x') {
        $('#gameMessage').append('<p>Player X wins the game</p>')
      } else if (winner === 'o') {
        $('#gameMessage').append('<p>Player X wins the game</p>')
      }
      $('.gameresults').toggleClass('hidden')
      events.onWin()
    }
  }
}

const updateBoard = function () {
  logic.playerSwitch()
  $(store.turnInfo.selected).css('background-image', 'url(' + store.turnInfo.image + ')')
}

const updateGameFail = function (error) {
  console.log(error)
}

const getGameSuccess = function (response) {
  store.games = response.games
  $('#total-games').text(store.games.length)
}

const getGameFail = function (error) {
  console.log(error)
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
  getGameFail
}
