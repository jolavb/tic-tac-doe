'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const events = require('./bin/events')

$(() => {
  setAPIOrigin(location, config)
  $('#registration').on('submit', events.onRegistration)
  $('#sign-in').on('submit', events.onSignIn)
  $('#change-password').on('submit', events.onChangePassword)
  $('#signout').on('click', events.onSignout)
  $('#newgame').on('click', events.onNewGame)
  $('.cell').on('click', events.onPlay)
  $('#register-link').on('click', events.onRegisterDirect)
  $('.form-toggle').on('click', events.onFormToggle)
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
