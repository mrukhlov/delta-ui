import { HOME } from '../constants/action-type';

// export const tasksLoad = (initialProjList = []) => dispatch => fetch('http://localhost:8080/projList')
export const tasksLoad = (initialProjList = []) => dispatch => fetch('https://delta-db.herokuapp.com/projList')
    // .then(response => response.json())
    .then(response => response.json())
    .then(response => {
        // console.log(data);
        dispatch({
            type: HOME.TASKS_LOAD,
            taskList: response.recent_proj,
            dueList: response.due_proj,
            initialProjList: initialProjList.length > 0 ? initialProjList : response.recent_proj,
            offset: 3,
            show_full: false,
        });
    });


export function tasksShowOffset(taskList, show_full, length) {
    console.log('actions tasksShowOffset action fired', taskList, show_full, length);
    return {
        type: HOME.TASKS_SHOW_OFFSET,
        taskList,
        show_full,
        length,
    };
}


export function homeDetail(state = false) {
    console.log('actions homeDetail action fired', state);
    return {
        type: HOME.TASKS_TASK_DETAIL,
        home_detail: state,
    };
}
