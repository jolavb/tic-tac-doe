const store = require('./../store')

const signUpSuccess = function (response) {
  console.log(response)
}

const signUpFail = function (error) {
  console.log(error)
}

const signInSuccess = function (response) {
  store.user = response.user
  console.log(store.user)
}

const signInFail = function (error) {
  console.log(error)
}

const changePassSuccess = function (response) {
  console.log(response)
}

const changePassFail = function (error) {
  console.log(error)
}

module.exports = {
  signUpSuccess,
  signUpFail,
  signInSuccess,
  signInFail,
  changePassSuccess,
  changePassFail
}
