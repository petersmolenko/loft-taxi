import {createAction} from 'redux-actions'
export const fetchProfile = createAction('loft-taxi/auth/FETCH_PROFILE')
export const fetchProfileSuccess = createAction('loft-taxi/auth/FETCH_PROFILE_SUCCESS')
export const fetchProfileFailure = createAction('loft-taxi/auth/FETCH_PROFILE_FAILURE')