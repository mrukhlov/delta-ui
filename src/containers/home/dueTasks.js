import React, { Component } from 'react';
import { Checkbox, Rating } from '@alifd/next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const DueTasksItm = (props) => {
    return props.proj.map((item) => (
        <div className="due-task-container" key={item.id}>
            <div className="due-task-checkbox">
                <Checkbox />
                <Rating
                    count={Number('1')}
                />
            </div>
            <div className="due-task-header">
                <div className="due-task-header-container">
                    <div className="due-task-header-container-name">
                        <h2>{item.name}</h2>
                    </div>
                    <div className="due-task-header-container-state">
                        <p>State</p>
                    </div>
                    <div className="due-task-header-container-due-date">
                        <p>Due Date</p>
                    </div>
                </div>
            </div>
            <div className="due-task-lang">
                {
                    item.props.lang.map(
                        (task) => (
                            <div
                                className={(props.name === item.name && props.lang === task) && props.hover ? 'lang-hover' : 'lang'}
                                key={task}
                                onMouseEnter={() => props.actionHover(item.name, task, true)}
                                onMouseLeave={() => props.actionHover(item.name, task, false)}
                            >
                                {(props.name === item.name && props.lang === task) && props.hover && <div className="tooltiptext">100%<br />1500/1500 words</div>}
                                {task}
                            </div>
                        )
                    )
                }
            </div>
        </div>
    ));
};

class DueTasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            lang: null,
            hover: false,
        };
    }

    handleOnHover = (name, lang, hover) => {
        this.setState({
            name,
            lang,
            hover,
        });
    }

    render() {
        console.log('due tasks render', this.props, this.state);
        return (
            <div className="tasks-due">
                <div className="tasks-due-header">
                    <h2>TASKS DUE SOON</h2>
                    <p>Tasks that assigned to me that Due Soon</p>
                </div>
                <div className="tasks-due-inner">
                    <DueTasksItm
                        proj={this.props.dueProj}
                        actionHover={this.handleOnHover}
                        hover={this.state.hover}
                        name={this.state.name}
                        lang={this.state.lang}
                    />
                </div>
            </div>
        );
    }
}

DueTasks.propTypes = {
    dueProj: PropTypes.array,
};

const mapStateToProps = (state) => ({
    projectList: state.home,
});

export default connect(mapStateToProps)(DueTasks);
