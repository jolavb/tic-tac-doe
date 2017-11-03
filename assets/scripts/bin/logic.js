const store = require('./../store')
const winner =

const playerSwitch = function () {
  const turnInfo = store.turnInfo

  if (turnInfo.player_x === true) {
    turnInfo.image = 'assets/images/donut.jpg'
    turnInfo.value = 0
    turnInfo.player_x = false
  } else {
    turnInfo.image = 'assets/images/rods.jpg'
    turnInfo.value = 1
    turnInfo.player_x = true
  }
}

const checkWin = function (callback) {
  if(callback)
}

const getSum = (total, num) {
  return total + num
}





module.exports = {
  playerSwitch,
  checkWin
}
