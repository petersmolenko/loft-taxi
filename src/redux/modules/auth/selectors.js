const isLoggedIn = state => state.auth.isLoggedIn
const getToken = state => state.auth.token

export {isLoggedIn, getToken}