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
  $('.form-toggle').on('click', events.onFormToggle)
})
