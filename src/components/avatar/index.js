import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

class Avatar extends React.Component {
    static propTypes = {
        avatar: PropTypes.string,
    };

    render() {
        return (
            <div className="avatar-wrap">
                <img src={this.props.avatar} className="avatar" />
            </div>
        );
    }
}

export default Avatar;
