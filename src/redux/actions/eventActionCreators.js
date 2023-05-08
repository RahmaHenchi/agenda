import axios from 'axios';
import { alertSuccess } from '../../utils/feedback';

import {
    SET_ALL_EVENTS,
    SELECT_EVENT,
    REMOVE_EVENT,
    UPDATE_EVENT,
    ADD_EVENT
} from '../types/eventsTypes';
import { requestFailed, requestStarted, requestSucceeded } from './feedbackActionCreators';


export const setAllEvents = (events) => ({ type: SET_ALL_EVENTS, payload: events });

export const selectEvent = (event) => ({ type: SELECT_EVENT, payload: event });

export const removeEvent = (eventId) => ({ type: REMOVE_EVENT, payload: eventId });

export const updateEvent = (eventId, data) => ({ type: UPDATE_EVENT, payload: { id: eventId, data } });

export const addEvent = (event) => ({ type: ADD_EVENT, payload: event });


export const fetchAllEvents = (userId) => {
    return async (dispatch, getState) => {
        const state = getState()
        const token = state.user.token
        dispatch(requestStarted())
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/events/${userId}`, { headers: { authorization: token } })
            dispatch(requestSucceeded())
            const events = res.data
            dispatch(setAllEvents(events))
        } catch (error) {
            console.log({ error });
            dispatch(requestFailed(error))
        }
    }
}

export const requestCreatingEvent = (data, history) => {
    return async (dispatch, getState) => {
        const state = getState()
        const token = state.user.token
            dispatch(requestStarted())
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/events`, data, { headers: { authorization: token } })
            dispatch(requestSucceeded())
            if (res.data && res.data.message) {
                alertSuccess(res.data.message)
            }
            if (res.data && res.data.event && res.data.event._id) {
                dispatch(addEvent({ ...data, _id: res.data.event._id }))
                history.push('/events')
            }
        } catch (err) {
            dispatch(requestFailed(err))
        }
    }
}

export const fetchEventById = (id) => {
    return async (dispatch, getState) => {
        const state = getState()
        const token = state.user.token
        dispatch(requestStarted())
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/events/event/${id}`, { headers: { authorization: token } })
            dispatch(requestSucceeded())
            const event = res.data
            console.log(event)
            event.start = new Date(event.start).toISOString().substring(0, 16)
            event.end = new Date(event.end).toISOString().substring(0, 16)
            dispatch(selectEvent(event))
        } catch (error) {
            dispatch(requestFailed(error))
        }
    }
}

export const requestUpdatingEvent = (id, data, history) => {
    return async (dispatch, getState) => {
        const state = getState()
        const token = state.user.token
        dispatch(requestStarted())
        try {
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/events/${id}`, data, { headers: { authorization: token } })
            dispatch(requestSucceeded())
            if (res.data && res.data.message) {
                alertSuccess(res.data.message)
                history.push('/events')
            }
            dispatch(updateEvent(id, data))
        } catch (err) {
            dispatch(requestFailed(err))
        }
    }
}

export const requestDeletingEvent = (eventId, closeModal) => {
    return async (dispatch, getState) => {
        const state = getState()
        const token = state.user.token
        dispatch(requestStarted())
        try {
            const res = await axios.delete(`${process.env.REACT_APP_API_URL}/events/${eventId}`, { headers: { authorization: token } })
            dispatch(requestSucceeded())
            if (res.data && res.data.message) {
                alertSuccess(res.data.message)
            }
            dispatch(removeEvent(eventId))
            closeModal()
        } catch (err) {
            dispatch(requestFailed(err))
        }
    }
}