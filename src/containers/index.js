import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import SideMenu from './side-menu';
import RightMenu from './right-menu';
import Header from './header';
import Home from './home';
import Area from './area';
import Project from './project';
import Library from './library';
import Knowledge from './knowledge';
import * as commonActions from '../actions/common';
import { Loading } from '@alifd/next';

import ProjectDetail from './project/projectDetail';
import AreaDetail from './area/areaDetail';

import './index.scss';

addLocaleData([...en]);

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        commonActions.localeChange(this.props.dispatch, 'en-us', true);
    }

    render() {
        console.log('INDEX page render', this.props);
        return this.props.isLoading ?
            <div className="loading-wrapper">
                <Loading className="loading" />
            </div>
            :
            <IntlProvider
                key={this.props.locale}
                locale={this.props.locale}
                messages={this.props.localeMessage}
            >
                <div>
                    <SideMenu
                        currentMenu={this.props.currentMenu}
                        areaDetail={this.props.area_detail}
                        initialProjList={this.props.initialProjList}
                        projectDetailId={this.props.project_detail_id}
                        context={this.props.context}
                        context_old={this.props.context_old}
                    />
                    <div className="right-container">
                        <Header />
                        <div className="right-container-content">
                            <div className="main-content">
                                <Switch>
                                    <Route path="/" exact component={Home} />
                                    <Route path="/proj_id/:id" component={ProjectDetail} />
                                    <Route path="/areas" component={Area} />
                                    <Route path="/area_id/:id" component={AreaDetail} />
                                    <Route path="/projects" component={Project} />
                                    <Route path="/library" component={Library} />
                                    <Route path="/knowledge" component={Knowledge} />
                                </Switch>
                            </div>
                            <RightMenu />
                        </div>
                    </div>
                </div>
            </IntlProvider>;
    }
}

App.propTypes = {
    isLoading: PropTypes.bool,
    area_detail: PropTypes.bool,
    locale: PropTypes.string,
    context: PropTypes.string,
    context_old: PropTypes.string,
    currentMenu: PropTypes.string,
    dispatch: PropTypes.func,
    localeMessage: PropTypes.object,
    initialProjList: PropTypes.array,
    project_detail_id: PropTypes.number,
};

export default connect(state => ({
    ...state.common,
    ...state.area,
    ...state.project,
    ...state.home,
}))(App);
