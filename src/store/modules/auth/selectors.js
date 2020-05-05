const isLoggedIn = state => state.auth.isLoggedIn
const isLoaded = state => state.auth.isLoaded
const getToken = state => state.auth.token
const getError = state => state.auth.error

export {isLoggedIn, getToken, isLoaded, getError}