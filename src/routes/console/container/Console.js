import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, ImagePicker, NavBar, Icon, Popover, TabBar, PullToRefresh, ListView, Card, WingBlank, WhiteSpace, TextareaItem, Modal, Carousel } from 'antd-mobile';
import classNames from 'classnames';
import axios from 'axios'
import PropTypes from 'prop-types';
import { get, map, concat, filter } from 'lodash';
import { ComShareList, ComCoverAvatar, ComShareFooter } from '@/components'
import './Console.scss'


const Item = Popover.Item;
@connect(
    state => state,
    { }
)
class Console extends Component {
    
    static propTypes = {

    };

    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            dataList: [],
            useBodyScroll: false,
            previewVisible: false,
            platform: 'android', // 默认安卓 android
            previewImage: '',
            pagination: { page: 1, size: 3 },
            distanceToRefresh: 80, // 刷新height
            loading: false,
            noMoreData: false,
        }
    }

    componentDidMount () {
        this.loadData();
        this.scrollToRefresh();

    }

    scrollToRefresh = () => {
        // 防抖与节流
        let timer;
        window.onscroll = () => {
            timer && clearTimeout(timer)
            timer = setTimeout(() => {
                const { distanceToRefresh, loading, noMoreData } = this.state;
                const rootHeight = (document.documentElement.scrollTop || document.body.scrollTop) + document.getElementById('root').offsetHeight 
                const s_home_contentHeight = document.getElementsByClassName('s-console-content')[0].offsetHeight
                if (!loading && !noMoreData && (rootHeight > s_home_contentHeight - distanceToRefresh)) {
                    this.setState({
                        loading: true,
                        pagination: {
                            ...this.state.pagination,
                            page: this.state.pagination.page + 1,
                        }
                    }, () => {
                        this.loadData();
                        timer = undefined;
                        return;
                    });
                }
                timer = undefined;
            }, 50);
        }
    }

    loadData = () => {
        const { pagination, dataList } = this.state;
        axios.get('/homeQuery', { params: pagination }).then(res => {
            if (get(res, 'data.msg') === 'Success') {
                this.setState({
                    dataList: concat(dataList, get(res, 'data.data.data')),
                    loading: false,
                })
            }
            if (get(res, 'data.msg') === 'No more data') {
                this.setState({
                    loading: false,
                    noMoreData: true,
                })
            }
        })
    }
    handleSelect = (opt) => {
        this.setState({
            visible: false,
        }, () => {
            switch (opt.props.value) {
                case 'text':
                    this.props.history.push('/postText')
                    break;
                case 'photo':
                    this.props.history.push('/postPhoto')
                    break;
                case 'video':
                    this.props.history.push('/postVideo')
                    break;
                case 'cover':
                    this.props.history.push('/postCover')
                    break;
                case 'avatar':
                    this.props.history.push('/postAvatar')
                    break;
                default:
                    break;
            }
        });
    };
    handleVisibleChange = (visible) => {
        this.setState({
            visible,
        });
    };

   
    renderNavBar = () => {
        const { visible } = this.state;
        const overlay = [
            (<Item key="text" value="text">Text</Item>),
            (<Item key="photo" value="photo">Photo</Item>),
            (<Item key="video" value="video">Video</Item>),
            (<Item key="cover" value="cover">Cover</Item>),
            (<Item key="avatar" value="avatar">Avatar</Item>),
        ];
        const align = {
            overflow: { adjustY: 0, adjustX: 0 },
            offset: [-10, 0],
        }
        const style = {
            height: '100%',
            padding: '0 15px',
            marginRight: '-15px',
            display: 'flex',
            alignItems: 'center',
        }
        return (
            <NavBar
                style={{ position: 'relative', zIndex: '9999' }}
                mode="light"
                rightContent={
                    <Popover
                        mask
                        visible={visible}
                        overlay={overlay}
                        align={align}
                        onVisibleChange={this.handleVisibleChange}
                        onSelect={this.handleSelect}
                    >
                        <div style={style}><Icon type="ellipsis" /></div>
                    </Popover>
                }
            >
                Life
            </NavBar>
        )
    }
    handleSearch = (type, _id) => {
        switch (type) {
            case 'delete':
                const { dataList } = this.state;
                this.setState({
                    dataList: filter(dataList, (i) => i._id !== _id )
                });
                break;
            case 'updateDate':
                this.setState({
                    loading: true,
                    pagination: {
                        ...this.state.pagination,
                        page: 1,
                    },
                    dataList: [],
                }, () => {
                    this.loadData();
                    return;
                });
                break;
            default:
                break;
        }
       
    }
    render() {
        const { dataList, loading, noMoreData } = this.state;

        return (
            <div className='s-console-content'>
                {this.renderNavBar()}
                <ComCoverAvatar />  
                <ComShareList dataList={dataList} onSearch={this.handleSearch} showDelete />
                <ComShareFooter loading={loading} noMoreData={noMoreData} />
            </div>
        )
    }
}
export default Console;