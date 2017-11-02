const config = require('../config.js')
const store = require('./../store')

const signUp = function (data) {
  data = JSON.stringify(data)
  return $.ajax({
    method: 'POST',
    url: config.apiOrigin + '/sign-up',
    contentType: 'application/json',
    data
  })
}

const signIn = function (data) {
  data = JSON.stringify(data)
  return $.ajax({
    method: 'POST',
    url: config.apiOrigin + '/sign-in',
    contentType: 'application/json',
    data
  })
}

const changePassword = function (data) {
  data = JSON.stringify(data)
  return $.ajax({
    method: 'PATCH',
    url: config.apiOrigin + '/change-password/' + store.user.id,
    contentType: 'application/json',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const signout = function () {
  return $.ajax({
    method: 'DELETE',
    url: config.apiOrigin + '/sign-out/' + store.user.id,
    contentType: 'application/json',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const newGame = function () {
  const data = {}
  return $.ajax({
    method: 'POST',
    url: config.apiOrigin + '/games',
    contentType: 'application/json',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const updateGame = function (index, value) {
  let data = {
    'game': {
      'cell': {
        'index': index,
        'value': value
      },
      'over': false
    }
  }

  data = JSON.stringify(data)

  return $.ajax({
    method: 'PATCH',
    url: config.apiOrigin + '/games/' + store.game.id,
    contentType: 'application/json',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

module.exports = {
  signUp,
  signIn,
  changePassword,
  signout,
  newGame,
  updateGame
}
