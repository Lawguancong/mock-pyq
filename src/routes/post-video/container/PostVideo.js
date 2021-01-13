import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, ImagePicker, NavBar, Icon, Popover, TabBar, Toast, TextareaItem, InputItem } from 'antd-mobile';
import { clearData } from '@/reduxs/redux.app1'
import classNames from 'classnames';
import axios from 'axios'
import { oss } from '@/config/oss'
import moment from 'moment';
import { get } from 'lodash';
import { OSS_FILE } from '@/config/config'

const propTypes = {
    
};

@connect(
    state => state,
    { }
)
class PostVideo extends Component {
    

    static propTypes = propTypes

    constructor(props) {
        super(props)
        this.state = {
            text: '',
            location: '',

        }
       
    }

    componentDidMount() {
        let myDate = new Date();
    }

    handlePostVideo = () => {
        const videoFile = document.getElementById("upload-video").files[0]; // js 获取文件对象
        if (!videoFile) return Toast.fail('No select video!');
        const getTime = new Date().getTime()
        const _this = this;
        let reader = new FileReader();
        reader.onload = function () {
            let videoDom = document.getElementById('video');
            videoDom.onloadeddata = function () {
                Toast.loading('Uploading...', 3000);
                let canvas = document.createElement('canvas');
                canvas.width = 300;
                canvas.height = 300 * this.videoHeight / this.videoWidth;
                canvas.getContext('2d').drawImage(this, 0, 0, canvas.width, canvas.height);
                document.getElementById('video-poster').src = canvas.toDataURL();
                const base64 = canvas.toDataURL().split(',').pop();
                const posterImageType = canvas.toDataURL().split(';').shift().split(':').pop().split('/')[1];
                const posterImageUrl = `uploads/postVideo/${moment().format('YYYYMMDD')}/${getTime}_poster.${posterImageType}`;
                const buffer = Buffer.from(base64, 'base64'); // base64 转 buffer
                oss.put(posterImageUrl, buffer).then(res_image => {
                    const { text, location } = _this.state;
                    const videoType = get(videoFile, 'type').split('/')[1];
                    const videoUrl = `${OSS_FILE}/uploads/postVideo/${moment().format('YYYYMMDD')}/${getTime}_video.${videoType}`;
                    oss.put(videoUrl, videoFile).then(res_video => {
                        axios.post('/uploadVideo', {
                            posterImageUrl: res_image.url.replace(/http:\/\//g, 'https://'),
                            videoUrl: res_video.url.replace(/http:\/\//g, 'https://'),
                            type: 'video',
                            text,
                            location, 
                        }).then( res_upload => {
                            if (res_upload.data.msg === 'Success') {
                                Toast.hide();
                                Toast.success('Upload success!');
                                _this.props.history.push('/console') 
                            }
                        })
                    }).catch((err) => {
                        // console.log(err);
                    });
                }).catch((err) => {
                    // console.log(err);
                });

            }
            videoDom.src = reader.result;
        }
        reader.readAsDataURL(videoFile);
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
                    mode="light"
                    onLeftClick={this.handleBack}
                    rightContent={<Button size="small" type="primary" onClick={this.handlePostVideo}>Post</Button>}
                >
                    Video
                </NavBar>
                <TextareaItem rows={10} placeholder="写点什么..." onChange={this.handleInputTextChange} />
                <br/>
                <InputItem placeholder="位置" onChange={this.handleInputLocationChange} />
                <br/>

                <input id="upload-video" type="file" name="myfile" /><span>选择视频</span>
                <div>
                    <img id="video-poster" alt="视频封面" style={{ display: 'none' }} />
                    <video id="video" controls />
                </div>
            </div>
        )
    }
}
export default PostVideo;