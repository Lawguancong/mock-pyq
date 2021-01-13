import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, ImagePicker, Icon, Popover, NavBar, TabBar, Toast, Modal, WingBlank, InputItem, TextareaItem } from 'antd-mobile';
import { clearData } from '@/reduxs/redux.app1'
import classNames from 'classnames';
import axios from 'axios'
import { oss } from '@/config/oss'
import moment from 'moment';
import { filter } from 'lodash';
import { OSS_FILE } from '@/config/config'
import { isApple } from '@/util/formatter'
        

@connect(
    state => state,
    { }
)
class PostPhoto extends Component {
    
    static propTypes = {

    };

    
    constructor(props) {
        super(props)
        this.state = {
            imageFiles: [],
            previewVisible: false,
            previewImage: '',
            platform: 'android', // 默认安卓 android
            uploadUrl: [],
            location: '',
            text: '',
        }
    }

    componentDidMount() {
        this.setState({
            platform: isApple(navigator) ? 'ios' : 'android'
        })
    }

    handleBack = () => {
        const { history } = this.props;
        history.goBack && history.goBack()
    }

    handleChangeFail = () => {
        Toast.fail('Please select image!');
        return;
    }
    handlePostPhoto = async () => {
        const _this = this;
        const { imageFiles, text, location } = this.state;
        if (!imageFiles.length) {
            Toast.fail('Select image fail, please select again!');
            return;
        }
        Toast.loading('Uploading...', 3000);
        let uploadUrl = []
        imageFiles.map(async (item, idx) => {
            const urlData = item.url;
            const base64 = urlData.split(',').pop();
            const fileType = urlData.split(';').shift().split(':').pop();
            const imageUrl = `${OSS_FILE}/uploads/postPhoto/${moment().format('YYYYMMDD')}/${new Date().getTime()}.${fileType.split('/').pop()}`;
            const buffer = Buffer.from(base64, 'base64'); // base64 转 buffer
            await oss.put(imageUrl, buffer).then(res => {
                const URL = res.url.replace(/http:\/\//g, 'https://')
                uploadUrl[idx] = URL
                if (filter(uploadUrl).length === imageFiles.length) {
                    this.setState({
                        uploadUrl
                    })
                    axios.post('/uploadPhoto', { imageUrl: uploadUrl, text, location, type: 'photo' }).then( res => {
                        if (res.data.msg === 'Success') {
                            Toast.hide();
                            Toast.success('Upload success!');
                            _this.props.history.push('/console')
                        }
                    })
                }
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
    handleClickImage = (index, fs) => {
        this.setState({
            previewVisible: true,
            previewImage: fs[index].url,
        })
    }
    handleClosePreviewImage = () => {
        this.setState({
            previewVisible: false,
        }, () => {
            this.setState({
                previewImage: '',
            })
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
    render() {
        const { imageFiles, previewVisible, previewImage, platform } = this.state;
        
        return (
            <div>
                <NavBar
                    icon={<Icon type="left" />}
                    onLeftClick={this.handleBack}
                    mode="light"
                    rightContent={<Button size="small" type="primary" onClick={this.handlePostPhoto}>Post</Button>}
                >
                    Photo
                </NavBar>
                <TextareaItem rows={10} placeholder="写点什么..." onChange={this.handleInputTextChange} />
                <br/>
                <InputItem placeholder="位置" onChange={this.handleInputLocationChange} />
                <ImagePicker
                    length="3"
                    files={imageFiles}
                    onChange={this.handleChangeImage}
                    onImageClick={this.handleClickImage}
                    selectable={imageFiles.length < 9}
                    multiple={true}
                    onFail={this.handleChangeFail}
                />
                <Modal
                    visible={previewVisible}
                    maskClosable={true}
                    transparent={true}
                    onClose={this.handleClosePreviewImage}
                    platform={platform}
                >
                    <img style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        )
    }
}
export default PostPhoto;