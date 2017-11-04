const store = require('./../store')

const playerSwitch = function () {
  const turnInfo = store.turnInfo

  if (turnInfo.player_x === true) {
    turnInfo.image = 'assets/images/donut.jpg'
    turnInfo.value = 'o'
    turnInfo.player_x = false
  } else {
    turnInfo.image = 'assets/images/rods.jpg'
    turnInfo.value = 'x'
    turnInfo.player_x = true
  }
}

const winCombos = {
  horizontal: [[0, 1, 2], [3, 4, 5], [6, 7, 8]],
  vertical: [[0, 3, 6], [1, 4, 7], [2, 5, 8]],
  diaganal: [[0, 4, 8], [2, 4, 6]]
}

const isX = (element) => store.game.cells[element] === 'x'
const isO = (element) => store.game.cells[element] === 'o'

const checkWin = function () {
  let winner
  for (const comboList in winCombos) {
    winCombos[comboList].forEach((combo) => {
      if (combo.every(isX)) {
        winner = 'x'
      }
      if (combo.every(isO)) {
        winner = 'o'
      }
    })
  }
  return winner
}

const checkOccupied = function (selected) {
  if ($(selected).css('background-image') !== 'none') {
    return true
  }
}

const calcStats = () => {

}

module.exports = {
  playerSwitch,
  checkWin,
  calcStats,
  checkOccupied
}
