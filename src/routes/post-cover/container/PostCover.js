
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, ImagePicker, Icon, Popover, NavBar, TabBar, Toast, Modal, WingBlank, InputItem, TextareaItem } from 'antd-mobile';
import axios from 'axios'
import { oss } from '@/config/oss'
import { COVER_URL } from '@/config/config'

@connect(
    state => state,
    { }
)
class PostCover extends Component {
    
    static propTypes = {

    };

    
    constructor(props) {
        super(props)
        this.state = {
            imageFiles: [],
        }
    }

    componentDidMount() {
    }

    handleBack = () => {
        const { history } = this.props;
        history.goBack && history.goBack()
    }

    handleChangeFail = () => {
        Toast.fail('Please select image!');
        return;
    }
    handlePostCover = async () => {
        const _this = this;
        const { imageFiles } = this.state;
        if (!imageFiles.length) {
            Toast.fail('Select image fail, please select again!');
            return;
        }
        Toast.loading('Uploading...', 30);
        imageFiles.map((item) => {
            const urlData = item.url;
            const base64 = urlData.split(',').pop();
            const imageUrl = COVER_URL;
            const buffer = Buffer.from(base64, 'base64'); // base64 转 buffer
            oss.put(imageUrl, buffer).then(res => {
                Toast.hide();
                Toast.success('Upload success!');
                this.props.history.push('/console')
            }).catch((err) => {
                // console.log(err);
            });
        })
    }

    handleChangeImage = (imageFiles, type, index) => {
        this.setState({
            imageFiles,
        });
    }
  
    render() {
        const { imageFiles } = this.state;
        return (
            <div>
                <NavBar
                    icon={<Icon type="left" />}
                    onLeftClick={this.handleBack}
                    mode="light"
                    rightContent={<Button size="small" type="primary" onClick={this.handlePostCover}>Post</Button>}
                >
                    Cover
                </NavBar>
                <ImagePicker
                    length="1"
                    files={imageFiles}
                    onChange={this.handleChangeImage}
                    selectable={imageFiles.length < 1}
                    onFail={this.handleChangeFail}
                />
            </div>
        )
    }
}
export default PostCover;