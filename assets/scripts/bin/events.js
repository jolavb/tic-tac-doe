const getFormFields = require('./../../../lib/get-form-fields')
const api = require('./api.js')
const ui = require('./ui.js')
const logic = require('./logic.js')
const store = require('./../store')

const onRegistration = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFail)
}

const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFail)
}

const onChangePassword = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.changePassword(data)
    .then(ui.changePassSuccess)
    .catch(ui.changePassFail)
}

const onSignout = function (event) {
  event.preventDefault()
  api.signout()
    .then(ui.signoutSuccess)
    .catch(ui.sigsnoutFail)
}

const onNewGame = function (event) {
  event.preventDefault()
  api.newGame()
    .then(ui.newGameSuccess)
    .catch(ui.newGameFail)
  api.getGames()
    .then(ui.getGameSuccess)
    .catch(ui.getGameFail)
}

const onPlay = function () {
  store.turnInfo.selected = $(this)
  ui.updateBoard()
  api.updateGame()
    .then(ui.updateGameSuccess)
    .catch(ui.updateGameFail)
}

const toggleErr = function () {
  $(this).parent().toggleClass('hidden')
}

const goToRegistration = function () {
  $(this).parent().toggleClass('hidden')
  $('#registration').toggleClass('hidden')
}

const displayPassChange = function () {
  $('#sign-in, #overlay, #change-password').toggleClass('hidden')
}

const Cancel = () => {
  $('#sign-in, #overlay, #change-password').toggleClass('hidden')
}

module.exports = {
  onRegistration,
  onSignIn,
  onChangePassword,
  onSignout,
  onNewGame,
  onPlay,
  toggleErr,
  goToRegistration,
  displayPassChange,
  Cancel
}
