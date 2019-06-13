import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import common from './common';
import home from './home';
import area from './area';
import project from './project';

const rootReducer = combineReducers({
    common,
    home,
    area,
    project,
    routing: routerReducer,
});

export default rootReducer;
