import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { _step0 } from '../../actions/common';

import './index.scss';

class RightMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        console.log('RIGHT-MENU', this.props, this.state);
        const currentMenu = this.props.location.pathname.split('/')[1];
        const page = (currentMenu === ('projects')) || (currentMenu.length === 0)
            ? 'PROJECT'
            : 'AREA';
        const menuList = ['library', 'area_id', 'proj_id', 'knowledge'];
        return (
            <div
                className="context-button"
                style={{
                    visibility: (
                        this.props.common.step0 ||
                        menuList.includes(currentMenu)
                    ) ? 'hidden' : 'visible'
                }}
            >
                <div
                    onClick={
                        () => this.props._step0(
                            !this.props.common.step0, this.props.common.step1
                        )
                    }
                    className="context-button-text"
                >
                    <div className="context-button-text-plus-sign">{'+'}</div>
                    <div>{`NEW ${page}`}</div>
                </div>
            </div>
        );
    }
}

RightMenu.propTypes = {
    location: PropTypes.object,
    common: PropTypes.object,
    _step0: PropTypes.func,
};

const mapDispatchToProps = { _step0 };

export default withRouter(connect(state => ({
    common: { ...state.common },
    area: { ...state.area },
    project: { ...state.project },
    home: { ...state.home },
}), mapDispatchToProps)(RightMenu));
