const ui = require('./ui')
const logic = require('./logic')
const store = require('./../store')

const onGameChange = function (data) {
  console.log(data)
  if (data.game) {
    if (data.game.hasOwnProperty('player_o_id')) {
      store.multiplayer = true
    }

    if (store.multiplayer) {
      if (data.game.over) {
        console.log('over')
      } else if (data.game && data.game.cells) {
        const diff = changes => {
          const before = changes[0]
          const after = changes[1]
          for (let i = 0; i < after.length; i++) {
            if (before[i] !== after[i]) {
              return {
                index: i,
                value: after[i]
              }
            }
          }
          return { index: -1, value: '' }
        }
        const cell = diff(data.game.cells)
        logic.playerSwitch()
        $('[id=' + cell.index + ']').html('<img src=' + store.turnInfo.image + ' class = played-image>')
      } else if (data.timeout) {
        store.watchGame.close()
      }
    }
  }
  console.log(store)
}

module.exports = {
  onGameChange
}
