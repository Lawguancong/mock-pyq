import React, { Component } from 'react'
import { get } from 'lodash'

export default class NoMatch extends Component {

    static propTypes = {
    }
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
    render() {
        const { location } = this.props;
        return (
            <div>
                <h3>
                    No match for <code>{location.pathname}</code>
                </h3>
            </div>
        );
    }
}