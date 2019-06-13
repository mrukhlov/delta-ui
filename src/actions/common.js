import { COMMON, AREA } from '../constants/action-type';

export function localeChange(dispatch, locale, withLoading) {
    const intl = {
        'menu.settings':'Settings',
        'menu.home':'Home',
        'menu.library':'Library',
        'menu.knowledge':'Knowledge',
        'menu.areas':'Areas',
        'menu.integrations':'Integrations',
        'menu.scenes':'Scenes',
        'app.check':'success',
        'menu.tasks':'Tasks',
        'menu.export':'Export',
        'menu.projects':'Projects'
    }
    withLoading && loadingChange(dispatch, true);
    dispatch({
        type: COMMON.LOCALE_CHANGE,
        locale,
        intl,
    });
    withLoading && loadingChange(dispatch, false);
}

export function loadingChange(dispatch, isLoading) {
    dispatch({
        type: COMMON.LOADING_CHANGE,
        isLoading,
    });
}

export function routeChange(pathname) {
    return {
        type: COMMON.ROUTE_CHANGE,
        pathname,
    };
}


export function _step0(step0 = this.state.step0, step1 = this.state.step1) {
    return {
        type: AREA.AREAS_CREATE_STEP_0,
        step0,
        step1,
    };
}

export function _step1(step1 = this.state.step1) {
    return {
        type: AREA.AREAS_CREATE_STEP_1,
        step1,
    };
}
