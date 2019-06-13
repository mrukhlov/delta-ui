import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Progress } from '@alifd/next';
import { Link } from 'react-router-dom';

const RecentProjectItem = (props) => {
    return props.proj.map(item => (
        <li className="proj-item" key={item.id}>
            <div>
                <div className="proj-item-title">
                    <Progress
                        percent={item.props.progress}
                        shape="circle"
                        size="small"
                        color={item.props.progress === 100 ? '#1B61C2' : '#1D825B'}
                        textRender={() => ''}
                    />&nbsp;&nbsp;
                    <Link to={`/proj_id/${item.id}`}> {item.name}</Link>
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
};

const RecentProject = ({ proj, actionClick, initial_len }) => {
    return (
        <div className="recent-proj">
            <div className="recent-proj-header">
                <h2>RECENT PROJECT</h2>
                <p>Define a goal, then work towards it one to-do at a time</p>
            </div>
            <div>
                <ul className="proj-list">
                    <RecentProjectItem proj={proj} />
                </ul>
                <p className="show-all" onClick={actionClick()}>{`Show all ${initial_len}`}</p>
            </div>
        </div>
    );
};

RecentProject.propTypes = {
    proj: PropTypes.array,
    actionClick: PropTypes.func,
    initial_len: PropTypes.number,
};

export default connect()(RecentProject);
