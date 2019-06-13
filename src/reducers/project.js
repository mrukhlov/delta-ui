import { PROJECT, HOME } from '../constants/action-type';

const initialState = {
    // project page
    initialProjList: [],
    authorFilteredProjList: [],
    memberFilteredProjList: [],
    starredFilteredProjList: [],
    project_detail_id: null,
    context: 'project',
    // home page
    currentProjList: [],
    dueTaskList: [],
    offset: 3,
    show_full: false,
    // context: 'home',
    initial_len: 0,
};

export default function projectReducer(state = initialState, action = {}) {
    let initialProjList;
    switch (action.type) {
        case PROJECT.PROJECTS_LOAD:
            console.log('PROJECTS_LOAD action fired', state, action);
            initialProjList = action.projList.map(
                proj => (
                    { ...proj, starred: proj.starred ? proj.starred : false }
                )
            );
            return (
                Object.assign({}, state, {
                    // projects page
                    initialProjList,
                    memberFilteredProjList: initialProjList,
                    authorFilteredProjList: initialProjList,
                    starredFilteredProjList: initialProjList,
                    // home page
                    currentProjList: initialProjList,
                    dueTaskList: action.dueList,
                    show_full: false,
                    initial_len: action.projList.length,
                })
            );
        case PROJECT.PROJECTS_LIST_FILTER:
            console.log('PROJECTS_LIST_FILTER action fired', state, action);
            return (
                Object.assign({}, state, {
                    initialProjList: action.projList,
                })
            );
        case PROJECT.PROJECTS_SHOW_MEMBER:
            console.log('PROJECTS_SHOW_MEMBER action fired', state, action);
            return (
                Object.assign({}, state, {
                    initialProjList: action.projList,
                    memberFilteredProjList: action.projList
                })
            );
        case PROJECT.PROJECTS_SHOW_CREATED:
            console.log('PROJECTS_SHOW_CREATED action fired', state, action);
            return (
                Object.assign({}, state, {
                    initialProjList: action.projList,
                    authorFilteredProjList: action.projList
                })
            );
        case PROJECT.PROJECTS_SHOW_STARRED:
            console.log('PROJECTS_SHOW_STARRED action fired', state, action);
            return (
                Object.assign({}, state, {
                    initialProjList: action.projList,
                    starredFilteredProjList: action.projList
                })
            );
        case PROJECT.PROJECTS_STAR_PROJECT:
            console.log('PROJECTS_STAR_PROJECT action fired', state, action);
            return (
                Object.assign({}, state, {
                    initialProjList: action.projList,
                    memberFilteredProjList: action.projList,
                    authorFilteredProjList: action.projList,
                    starredFilteredProjList: action.projList,
                })
            );
        case PROJECT.PROJECTS_CREATE_PROJECT:
            console.log('PROJECTS_CREATE_PROJECT reducer fired', state, action);
            return Object.assign({}, state, {
                initialProjList: [...state.initialProjList, action.create_project],
                memberFilteredProjList: [
                    ...state.initialProjList, action.create_project
                ],
                authorFilteredProjList: [
                    ...state.initialProjList, action.create_project
                ],
                starredFilteredProjList: [
                    ...state.initialProjList, action.create_project
                ],
                currentProjList: [...state.initialProjList, action.create_project],
                show_full: false,
                initial_len: [...state.initialProjList, action.create_project].length,
            });
        case PROJECT.PROJECTS_PROJECT_DETAIL_ID:
            console.log('PROJECTS_PROJECT_DETAIL_ID reducer fired', state, action);
            return (
                Object.assign({}, state, {
                    project_detail_id: action.project_detail_id,
                })
            );
        case HOME.TASKS_SHOW_OFFSET:
            console.log('TASKS_SHOW_OFFSET reducer fired', state, action);
            return Object.assign({}, state, {
                currentProjList: action.taskList,
                show_full: action.show_full,
                length: action.length,
            });
        default:
            return state;
    }
}
