import React from 'react';
import { Switch } from '@alifd/next';
import PropTypes from 'prop-types';


const areaCreate = (props) => {
    console.log(props);
    const inactive_background = {
        background: '#B4B7BA'
    };
    const inactive_color_0 = {
        color: '#FFFFFF',
    };
    const inactive_color_1 = {
        color: '#555555',
    };
    const active_background = {
        background: '#B9DACD',
    };
    const active_color = {
        color: '#1D825B',
    };

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

    const switchGenerator = (label, tag, key) => {
        return (
            <div className="switch-item-container" key={key}>
                <div className="switch-item-container-inner">
                    <label>
                        {label}
                        <Switch
                            onChange={
                                (checked) => props.onChangeSwitch(checked, tag)
                            }
                            className={tag}
                            checked={props.inputs[tag]}
                        />
                    </label>
                </div>
            </div>
        );
    };

    return (
        <div className="area-create-container">
            <div className="area-create-header">
                <h1>Create Area</h1>
                <p>
                    Group projects and to-dos based on
                     different responsibilities, such as mobile and PC
                </p>
            </div>
            <div>
                <div className="area-create-nav-container">
                    <div
                        className="area-create-nav-step0"
                        onClick={
                            props.state.step1 ?
                                () => props._step0(props.state.step0, !props.state.step1)
                                : () => {}
                        }
                    >
                        <div
                            className="area-create-nav-step0-circle"
                            style={{ ...active_background, ...active_color }}
                        >
                            1
                        </div>
                        <div
                            className="area-create-nav-step0-text"
                            style={active_color}
                        >
                            Basic Information
                        </div>
                    </div>
                    <div
                        className="area-create-nav-step1"
                        onClick={
                            !props.state.step1 ?
                                () => props._step0(props.state.step0, !props.state.step1)
                                : () => {}
                        }
                    >
                        <div
                            className="area-create-nav-step1-circle"
                            style={
                                !props.state.step1 ?
                                    { ...inactive_background, ...inactive_color_0 } :
                                    { ...active_background, ...active_color }
                            }
                        >
                            2
                        </div>
                        <div
                            className="area-create-nav-step1-text"
                            style={!props.state.step1 ? inactive_color_1 : active_color}
                        >
                            Translation Setup
                        </div>
                    </div>
                </div>
                <div className="area-create-form-container">
                    {
                        !props.state.step1 &&
                        <form className="form-step-0">
                            {
                                [
                                    ['Name for Area:', 'name', 0],
                                    ['Admin:', 'admin', 1],
                                    ['Source Language:', 'source', 2],
                                    ['Target Language(s):', 'target', 3],
                                ].map((x) => { return inputGenerator(x[0], x[1], x[2]); })
                            }
                        </form>
                    }
                    {
                        props.state.step1 &&
                        <form className="form-step-1">
                            <div className="form-step-1-pre-translation-container">
                                <div className="switch-item-container-header">
                                    <h1>Pre-Translation</h1>
                                </div>
                                {
                                    [
                                        ['Pre-Translate:', 'pre_translate', 1],
                                        ['Intelligent Setting:', 'intelligent_setting', 2],
                                        ['Perfect Match:', 'perfect_match', 3],
                                        ['Translation Memory:', 'translation_memory', 4],
                                        ['Machine Translation:', 'machine_translation', 5],
                                    ].map((x) => { return switchGenerator(x[0], x[1], x[2]); })
                                }
                            </div>
                            <div className="form-step-1-visual-interface-container">
                                <div className="switch-item-container-header">
                                    <h1>Editor Settings</h1>
                                </div>
                                {
                                    [
                                        ['Visual Interface:', 'visual_interface', 0]
                                    ].map((x) => { return switchGenerator(x[0], x[1], x[2]); })
                                }
                            </div>
                            <div className="form-step-1-others-container">
                                <div className="switch-item-container-header">
                                    <h1>Others</h1>
                                </div>
                                {
                                    [
                                        ['Human Translation:', 'human_translation', 0]
                                    ].map((x) => { return switchGenerator(x[0], x[1], x[2]); })
                                }
                            </div>
                        </form>
                    }
                    <p
                        className="add-button"
                        onClick={
                            !props.state.step1 ?
                                () => props._step0(props.state.step0, !props.state.step1) :
                                props._confirm
                        }
                    >
                        {!props.state.step1 ? 'Next' : 'Confirm'}
                    </p>
                </div>
            </div>
        </div>
    );
};

areaCreate.propTypes = {
    _step0: PropTypes.func,
    _confirm: PropTypes.func,
    state: PropTypes.object,
};

export default areaCreate;
