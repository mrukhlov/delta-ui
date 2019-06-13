import React from 'react';
import { Tab, Progress, Rating } from '@alifd/next';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProjectListItem = (props) => {
    console.log(props);
    const list_to_return = props.proj_list.map(item => (
        <li
            className="proj-item"
            key={item.id}
            onMouseEnter={() => props._setVisible(true, item.id)}
            onMouseLeave={() => props._setVisible(false, item.id)}
        >
            <div className="proj-item-title-container">
                <div className="proj-item-title">
                    <div className="proj-item-title-name">
                        <Progress
                            percent={item.props.progress}
                            shape="circle"
                            size="small"
                            color={item.props.progress === 100 ? '#1B61C2' : '#1D825B'}
                            textRender={() => ''}
                        />&nbsp;&nbsp;
                        <Link to={`/proj_id/${item.id}`}> {item.name}</Link>
                    </div>
                    <div className="proj-item-title-rating">
                        <Rating
                            count={Number('1')}
                            className="proj-item-rating"
                            style={{ visibility: (props.visibility && props.id === item.id) || item.starred ? 'visible' : 'hidden' }}
                            onClick={() => { props._projectsStarProject(item); }}
                            value={item.starred ? 1 : 0}
                        />
                    </div>
                    <div
                        className="proj-item-title-remove"
                        style={{ visibility: props.visibility && props.id === item.id && item.created === 'maxin' ? 'visible' : 'hidden' }}
                        onClick={() => { props._removeProject(item.id); }}
                    >
                        <img src="https://image.flaticon.com/icons/svg/149/149158.svg" />
                    </div>
                </div>
                <div className="proj-item-desc">
                    <p>
                        {`${item.props.people_q} people, 
                        ${item.props.todo_q} todos in total. 
                        You viewed ${item.props.viewed} mins ago. 
                        Edited ${item.props.edited} mins ago.`}
                    </p>
                </div>
            </div>
        </li>
    ));
    const empty_page = (
        <div className="projects-empty-page">List is empty, you can add project here.</div>
    );
    return list_to_return.length > 0 ? list_to_return : empty_page;
};

class ProjectList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visibility: false,
            id: null,
        };
    }

    _setVisible = (visibility, id) => {
        this.setState({ visibility, id });
    };

    member_filter(i) { return i.member.includes('maxin'); }

    author_filter(i) { return i.created === 'maxin'; }

    starred_filter(i) { return i.starred === true; }

    render() {
        console.log(this.props.proj_list);
        const {
            initialProjList,
        } = this.props.proj_list;
        const tabs = [
            {
                title: 'All My Projects',
                func: this.props._projectsListFilter,
                desc: 'Projects that i serve as member or admin',
                proj_list: initialProjList,
                key: 'memberFilteredProjList',
                filter: this.member_filter,
            },
            {
                title: 'Created by me',
                func: this.props._projectsListFilter,
                desc: 'Projects that were created by me',
                proj_list: initialProjList,
                key: 'authorFilteredProjList',
                filter: this.author_filter,
            },
            {
                title: 'Starred by me',
                func: this.props._projectsListFilter,
                desc: 'Projects starred by me',
                proj_list: initialProjList,
                key: 'starredFilteredProjList',
                filter: this.starred_filter,
            },

        ];
        return (
            <div className="projects-tab-container">
                <Tab shape="text" animation={false}>
                    {tabs.map(item => (
                        <Tab.Item
                            title={item.title}
                            style={{ color: '#1D825B' }}
                            key={item.key}
                        >
                            <div className="projects-header"><p>{item.desc}</p></div>
                            <ProjectListItem
                                proj_list={item.proj_list.filter(item.filter)}
                                _projectsStarProject={(i) => this.props._projectsStarProject(i)}
                                _setVisible={(visibility, id) => this._setVisible(visibility, id)}
                                visibility={this.state.visibility}
                                id={this.state.id}
                                _removeProject={(i) => this.props._removeProject(i)}
                            />
                        </Tab.Item>
                    ))}
                </Tab>
            </div>
        );
    }
}

ProjectList.propTypes = {
    proj_list: PropTypes.object,
    _projectsListFilter: PropTypes.func,
    _projectsStarProject: PropTypes.func,
    _removeProject: PropTypes.func,
};

export default ProjectList;
