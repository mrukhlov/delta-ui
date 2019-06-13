import { AREA } from '../constants/action-type';

const initialState = {
    areaList: [],
    areaListFiltered: [],
    show_mine: false,
    step0: false,
    step1: false,
    context: 'area',
};

export default function areaReducer(state = initialState, action = {}) {
    switch (action.type) {
        case AREA.AREAS_SHOW_ALL:
            console.log('AREAS_SHOW_ALL reducer fired', state, action);
            return Object.assign({}, state, {
                areaList: action.areaList,
                show_mine: action.show_mine
            });
        case AREA.AREAS_CREATE_AREA:
            console.log('AREAS_CREATE_AREA reducer fired', state, action);
            return Object.assign({}, state, {
                areaList: [...state.areaList, action.create_area],
            });
        case AREA.AREAS_CREATE_STEP_0:
            console.log('AREAS_CREATE_STEP_0 reducer fired', state, action);
            return Object.assign({}, state, {
                step0: action.step0,
                step1: action.step1,
            });
        case AREA.AREAS_CREATE_STEP_1:
            console.log('AREAS_CREATE_STEP_1 reducer fired', state, action);
            return Object.assign({}, state, {
                step1: action.step1,
            });
        default:
            return state;
    }
}
