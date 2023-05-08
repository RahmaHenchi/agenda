import {
    SET_ALL_EVENTS,
    SELECT_EVENT,
    REMOVE_EVENT,
    UPDATE_EVENT,
    ADD_EVENT
} from '../types/eventsTypes';

const initialState = {
    all: [],
    selected: null
};

const eventsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALL_EVENTS:
            return { ...state, all: action.payload };
        case SELECT_EVENT:
            return { ...state, selected: action.payload };
        case REMOVE_EVENT:
            return { ...state, all: state.all.filter(event => event._id !== action.payload) };
        case UPDATE_EVENT:
            return { ...state, all: state.all.map(event => event._id === action.payload.id ? { ...event, ...action.payload.data } : event) };
        case ADD_EVENT:
            return { ...state, all: [...state.all, action.payload] };
        default:
            return state;
    }
}

export default eventsReducer