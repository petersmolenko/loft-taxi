import { API_URL } from "./constants";
import qs from 'qs';

const postApi = async (action, postData) => {
    const resp = await fetch(`${API_URL}/${action}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(postData),
    });

    return await resp.json();
}

const getApi = async (action, getData={}) => {
    // const params = Object.entries(getData).reduce((acc, item, i, arr)=>acc + `${item[0]}=${item[1]}`+((i!==arr.length-1)?'&':''), '');
    const params = qs.stringify(getData);
    const resp = await fetch(`${API_URL}/${action}?${params}`)
    return await resp.json()
}

const auth = async (authData) => await postApi('auth', authData);
const register = async (registerData) => await postApi('register', registerData);
const putProfile = async (profileData) => await postApi('card', profileData);
const fetchProfile = async (profileData) => await getApi('card', profileData);
const getAddressList = async () => await getApi('addressList');
const getRoute = async (routeData) => await getApi('route', routeData);

export {auth, register, putProfile, fetchProfile, getAddressList, getRoute}
