'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const events = require('./bin/events')
const store = require('./store')

$(() => {
  setAPIOrigin(location, config)
  $('#registration').on('submit', events.onRegistration)
  $('#sign-in').on('submit', events.onSignIn)
  $('#change-password').on('submit', events.onChangePassword)
  $('.signout').on('click', events.onSignout)
  $('.newGame').on('click', events.onNewGame)
  $('.cell').on('click', events.onPlay)
  $('#errorBtn').on('click', events.toggleErr)
  $('#register-link').on('click', events.goToRegistration)
  $('#displayChangePass').on('click', events.displayPassChange)
  $('.cancel').on('click', events.Cancel)
  $('#displayMulti').on('click', events.displayMultiPlayer)
  $('#Multi-Player-form').on('submit', events.onJoinGame)
})
