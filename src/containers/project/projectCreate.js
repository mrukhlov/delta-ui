import React from 'react';
import PropTypes from 'prop-types';


const projectCreate = (props) => {
    console.log(props);

    const inputGenerator = (label, tag, key) => {
        return (
            <label key={key}>
                {label}
                <input
                    type="text"
                    name={tag}
                    onChange={props.onChangeField}
                    value={props.inputs[tag]}
                />
            </label>
        );
    };

    return (
        <div className="project-create-container">
            <div className="project-create-header">
                <h1>Create Project</h1>
                <p>
                    Define a goal, then work towards it one to-do at a time.
                </p>
            </div>
            <div>
                <div className="project-create-form-container">
                    <form className="form-step-0">
                        {
                            [
                                ['Name of your project:', 'name', 0],
                                ['Member:', 'admin', 1],
                                ['Source Language:', 'source', 2],
                                ['Target Language(s):', 'target', 3],
                            ].map((x) => { return inputGenerator(x[0], x[1], x[2]); })
                        }
                    </form>
                    <p
                        className="add-button"
                        onClick={props._confirm}
                    >
                        Confirm
                    </p>
                </div>
            </div>
        </div>
    );
};

projectCreate.propTypes = {
    _confirm: PropTypes.func,
};

export default projectCreate;
