
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, ImagePicker, NavBar, Icon, Popover, TabBar, Toast, TextareaItem, InputItem } from 'antd-mobile';
import { clearData } from '@/reduxs/redux.app1'
import classNames from 'classnames';
import axios from 'axios'
import { oss } from '@/config/oss'
import moment from 'moment';
import { get } from 'lodash';

const propTypes = {
    
};

@connect(
    state => state,
    { }
)
class PostText extends Component {
    

    static propTypes = propTypes

    constructor(props) {
        super(props)
        this.state = {
            text: '',
            location: '',

        }
       
    }

    componentDidMount() {
    }

   
    handlePostText = () => {
        const { text, location } = this.state;
        if (!text) {
            Toast.fail('Please input text!');
            return
        }
        axios.post('/uploadText', { text, location, type: 'text' }).then( res => {
            if (res.data.msg === 'Success') {
                Toast.hide();
                Toast.success('Upload success!');
                this.props.history.push('/console')
            }
        })
    }

    handleInputTextChange = (e) => {
        this.setState({
            text: e
        })
    }

    handleInputLocationChange = (e) => {
        this.setState({
            location: e
        })
    }
    handleBack = () => {
        const { history } = this.props;
        history.goBack && history.goBack()
    }

    render () {
        return (
            <div>
                <NavBar
                    icon={<Icon type="left" />}
                    onLeftClick={this.handleBack}
                    mode="light"
                    rightContent={<Button size="small" type="primary" onClick={this.handlePostText}>Post</Button>}
                >
                    Text
                </NavBar>
                <TextareaItem rows={10} placeholder="写点什么..." onChange={this.handleInputTextChange} />
                <InputItem placeholder="位置" onChange={this.handleInputLocationChange} />
            </div>
        )
    }
}
export default PostText;