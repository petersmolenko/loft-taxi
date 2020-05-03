import {createAction} from 'redux-actions'
export const loggedIn = createAction('loft-taxi/auth/LOGGED_IN')
export const signUp = createAction('loft-taxi/auth/SIGN_UP')
export const clearErrors = createAction('loft-taxi/auth/CLEAR_ERRORS')
export const loggedInSuccess = createAction('loft-taxi/auth/LOGGED_IN_SUCCESS')
export const loggedInFailure = createAction('loft-taxi/auth/LOGGED_IN_FAILURE')
export const loggedOut = createAction('loft-taxi/auth/LOGGED_OUT')