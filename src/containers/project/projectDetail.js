import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { projectsDetailIdSet, projectsLoad } from '../../actions/project';

const ProjectDetailItem = (props) => {
    return props.filesList.map(item => (
        <div className={`${props.className}-files-list-item`} key={item.id}>
            <div className={`${props.className}-files-list-item-wrap`}>
                <div className={`${props.className}-files-list-item-checkbox`}>
                    <input type="checkbox" name="checkbox" />
                </div>
                <div className={`${props.className}-files-list-item-picture`}>
                    <img src="https://image.flaticon.com/icons/svg/149/149346.svg" />
                </div>
                <div className={`${props.className}-files-list-item-desc`}>
                    <div className={`${props.className}-files-list-item-desc-filename`}>{item.name}</div>
                    <div className={`${props.className}-files-list-item-desc-uploader`}>{item.author}</div>
                </div>
                <div className={`${props.className}-files-list-item-stat`}>{item.length}</div>
            </div>
        </div>
    ));
};

class ProjectDetail extends React.Component {
    componentDidMount() {
        if (this.props.project.initialProjList.length === 0) {
            this.props.projectsLoad();
        }
        this.props.projectsDetailIdSet(parseInt(this.props.match.params.id, 10));
    }

    render() {
        console.log('project detail render', this.props);
        const className = 'detail-project';
        const id = this.props.project.initialProjList.length === 0 ? 0 :
            parseInt(this.props.match.params.id, 10);
        const initialProjList = this.props.project.initialProjList.length === 0 ?
            [{ props: { people_q: 38, todo_q: 12, viewed: 10, edited: 12, progress: 60 }, name: 'European Cup', id: 0, created: 'xiaowo', member: ['xiaowo', 'maxin'] }] :
            this.props.project.initialProjList;
        const filesList = [
            {
                name: `${initialProjList[id].name}.doc`,
                author: '马辛',
                length: '43 words',
                id: 0,
            },
            {
                name: `${initialProjList[id].name}.xlsx`,
                author: '马辛',
                length: '150 words',
                id: 1,
            },
        ];
        return (
            <div className={`${className}-container`}>
                <div className={`${className}-header`}>
                    <h1>Scenes/Resources</h1>
                    <div>Sort by day added</div>
                </div>
                <div className={`${className}-files-list`}>
                    <ProjectDetailItem
                        className={className}
                        filesList={filesList}
                    />
                </div>
            </div>
        );
    }
}

ProjectDetail.propTypes = {
    match: PropTypes.object,
    projectsDetailIdSet: PropTypes.func,
    projectsLoad: PropTypes.func,
    initialProjList: PropTypes.array,
    project: PropTypes.object,
};

const mapStateToProps = (state) => ({
    home: state.home,
    project: state.project,
});

const mapDispatchToProps = {
    projectsDetailIdSet,
    projectsLoad,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);
