import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { DatePickerView, List, DatePicker, ActivityIndicator, Button, ImagePicker, NavBar, Icon, Toast, ActionSheet, Popover, TabBar, PullToRefresh, ListView, Card, WingBlank, WhiteSpace, TextareaItem, Modal, Carousel } from 'antd-mobile';
import { get, map, concat, find } from 'lodash';
import { formatDateToDash, compressImage, isApple } from '@/util/formatter'
import axios from 'axios'
import moment from 'moment';
import RcViewer from 'rc-viewer'
// import { Player } from 'video-react';
// import ReactPlayer from 'react-player'
// import { ReactPlayer as ReactJsPlayer } from 'reactjs-player';

import "../../../../node_modules/video-react/dist/video-react.css"; 
import './ComShareList.scss'

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
    wrapProps = {
        onTouchStart: e => e.preventDefault(),
    };
}


export default class ComShareList extends Component {

    static propTypes = {
        dataList: PropTypes.array,
        onSearch: PropTypes.func,
        showDelete: PropTypes.bool,
    }

    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            platform: 'android', // 默认安卓 android
            date: ''
        };
    }

    componentDidMount() {
        
    }

    showActionSheetBadge = _id => () => {
        const BUTTONS = ['Delete', 'Update Time', 'Cancel'];
        ActionSheet.showActionSheetWithOptions({
            options: BUTTONS,
            cancelButtonIndex: BUTTONS.length - 1,
            destructiveButtonIndex: BUTTONS.length - 2,
            maskClosable: true,
            wrapProps,
        }, (buttonIndex) => {
            switch (buttonIndex) {
                case 0: 
                    this.handleDelete(_id);
                    break;
                case 1: 
                    this.setState({
                        _id,
                    }, () => {
                        this.handleVisibleChange(true);
                    })
                    break;
                default:
                    break
            }
        });
    }

    handleUpdateDate = () => {
        const postTime = moment(this.state.date) || moment();
        axios.post('/share/edit', { _id: this.state._id, postTime }).then( res => {
            if (res.data.msg === 'Success') {
                const { dataList } = this.state;
                this.props.onSearch && this.props.onSearch('updateDate');
                this.handleVisibleChange(false)
                return Toast.success('Update success!');
            }
            if (res.data.msg === 'Action Fail') {
                return Toast.fail('Update fail!');
            }
        })
    }

    handleDelete = _id => {
        axios.post('/share/delete', { _id }).then( res => {
            if (res.data.msg === 'Success') {
                this.props.onSearch && this.props.onSearch('delete', _id);
                return Toast.success('Delete success!');
            }
            if (res.data.msg === 'Action Fail') {
                return Toast.fail('Delete fail!');
            }
        })
    }
    handleChangeDate = (date) => {
        this.setState({ date });
    };
     
    handleVisibleChange = (visible) => {
        this.setState({ visible })
    }
    render() {
        const { dataList, showDelete } = this.props;
        const { visible, platform, date } = this.state;
        return (
            <div style={{ paddingTop: 50 }}>
                {dataList.map((item) => {
                    const rowsNum = ((get(item, 'text') && get(item, 'text').match(/\n/g)) || []).length + 1;
                    if (item.type === 'text') {
                        return (
                            <WingBlank size="lg" key={item._id}>
                                <WhiteSpace size="lg" />
                                <Card>
                                    <Card.Header
                                        title={<span className='s-share-list__content__postTime'>{formatDateToDash(item.postTime)}</span>}
                                        extra={<span className='s-share-list__content__location'>{item.location}</span>}
                                    />
                                    <Card.Body>
                                        {item.text && <TextareaItem editable={false} defaultValue={item.text} rows={rowsNum} />}
                                    </Card.Body>
                                </Card>
                                {showDelete && <Button onClick={this.showActionSheetBadge(item._id)}>showActionSheet&Badge</Button>}
                                <WhiteSpace size="lg" />
                            </WingBlank>
                        )
                    }
                    if (item.type === 'video') {
                        return (
                            <WingBlank size="lg" key={item._id}>
                                <WhiteSpace size="lg" />
                                <Card>
                                    <Card.Header
                                        title={<span className='s-share-list__content__postTime'>{formatDateToDash(item.postTime)}</span>}
                                        extra={<span className='s-share-list__content__location'>{item.location}</span>}
                                    />
                                    <Card.Body>
                                        {item.text && <TextareaItem editable={false} defaultValue={item.text} rows={rowsNum} />}
                                        {/* 方法一 */}
                                        {/* {isApple(navigator) && <ReactPlayer
                                            url={item.videoUrl}
                                            controls
                                            width='100%'
                                            height='100%'
                                        />}
                                        {!isApple(navigator) && <div style={{ position: 'relative' }}>
                                            <Player
                                                preload='none'
                                                poster={compressImage(item.posterImageUrl, 400)}
                                                src={item.videoUrl}
                                                playsInline={false}
                                                autoPlay={false}
                                                aspectRatio="16:9"
                                            />
                                            <a href={item.videoUrl} target="_blank">
                                                <div className="s-share-list__content__video-img-cover"/>
                                            </a>
                                        </div>} */}

                                        {/* 方法二 */}
                                        {/* <ReactPlayer
                                            // playing={true}
                                            url={item.videoUrl}
                                            controls
                                            width='100%'
                                            height='100%'
                                            poster={compressImage(item.posterImageUrl, 400)}
                                        /> */}
                                        {/* <div style={{ position: 'relative' }}>
                                            <Player
                                                preload='none'
                                                poster={compressImage(item.posterImageUrl, 400)}
                                                src={item.videoUrl}
                                                playsInline={false}
                                                autoPlay={false}
                                                aspectRatio="16:9"
                                            />
                                            
                                            <a href={item.videoUrl} target="_blank">
                                                <div className="s-share-list__content__video-img-cover"/>
                                            </a>
                                        </div> */}

                                        {/* 方法三 */}
                                        <div style={{ position: 'relative' }}>
                                            <video
                                                controls
                                                poster={compressImage(item.posterImageUrl, 400)}
                                                src={item.videoUrl}
                                                width='100%'
                                                height='100%'
                                                preload={true}
                                            ></video>
                                        </div>
                                    </Card.Body>
                                </Card>
                                {showDelete && <Button onClick={this.showActionSheetBadge(item._id)}>showActionSheet&Badge</Button>}
                                <WhiteSpace size="lg" />
                            </WingBlank>
                        )
                    }
                    if (item.type === 'photo') {
                        if (/1|3|6|9/.test(get(item, 'imageUrl.length'))) {
                            return (
                                <WingBlank size="lg" key={item._id}>
                                    <WhiteSpace size="lg" />
                                    <Card>
                                        <Card.Header
                                            title={<span className='s-share-list__content__postTime'>{formatDateToDash(item.postTime)}</span>}
                                            extra={<span className='s-share-list__content__location'>{item.location}</span>}
                                        />
                                        <Card.Body>
                                            {item.text && <TextareaItem editable={false} defaultValue={item.text} rows={rowsNum} />}
                                            <RcViewer options={{
                                                // url(image) {
                                                //     return image.src.replace('?x-oss-process=image/resize,w_500,h_500/quality,q_80', '?x-oss-process=image/quality,q_90');
                                                // },
                                                title: false,
                                            }} ref='viewer'>
                                                <div className={`square-${get(item, 'imageUrl.length')}`}>
                                                    <ul className={`square-inner-${get(item, 'imageUrl.length')} flex`}>
                                                        {get(item, 'imageUrl').map((val, index) => (
                                                            <li key={val}>
                                                                <img src={compressImage(val, 900, 95)} alt="" />
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </RcViewer>
                                        </Card.Body>
                                    </Card>
                                    {showDelete && <Button onClick={this.showActionSheetBadge(item._id)}>showActionSheet&Badge</Button>}
                                    <WhiteSpace size="lg" />
                                </WingBlank>
                            )
                        }
                    }
                })}
                <Modal
                    visible={visible}
                    maskClosable={true}
                    transparent={true}
                    onClose={this.handleVisibleChange}
                    platform={platform}
                    footer={
                        [
                            { text: 'Cancel', onPress: () => { this.handleVisibleChange(false)} },
                            { text: 'Ok', onPress: () => { this.handleUpdateDate()} }
                        ]
                    }
                >
                    <DatePickerView
                        value={date}
                        onChange={this.handleChangeDate}
                    />
                </Modal>
            </div>
        )
    }
}