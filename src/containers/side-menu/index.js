import React from 'react';
import PropTypes from 'prop-types';
import Menu from '../../components/menu';
import { Select } from '@alifd/next';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { mainMenus, projectMenus } from './menuList';

import './index.scss';

class SideMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mainMenus,
            projectMenus,
        };
    }

    render() {
        console.log('SIDE-MENU', this.props, this.state);
        const currentMenu = this.props.location.pathname.split('/')[1];
        const menu_items = [
            { label: 'AliExpress', value: 'AliExpress' },
            { label: 'Tmall', value: 'Tmall' },
        ];
        const projectDetailId = (
            this.props.initialProjList.length !== 0
            &&
            this.props.projectDetailId
        ) ? this.props.projectDetailId : 0;
        const initialProjList = this.props.initialProjList.length === 0 ?
            [{ props: { people_q: 38, todo_q: 12, viewed: 10, edited: 12, progress: 60 }, name: 'European Cup', id: 0, created: 'xiaowo', member: ['xiaowo', 'maxin'] }] :
            this.props.initialProjList;

        return (
            <div className="side-menu">
                <div className="logo" />
                <div className="nav-list">
                    <Menu
                        currentMenu={currentMenu}
                        menus={mainMenus}
                        projectMenus={projectMenus}
                        projectDetailId={projectDetailId}
                        initialProjList={initialProjList}
                        detailProps={this.props}
                        contextOld={this.props.context_old}
                    />
                </div>
            </div>
        );
    }
}

SideMenu.propTypes = {
    projectDetailId: PropTypes.number,
    initialProjList: PropTypes.array,
    location: PropTypes.object,
    context_old: PropTypes.string,
};

export default withRouter(connect(state => ({
    ...state.common,
    ...state.area,
    ...state.project,
    ...state.home,
}))(SideMenu));
