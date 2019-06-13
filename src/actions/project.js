import { PROJECT } from '../constants/action-type';

export function projectsLoad() {
    return dispatch => {
        // fetch('http://localhost:8080/projList')
        fetch('https://delta-db.herokuapp.com/projList')
            .then(response => response.json())
            .then(response => {
                if (response.error) {
                    throw (response.error);
                }
                dispatch({
                    type: PROJECT.PROJECTS_LOAD,
                    projList: response.recent_proj,
                    dueList: response.due_proj,
                });
            });
        // .catch(error => {
        //     dispatch(fetchProductsError(error));
        // });
    };
}

export function projectsStarProject(projList, item) {
    console.log('actions projectsStarProject action fired', projList, item);
    return {
        type: PROJECT.PROJECTS_STAR_PROJECT,
        projList,
        item,
        star_project: true,
    };
}

export function projectsCreateProject(state) {
    console.log('actions createProject action fired', state);
    return {
        type: PROJECT.PROJECTS_CREATE_PROJECT,
        create_project: state,
    };
}

export function projectsDetail(state = false) {
    console.log('actions projectsDetail action fired', state);
    return {
        type: PROJECT.PROJECTS_PROJECT_DETAIL,
        home_detail: state,
    };
}

export function projectsDetailIdSet(id) {
    console.log('actions projectsDetailId action fired', id);
    return {
        type: PROJECT.PROJECTS_PROJECT_DETAIL_ID,
        project_detail_id: id,
    };
}
