/* eslint-disable react/no-unused-state */
import React from 'react';
import { connect } from 'react-redux';
import { tasksShowOffset, homeDetail } from '../../actions/home';
import { projectsLoad, projectsCreateProject } from '../../actions/project';
import { _step0 } from '../../actions/common';
import PropTypes from 'prop-types';
import RecentProject from './recentProject';
import DueTasks from './dueTasks';
import ProjectCreate from '../project/projectCreate';

import './index.scss';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step0: false,
            step1: false,
            name: '',
            admin: '',
            source: '',
            target: '',
            show_len: 0,
        };
    }

    componentDidMount() {
        this.props.projectsLoad();
    }

    showAll = () => {
        this.props.tasksShowOffset(
            this.props.project.initialProjList,
            !this.props.project.show_full,
            this.props.project.initialProjList.length
        );
    };

    onChangeField = (e) => { this.setState({ [e.target.name]: e.target.value }); }

    confirm = () => {
        this.props._step0(!this.props.common.step0, !this.props.common.step1);
        if (this.state.name && this.state.name.length > 0) {
            const project_template = {
                props: {
                    people_q: 0,
                    todo_q: 0,
                    viewed: 0,
                    edited: 0,
                    progress: 0
                },
                name: this.state.name,
                id: this.props.project.initialProjList.length,
                created: 'maxin',
                member: ['xiaowo', 'maxin'],
            };
            fetch(
                // 'http://localhost:8080/projList/add',
                'https://delta-db.herokuapp.com/projList/add',
                {
                    method: 'POST',
                    body: JSON.stringify(project_template),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            ).then(response => { return response.json(); })
                .then(data => { this.props.projectsCreateProject(data); });
            this.setState({
                name: '',
                admin: '',
                source: '',
                target: '',
            });
        }
    }

    render() {
        console.log('rendered main', this.props);
        const proj_len = this.props.project.show_full ?
            this.props.project.initial_len :
            this.props.project.offset;
        const offset = !this.props.project.show_full ?
            this.props.project.initial_len :
            this.props.project.offset;

        return (
            <div className="main-inner-content">
                <div className="main-inner-content-header"><h1>Home</h1></div>
                {!this.props.common.step0 ?
                    <React.Fragment>
                        <RecentProject
                            proj={this.props.project.currentProjList.slice(0, proj_len)}
                            actionClick={() => this.showAll}
                            initial_len={offset}
                        />
                        <DueTasks
                            dueProj={this.props.project.dueTaskList}
                        />
                    </React.Fragment> :
                    <ProjectCreate
                        state={this.props.common}
                        _step0={(step0, step1) => this.props._step0(step0, step1)}
                        _confirm={() => this.confirm()}
                        onChangeField={(e) => this.onChangeField(e)}
                        inputs={this.state}
                    />
                }
            </div>
        );
    }
}

Home.propTypes = {
    project: PropTypes.object,
    common: PropTypes.object,
    projectsLoad: PropTypes.func,
    tasksShowOffset: PropTypes.func,
    _step0: PropTypes.func,
    projectsCreateProject: PropTypes.func,
};

const mapStateToProps = (state) => ({
    home: state.home,
    project: state.project,
    common: state.common,
});

const mapDispatchToProps = {
    tasksShowOffset,
    homeDetail,
    projectsLoad,
    projectsCreateProject,
    _step0,
};


export default connect(mapStateToProps, mapDispatchToProps)(Home);
