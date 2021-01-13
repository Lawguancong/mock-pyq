import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, ImagePicker } from 'antd-mobile';
import classNames from 'classnames';
import axios from 'axios'
import { oss } from '@/config/oss'


const propTypes = {
};

@connect(
    state => state,
)
class Map extends Component {
    static propTypes = propTypes

    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount () {
        let iframe = document.getElementById('test').contentWindow;
        document.getElementById('test').onload = function() {
            iframe.postMessage('hello','https://m.amap.com/picker/');
        };
        window.addEventListener("message", function(e) {
            alert('您选择了:' + e.data.name + ',' + e.data.location)
        }, false);
    }
    getLocation = () => {
      
    }
    render() {
        return (
            <div style={{ height:'95%', width: '95%'}}>
                <iframe id="test" style={{ height: '100%', width: '100%'}} src="https://m.amap.com/picker/?center=113.327222,23.095533&key=ae36813c5e6d0c00cfeefdfff6f1cb35&total=50&keywords=写字楼,小区,学校"></iframe>
                {/* <iframe id="test" style={{ height: '100%', width: '100%'}} src="https://m.amap.com/picker/?center=109.479622,30.294622&key=ae36813c5e6d0c00cfeefdfff6f1cb35&total=50"></iframe> */}
            </div>

        )
    }
}
export default Map;