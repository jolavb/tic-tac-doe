const api = require('./api')
const store = require('./../store')
const logic = require('./logic')
const multiplayer = require('./multiplayer')

const signUpSuccess = function (response) {
  changeForm('#sign-in')
}

const signUpFail = function () {
  ErrorMessage('Invalid Registration')
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
  store.user.isUserX = true
  changeForm($('.startgame'), true)
  $('.player-name').text(store.user.email)
  api.getGames()
    .then(getGameSuccess)
    .catch(getGameFail)
}

const signInFail = function () {
  ErrorMessage('Please Enter a Valid Email and Password')
}

const changePassSuccess = function (response) {
  changeForm('#sign-in')
}

const changePassFail = function () {
  ErrorMessage('Please Enter a Valid New Password')
}

const signoutSuccess = function (response) {
  clearBoard()
  $('table').hide()
  changeForm('#sign-in', true)
}

const signoutFail = function (response) {
  ErrorMessage('Error Signing Out!')
}

const updateGameSuccess = function (response) {
  store.game = response.game
  if (store.game.over !== true) {
    const winner = logic.checkWin(store.game.cells)
    const events = require('./events')
    if (winner) {
      if (winner === 'x') {
        $('#gameMessage-legend').html('<p>You Win Whoo Hoo!!</p>')
        $('#gameImage').attr('src', 'https://vignette.wikia.nocookie.net/simpsons/images/0/04/Dancin_homer.png/revision/latest?cb=20100131213740')
      } else if (winner === 'o') {
        $('#gameMessage-legend').html('<p>DOH! You Lose</p>')
        $('#gameImage').attr('src', 'https://i.pinimg.com/originals/3a/11/68/3a116884945f870924f1ffd3f36fc015.jpg')
      } else if (winner === 'noone') {
        $('#gameMessage-legend').html('<p>You\'re all losers!!</p>')
        $('#gameImage').attr('src', 'http://www.officialpsds.com/images/thumbs/The-Simpsons-Mr-Burns-psd72388.png')
      }
      flashWinner(winner)
      events.onWin()
      api.getGames()
        .then(getGameSuccess)
        .catch(getGameFail)
    }
  }
}

const updateGameFail = function () {
  ErrorMessage('Error updating game!')
}

const flashWinner = (winner) => {
  if (winner !== 'noone') {
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
  } else {
    clearBoard()
    changeForm('.message')
  }
}

const updateBoard = function () {
  logic.playerSwitch()
  $(store.turnInfo.selected).html('<img src=' + store.turnInfo.image + ' class = played-image>')
}

const getGameSuccess = function (response) {
  store.games = response.games
  const stats = logic.calcStats()
  const total = stats.oWins + stats.xWins
  const wonPercent = (stats.oWins / total) * 100
  const lostPercent = 100 - wonPercent
  $('.bar-won').html('<p>' + stats.oWins + '</p>')
  $('.bar-lost').html('<p>' + stats.xWins + '</p>')
  $('.bar-total').html('<p>' + store.games.length + '</p>')
  $('.bar-won').css('height', wonPercent + '%')
  $('.bar-lost').css('height', lostPercent + '%')
  $('table').show(500)
}

const getGameFail = function () {
  ErrorMessage('Error loading previous games!')
}

const ErrorMessage = function (error) {
  $('.error-message').text(error)
  $('.error-box').toggleClass('hidden')
}

const newGameSuccess = function (response) {
  clearBoard()
  store.game = response.game
  store.watchGame = api.watchGame(store.game.id)
  store.watchGame.on('change', multiplayer.onGameChange)
  $('.game-id').text(store.game.id)
  $('.turnH3').toggleClass('hidden')
  $('#turn').text('X')
}

const newGameFail = function () {
  ErrorMessage('Failed to Create Game!')
}

const joinGameSuccess = function (response) {
  $('.player-id').text('O')
  changeForm(false, true)
  const id = $('#game-id').val()
  store.watchGame = api.watchGame(id)
  store.watchGame.on('change', multiplayer.onGameChange)
  store.game = response.game
  store.user.isUserX = false
  $('.turnH3').toggleClass('hidden')
  $('#turn').text('X')
  $('.game-id').text(id)
}

const joinGameFail = function () {
  ErrorMessage('Failed to Join Game')
}
//
// const onGameChange = function (data) {
//   console.log(data)
//   if (data.game) {
//     if (data.game.hasOwnProperty('player_o_id')) {
//       showTurn(true)
//     }
//
//     if (data.game.over) {
//       console.log('over')
//     } else if (data.game && data.game.cells) {
//       const diff = changes => {
//         const before = changes[0]
//         const after = changes[1]
//         for (let i = 0; i < after.length; i++) {
//           if (before[i] !== after[i]) {
//             return {
//               index: i,
//               value: after[i]
//             }
//           }
//         }
//         return { index: -1, value: '' }
//       }
//       const cell = diff(data.game.cells)
//       logic.playerSwitch()
//       $('[id=' + cell.index + ']').html('<img src=' + store.turnInfo.image + ' class = played-image>')
//     } else if (data.timeout) {
//       store.watchGame.close()
//     }
//   }
// }

const clearBoard = function () {
  $('.cell').html('')
  $('.col').removeClass('wins')
  $('.col').removeClass('winnner')
  store.turnInfo.player_x = true
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
  changeForm,
  joinGameSuccess,
  joinGameFail,
  ErrorMessage
}
