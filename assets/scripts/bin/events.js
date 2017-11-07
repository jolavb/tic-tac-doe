const getFormFields = require('./../../../lib/get-form-fields')
const api = require('./api.js')
const ui = require('./ui.js')
const store = require('./../store')
const logic = require('./logic')

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
  ui.changeForm()
  api.newGame()
    .then(ui.newGameSuccess)
    .catch(ui.newGameFail)
}

const onPlay = function () {
  if (logic.checkOccupied(this) && !store.game.over) {
    store.turnInfo.selected = $(this)
    ui.updateBoard()
    api.updateGame('false')
      .then(ui.updateGameSuccess)
      .catch(ui.updateGameFail)
  }
}

const onWin = function () {
  api.updateGame('true')
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
  ui.changeForm('#change-password', true)
  console.log('events')
}

const displayMultiPlayer = () => {
  ui.changeForm('#Multi-Player-form', true)
}

const onJoinGame = (event) => {
  event.preventDefault()
  const id = $('#game-id').val()
  console.log(id)
  api.joinGame(id)
    .then(ui.joinGameSuccess)
    .catch(ui.joinGameFail)
}

const Cancel = () => {
  if (store.game) {
    ui.changeForm(false, true)
  } else {
    ui.changeForm('.startgame', true)
  }
}

const back = function () {
  ui.changeForm('#sign-in')
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
  Cancel,
  onWin,
<<<<<<< HEAD
  displayMultiPlayer,
  onJoinGame
=======
  back
>>>>>>> js
}
