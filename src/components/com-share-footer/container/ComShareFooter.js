
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Button, ImagePicker, NavBar, Icon, Popover, TabBar, PullToRefresh, ListView, Card, WingBlank, WhiteSpace, TextareaItem, Modal, Carousel } from 'antd-mobile';
import { get, map, concat } from 'lodash';
import { formatDateToDash } from '@/util/formatter'


export default class ComShareFooter extends Component {

    static propTypes = {
        loading: PropTypes.bool,
        noMoreData: PropTypes.bool,
        
    }

    render() {
        const { loading, noMoreData } = this.props;
        if (loading) {
            return (
                <WingBlank size="lg">
                    <WhiteSpace size="lg" />
                    <div style={{ textAlign: 'center' }}>
                        Loading...<Icon type="loading" theme="twoTone" />
                    </div>
                    <WhiteSpace size="lg" />
                </WingBlank>
            )
        }
        if (noMoreData) {
            return (
                <WingBlank size="lg">
                    <WhiteSpace size="lg" />
                    <div style={{ textAlign: 'center' }}>
                        No More data.
                    </div>
                    <WhiteSpace size="lg" />
                </WingBlank>
            )
        }
        return (
            <WingBlank size="lg">
                <WhiteSpace size="lg" />
                <div style={{ textAlign: 'center', paddingBottom: 15 }} />
                <WhiteSpace size="lg" />
            </WingBlank>
        )
    }
}