const store = require('./../store')
const logic = require('./logic')

const signUpSuccess = function (response) {
  console.log(response)
}

const signUpFail = function (error) {
  console.log(error)
}

const signInSuccess = function (response) {
  store.user = response.user
  console.log(store.user.email)
  $('.player-name').text(store.user.email)
}

const signInFail = function (error) {
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
  logic.playerSwitch()
  console.log(store.game)
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
  updateGameFail
}
