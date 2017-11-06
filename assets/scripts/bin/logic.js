const store = require('./../store')

const playerSwitch = function () {
  const turnInfo = store.turnInfo

  if (turnInfo.player_x === true) {
    turnInfo.image = 'https://i.imgur.com/rq7dJ2L.jpg'
    turnInfo.value = 'o'
    turnInfo.player_x = false
  } else {
    turnInfo.image = 'https://i.imgur.com/2f8cJVF.jpg'
    turnInfo.value = 'x'
    turnInfo.player_x = true
  }
}

const winCombos = {
  horizontal: [[0, 1, 2], [3, 4, 5], [6, 7, 8]],
  vertical: [[0, 3, 6], [1, 4, 7], [2, 5, 8]],
  diaganal: [[0, 4, 8], [2, 4, 6]]
}

const BuildChecks = function (game) {
  const checks = {
    isX: function (element) { return game[element] === 'x' },
    isO: function (element) { return game[element] === 'o' }
  }
  return checks
}

const checkWin = function (game) {
  let winner
  const checks = BuildChecks(game)
  for (const comboList in winCombos) {
    winCombos[comboList].forEach((combo) => {
      if (combo.every(checks.isX)) {
        winner = 'x'
        store.WinningCombo = combo
      }
      if (combo.every(checks.isO)) {
        winner = 'o'
        store.WinningCombo = combo
      }
    })
  }
  return winner
}

const calcStats = () => {
  const winners = {
    xWins: 0,
    oWins: 0,
    noWin: 0
  }
  const games = store.games
  games.forEach(function (game) {
    const winner = checkWin(game.cells)
    if (winner === 'x') {
      winners.xWins++
    } else if (winner === 'o') {
      winners.oWins++
    } else {
      winners.noWin++
    }
  })
  return winners
}

const checkOccupied = function (selected) {
  if ($(selected).css('background-image') !== 'none') {
    return true
  }
}

module.exports = {
  playerSwitch,
  checkWin,
  calcStats,
  checkOccupied
}
