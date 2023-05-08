import { combineReducers } from 'redux';

import eventsReducer from './eventsReducer';
import feedbackReducer from './feedbackReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    events: eventsReducer,
    feedback: feedbackReducer,
    user: userReducer
})

export default rootReducer