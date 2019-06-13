import { HOME } from '../constants/action-type';

const initialState = {
    initialProjList: [],
    currentProjList: [],
    dueTaskList: [],
    offset: 3,
    show_full: false,
    context: 'home',
    initial_len: 0,
};

export default function homeReducer(state = initialState, action = {}) {
    switch (action.type) {
        case HOME.TASKS_LOAD:
            console.log('TASKS_LOAD reducer fired', state, action);
            return Object.assign({}, state, {
                initialProjList: action.taskList,
                currentProjList: action.taskList,
                dueTaskList: action.dueList,
                show_full: false,
                initial_len: action.taskList.length,
            });
        case HOME.DUE_TASKS_LOAD:
            console.log('DUE_TASKS_LOAD reducer fired', state, action);
            return Object.assign({}, state, {
                dueTaskList: action.dueTaskList,
            });
        default:
            return state;
    }
}
