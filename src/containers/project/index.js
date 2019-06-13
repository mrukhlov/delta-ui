/* eslint-disable react/no-unused-state */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProjectList from './projectList';
import ProjectCreate from './projectCreate';
import {
    projectsLoad,
    projectsStarProject,
    projectsCreateProject,
    projectsDetail,
} from '../../actions/project';
import { _step0 } from '../../actions/common';
import { homeDetail } from '../../actions/home';

import './index.scss';

class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step0: false,
            step1: false,
            name: '',
            admin: '',
            source: '',
            target: '',
        };
    }

    componentDidMount() {
        this.props.projectsLoad();
    }

    componentWillUnmount() {}

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

    _removeProject = (id) => {
        console.log('remove', id);
        fetch(
            // 'http://localhost:8080/projList/remove',
            'https://delta-db.herokuapp.com/projList/remove',
            {
                method: 'POST',
                body: JSON.stringify({ id }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        ).then(response => { return response.json(); })
            .then(data => { this.props.projectsLoad((data)); });
    }

    _projectsListFilter = () => {
        this.props.projectsListFilter(this.props.project.initialProjList);
    };

    _projectsMemberFilter = () => {
        this.props.projectsMemberFilter(this.props.project.initialProjList);
    };

    _projectsAuthorFilter = () => {
        this.props.projectsAuthorFilter(this.props.project.initialProjList);
    };

    _projectsStarredFilter = () => {
        this.props.projectsStarredFilter(this.props.project.initialProjList);
    };

    _projectsStarProject = (id) => {
        console.log('star', id);
        fetch(
            // 'http://localhost:8080/projList/star',
            'https://delta-db.herokuapp.com/projList/star',
            {
                method: 'POST',
                body: JSON.stringify({ id: id.id }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        ).then(response => { return response.json(); })
            .then(data => {
                this.props.projectsStarProject(data.recent_proj);
            });
    }

    onChangeField = (e) => { this.setState({ [e.target.name]: e.target.value }); }


    render() {
        console.log('rendered projects', this.props);
        return (
            <div className="project-main-container">
                {!this.props.common.step0 ?
                    <ProjectList
                        proj_list={this.props.project}
                        _projectsMemberFilter={this._projectsMemberFilter}
                        _projectsAuthorFilter={this._projectsAuthorFilter}
                        _projectsStarredFilter={this._projectsStarredFilter}
                        _projectsListFilter={this._projectsListFilter}
                        _projectsStarProject={this._projectsStarProject}
                        _removeProject={(i) => this._removeProject(i)}
                    /> :
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

Project.propTypes = {
    common: PropTypes.object,
    project: PropTypes.object,
    projectsLoad: PropTypes.func,
    projectsMemberFilter: PropTypes.func,
    projectsAuthorFilter: PropTypes.func,
    projectsStarredFilter: PropTypes.func,
    projectsStarProject: PropTypes.func,
    projectsCreateProject: PropTypes.func,
    projectsListFilter: PropTypes.func,
    _step0: PropTypes.func,
};

const mapStateToProps = (state) => ({
    project: state.project,
    common: state.common,
});

const mapDispatchToProps = {
    projectsLoad,
    projectsStarProject,
    projectsCreateProject,
    _step0,
    projectsDetail,
    homeDetail,
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);
