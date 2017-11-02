const getFormFields = require('./../../../lib/get-form-fields')
const api = require('./api.js')
const ui = require('./ui.js')

const onRegistration = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFail)
}

const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFail)
}

const onChangePassword = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.changePassword(data)
    .then(ui.changePassSuccess)
    .catch(ui.changePassFail)
}

module.exports = {
  onRegistration,
  onSignIn,
  onChangePassword
}
