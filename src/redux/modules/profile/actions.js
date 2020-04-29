import {createAction} from 'redux-actions'
export const putProfile = createAction('loft-taxi/auth/PUT_PROFILE')
export const putProfileSuccess = createAction('loft-taxi/auth/PUT_PROFILE_SUCCESS')
export const putProfileFailure = createAction('loft-taxi/auth/PUT_PROFILE_FAILURE')
export const fetchProfile = createAction('loft-taxi/auth/FETCH_PROFILE')
export const fetchProfileSuccess = createAction('loft-taxi/auth/FETCH_PROFILE_SUCCESS')
export const fetchProfileFailure = createAction('loft-taxi/auth/FETCH_PROFILE_FAILURE')