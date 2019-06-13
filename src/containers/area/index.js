import React from 'react';
import { connect } from 'react-redux';
import AreaList from './areaList';
import AreaCreate from './areaCreate';
// import { area_list } from './areaLists';
import { createArea, areasLoad } from '../../actions/area';
import { _step0 } from '../../actions/common';
import PropTypes from 'prop-types';

import './index.scss';

class Area extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step0: false,
            step1: false,
            name: '',
            admin: '',
            source: '',
            target: '',
            pre_translate: false,
            intelligent_setting: false,
            perfect_match: false,
            translation_memory: false,
            machine_translation: false,
            visual_interface: false,
            human_translation: false,
            areaListFiltered: [],
        };
    }

    componentWillMount() {
        console.log('area index componentWillMount fired');
        // initial areas load
        if (this.props.area.areaList.length === 0) { this.props.areasLoad(); }
    }

    _step0 = (step0, step1) => { this.setState({ step0, step1 }); }

    _step1 = (step1) => { this.setState({ step1 }); }

    _confirm = () => {
        this.props._step0(!this.props.common.step0, !this.props.common.step1);
        if (this.state.name && this.state.name.length > 0) {
            const area_template = {
                props: { projects: 1 },
                name: this.state.name,
                id: this.props.area.areaList.length,
                author: 'maxin'
            };
            this.props.createArea(area_template);
            this.setState({
                name: '',
                admin: '',
                source: '',
                target: '',
            });
        }
    }

    onChangeField = (e) => { this.setState({ [e.target.name]: e.target.value }); }

    onChangeSwitch = (value, name) => { this.setState({ [name]: value }); }

    render() {
        console.log('rendered area', this.props, this.state);
        return (
            <div className="area-main-container">
                {this.props.common.step0 ?
                    <AreaCreate
                        state={this.props.common}
                        _step0={(step0, step1) => this.props._step0(step0, step1)}
                        _confirm={() => this._confirm()}
                        onChangeField={(e) => this.onChangeField(e)}
                        onChangeSwitch={(value, name) => this.onChangeSwitch(value, name)}
                        inputs={this.state}
                    /> :
                    <AreaList
                        area_list={this.props.area}
                    />
                }
            </div>
        );
    }
}

Area.propTypes = {
    createArea: PropTypes.func,
    areasLoad: PropTypes.func,
    _step0: PropTypes.func,
    area: PropTypes.object,
    common: PropTypes.object,
};


const mapStateToProps = (state) => ({
    area: state.area,
    common: state.common,
});

const mapDispatchToProps = {
    createArea,
    _step0,
    areasLoad
};


export default connect(mapStateToProps, mapDispatchToProps)(Area);
