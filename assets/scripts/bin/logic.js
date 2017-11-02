const store = require('./../store')

const playerSwitch = function () {
  const turnInfo = store.turnInfo

  if (turnInfo.player_x === true) {
    turnInfo.image = '../../images/donut.jpg'
    turnInfo.value = 0
    turnInfo.player_x = false
  } else {
    turnInfo.image = '../../images/donut.jpg'
    turnInfo.value = 1
    turnInfo.player_x = true
  }
}

module.exports = {
  playerSwitch
}
