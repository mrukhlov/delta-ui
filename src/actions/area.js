import { AREA } from '../constants/action-type';

// export const tasksShow = offset => ({
//     // type: HOME.LOAD_TASKS,
//     type: 'SHOW_TASKS',
//     offset: offset,
// })

// export const areasLoad = () => dispatch => fetch('http://localhost:8080/areaList')
export const areasLoad = () => dispatch => fetch('https://delta-db.herokuapp.com/areaList')
    // .then(response => response.json())
    .then(response => response.json())
    .then(response => {
        dispatch({
            type: AREA.AREAS_SHOW_ALL,
            areaList: response.area_list,
            show_mine: false,
            create_area: false,
        });
    });

export function areaDetail(state) {
    console.log('actions areaDetail action fired', state);
    return {
        type: AREA.AREAS_AREA_DETAIL,
        area_detail: state,
    };
}

export function createArea(state) {
    console.log('actions createArea action fired', state);
    return {
        type: AREA.AREAS_CREATE_AREA,
        create_area: state,
    };
}

export function _step0(step0 = this.state.step0, step1 = this.state.step1) {
    return {
        type: AREA.AREAS_CREATE_STEP_0,
        step0,
        step1,
    };
}
