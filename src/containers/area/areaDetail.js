import React from 'react';
import { connect } from 'react-redux';
import { Progress } from '@alifd/next';
import PropTypes from 'prop-types';
// import * as commonActions from 'actions/common';
import { areaDetail } from '../../actions/area';

import './index.scss';

class AreaDetail extends React.Component {
    componentDidMount() {
        this.props.areaDetail(true);
    }

    render() {
        console.log('area detail page render', this.props);
        const index = this.props.location.pathname.split('/')[2];
        const areaList = this.props.area.areaList.length === 0 ?
            [{ props: { projects: 724 }, name: 'AliExpress - Common', id: 0, author: 'xiaowo' }] :
            this.props.area.areaList;
        const item = areaList[index];
        console.log(item);

        return (
            <div className="detail-area-item-container">
                <div className="detail-area-item-header">
                    <div className="detail-area-item-header-name">
                        <h1>Area</h1>
                    </div>
                </div>
                <div className="detail-area-item">
                    <div className="detail-area-item-title">
                        <Progress
                            percent={32}
                            shape="circle"
                            size="small"
                            color="#1D825B"
                            textRender={() => ''}
                        />&nbsp;&nbsp;
                        <a>{item.name}</a>
                    </div>
                    <div className="detail-area-item-desc">
                        <p>
                            {item.props.projects} projects in this area.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

AreaDetail.propTypes = {
    location: PropTypes.object,
    area: PropTypes.object,
    areaDetail: PropTypes.func,
};

const mapStateToProps = (state) => ({
    area: state.area,
});

const mapDispatchToProps = { areaDetail };

export default connect(mapStateToProps, mapDispatchToProps)(AreaDetail);
