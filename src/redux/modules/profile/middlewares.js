import {fetchProfile, fetchProfileSuccess, fetchProfileFailure} from './actions'

export const fetchProfileMiddleware = store => next => action => {
    if(action.type === fetchProfile.toString()){
        fetch('https://loft-taxi.glitch.me/card', {method: 'POST', body: JSON.stringify({...action.payload, token: store.getState().auth.token})})
        .then(resp=>resp.json())
        .then(data => {
            if(data.success === true){
                store.dispatch(fetchProfileSuccess(action.payload))
            } else {
                store.dispatch(fetchProfileFailure(data.error))
            }
            
        })
        .catch(() => {
            store.dispatch(fetchProfileFailure('Error!!'))
        })
    }
    return next(action)
  }