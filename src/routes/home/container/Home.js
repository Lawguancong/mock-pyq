import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { get, map, concat } from 'lodash';
import { ComShareList, ComCoverAvatar, ComShareFooter } from '@/components'


import './Home.scss'

@connect(
    state => state,
    { }
)
class Home extends Component {
    
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
                const s_home_contentHeight = document.getElementsByClassName('s-home-content')[0].offsetHeight
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

    render() {
        const { dataList, loading, noMoreData } = this.state;
        return (
            <div className='s-home-content'>
                <ComCoverAvatar />  
                <ComShareList dataList={dataList} />
                <ComShareFooter loading={loading} noMoreData={noMoreData} />
                {/* <img style={{ width: '100%' }} src="https://lgc-life-bucket.oss-cn-shenzhen.aliyuncs.com/localhost/uploads/postPhoto/20190825/1566719369281.jpeg?x-oss-process=image/resize,w_900,h_900/quality,q_95" alt="" /> */}
                {/* <img style={{ width: '100%' }} src="https://inews.gtimg.com/newsapp_ls/0/10114818027_870492/0" alt="" /> */}
            </div>
        )
    }
}
export default Home;