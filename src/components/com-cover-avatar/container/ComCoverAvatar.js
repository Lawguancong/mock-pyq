import React, { Component } from 'react'
import { BUCKET_URL, COVER_URL, AVATAR_URL } from '@/config/config'
import { compressImage } from '@/util/formatter'


export default class ComCoverAvatar extends Component {

    static propTypes = {
    }
    constructor(props) {
        super(props)
        this.state = {
            COVER_URL: compressImage(`${BUCKET_URL}${COVER_URL}`, 700),
            AVATAR_URL: compressImage(`${BUCKET_URL}${AVATAR_URL}`, 600),
        }
    }
    render() {
        const { COVER_URL, AVATAR_URL } = this.state;
        return (
            <div style={{ position: 'relative', width: '100%', top: 0 }}>
                <img src={COVER_URL} style={{ width: '100%' }} alt='' />
                <img src={AVATAR_URL} style={{ width: '20%', position: 'absolute', bottom: '-10%', right: '10%', 'borderRadius': '100%' }} alt='' />
            </div>
        )
    }
}