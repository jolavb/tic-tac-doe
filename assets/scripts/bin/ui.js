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
  $('#overlay').css('display', 'none')
  $('.player-name').text(store.user.email)
}

const signInFail = function (error) {
  $('.error-message').html('<p> Please Enter a Valid Email and Password</p>')
  $('.error-box').toggleClass('hidden')
  console.log(error)
}

const changePassSuccess = function (response) {
  console.log(response)
}

const changePassFail = function (error) {
  console.log(error)
}

const signoutSuccess = function (response) {
  console.log(response)
}

const signoutFail = function (response) {
  console.log(response)
}

const newGameSuccess = function (response) {
  store.game = response.game
  console.log(response)
}

const newGameFail = function (error) {
  console.log(error)
}

const updateGameSuccess = function (response) {
  store.game = response.game
  logic.checkWin()
  console.log(store.game)
}

const updateBoard = function () {
  logic.playerSwitch()
  $(store.turnInfo.selected).css('background-image', 'url(' + store.turnInfo.image + ')')
}

const updateGameFail = function (error) {
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
  updateBoard
}
