import React, { Component } from 'react'
import { Icon } from 'antd-mobile';


export default class ComLoading extends Component {
  
    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <Icon type="loading" theme="twoTone" />
            </div>
        )
    }
}