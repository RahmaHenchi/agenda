import axios from 'axios';

import { alertSuccess } from '../../utils/feedback';
import { LOGIN, LOGOUT } from '../types/userTypes';

import { requestFailed, requestStarted, requestSucceeded } from './feedbackActionCreators';

export const login = (user, token) => ({ type: LOGIN, payload: { user, token } });

export const logoutUser = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    return { type: LOGOUT }
};

export const requestLogin = (email, password, history) => {
    return async (dispatch) => {
        dispatch(requestStarted())
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { email, password })
            dispatch(requestSucceeded())
            const { message, token, user } = res.data
            alertSuccess(message)
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            dispatch(login(user, token))
            history.push('/events')
        } catch (err) {
            dispatch(requestFailed(err))
        }
    }
}

export const requestRegister = ({ userName, email, password }, history) => {
    return async (dispatch) => {
        dispatch(requestStarted())
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, { userName, email, password })
            console.log({ res });
            dispatch(requestSucceeded())
            if (res.data.message) {
                alertSuccess(res.data.message)
            }
            history.push('/login')
        } catch (err) {
            dispatch(requestFailed(err))
        }
    }
}