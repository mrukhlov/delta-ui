import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Icon } from '@alifd/next';

import './index.scss';

class Menu extends React.Component {
    static propTypes = {
        contextOld: PropTypes.string,
        currentMenu: PropTypes.string,
        menus: PropTypes.array,
        projectMenus: PropTypes.array,
        initialProjList: PropTypes.array,
        projectDetailId: PropTypes.number,
    };

    render() {
        console.log('MENU RENDERED', this.props);
        const { menus = [],
            currentMenu,
            projectMenus,
            initialProjList,
            projectDetailId
        } = this.props;
        const menuChoice = currentMenu === 'proj_id' ? projectMenus : menus;
        const projectName = initialProjList[projectDetailId].name;
        const menuItems = menuChoice.map(menu => (
            <li className="menu" key={menu.alias}>
                <Link
                    to={menu.path}
                    className={currentMenu === menu.alias ? 'active' : undefined}
                >
                    { menu.icon ? <Icon type={menu.icon} size="small" className="menu-icon" /> : undefined }
                    <FormattedMessage id={menu.key} />
                </Link>
            </li>
        ));
        const backLink = this.props.contextOld === 'home' ? '/' : '/projects';

        return (
            <ul className="component-menu-wrapper">
                {
                    currentMenu === 'proj_id'
                    &&
                    <div className="portal">
                        <div>
                            <h3><Link to={backLink}>Project Detail</Link></h3>
                        </div>
                        <div>{projectName}</div>
                    </div>
                }
                {menuItems}
            </ul>
        );
    }
}

export default Menu;
