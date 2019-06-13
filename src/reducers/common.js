import { COMMON, AREA } from '../constants/action-type';

const initialState = {
    isLoading: true,
    currentMenu: 'home',
    locale: 'en',
    localeMessage: {
        Home: 'Home',
    },
    create_area: false,
    area_detail: false,
    home_detail: false,
    projects_detail: false,
    step0: false,
    context: '',
    context_old: '',
};

const menuMap = {
    '/': 'home',
    '/areas': 'areas',
    '/projects': 'projects',
    '/library': 'library',
    '/knowledge': 'knowledge',
};

export default function index(state = initialState, action = {}) {
    switch (action.type) {
        case COMMON.LOADING_CHANGE:
            console.log('COMMON.LOADING_CHANGE reducer fired', state, action);
            return Object.assign({}, state, {
                isLoading: action.isLoading,
            });
        case COMMON.ROUTE_CHANGE:
            console.log('COMMON.ROUTE_CHANGE reducer fired', state, action);
            return Object.assign({}, state, {
                currentMenu: menuMap[`/${action.pathname.split('/')[1]}`],
                step0: false,
                step1: false,
                context: menuMap[`/${action.pathname.split('/')[1]}`],
                context_old: state.context,
            });
        case COMMON.LOCALE_CHANGE:
            console.log('COMMON.LOCALE_CHANGE reducer fired', state, action);
            return Object.assign({}, state, {
                locale: action.locale,
                localeMessage: action.intl,
            });
        case AREA.AREAS_CREATE_STEP_0:
            console.log('COMMON_AREAS_CREATE_STEP_0 reducer fired', state, action);
            return Object.assign({}, state, {
                step0: action.step0,
                step1: action.step1,
            });
        default:
            return state;
    }
}
