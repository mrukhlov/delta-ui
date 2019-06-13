import React from 'react';
import { Tab } from '@alifd/next';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const AreaListItem = (props) => {
    return props.area_list.map(item => (
        <div className="area-item-container" key={item.id}>
            <div className="area-item-icon">
                <img src="https://image.flaticon.com/icons/svg/259/259572.svg" />
            </div>
            <div className="area-item-name">
                <Link to={`/area_id/${item.id}`}> {item.name}</Link>
            </div>
            <div className="area-item-num">{item.props.projects} Projects</div>
        </div>
    ));
};

class AreaList extends React.Component {
    render() {
        const { area_list } = this.props;
        console.log(this.props);
        const areasHeader =
            (
                <div className="areas-header">
                    <p>
                        {`Group your projects and to-dos based on different
                        responsibilities, such as AliExpress - Core`}
                    </p>
                </div>
            );
        return (
            <div className="areas-tab-container">
                <Tab shape="text" animation={false}>
                    <Tab.Item
                        title="All Areas"
                        style={{ color: '#1D825B' }}
                    >
                        {areasHeader}
                        <AreaListItem area_list={area_list.areaList} />
                    </Tab.Item>
                    <Tab.Item
                        title="Created by me"
                        style={{ color: '#1D825B' }}
                    >
                        {areasHeader}
                        <AreaListItem area_list={
                            area_list.areaList.filter(
                                (i) => { return i.author === 'maxin'; }
                            )
                        }
                        />
                    </Tab.Item>
                </Tab>
            </div>
        );
    }
}

AreaList.propTypes = {
    area_list: PropTypes.object,
};

export default AreaList;
