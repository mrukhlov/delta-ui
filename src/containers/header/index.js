import React from 'react';
import PropTypes from 'prop-types';
import { Input, Icon, Select } from '@alifd/next';
import { connect } from 'react-redux';
import Avatar from '../../components/avatar';
import * as commonActions from '../../actions/common';
import './index.scss';

class Header extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
        };
    }

    static defaultProps = {
        // avatar: 'https://cdog01.alibaba-inc.com/aliwork/tfscom/TB1suIkSpXXXXXAXpXXXXXXXXXX.tfsprivate_140x140',
        avatar: 'https://pp.userapi.com/c850332/v850332668/11f169/DZTWFK9bTHE.jpg',
    }

    static propTypes = {
        avatar: PropTypes.string,
        localeChange: PropTypes.func,
    };

    handleSearch = () => {
        console.log(`search with keyword: ${this.state.keyword}`);
    }

    handleKeywordChange = (v) => {
        this.setState({
            keyword: v,
        });
    };

    changeLanguage = code => {
        this.props.localeChange(code);
    };

    render() {
        console.log('header', this.props);
        const { avatar } = this.props;
        return (
            <div className="header">
                <Input
                    innerBefore={<Icon type="search" style={{ margin: 4 }} onClick={this.handleSearch} />}
                    className="search"
                    size="large"
                    placeholder="Search Project, Page"
                    value={this.state.keyword}
                    aria-label="input with config of innerBefore"
                    onChange={this.handleKeywordChange}
                />
                <Select onChange={this.changeLanguage} defaultValue="English" className="select-language">
                    <Select.Option value="en-us">English</Select.Option>
                </Select>
                <Icon type="email" className="notify" />
                <Avatar avatar={avatar} />
            </div>
        );
    }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
    localeChange: commonActions.localeChange,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
