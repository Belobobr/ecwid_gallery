import React, {Component} from 'react';
import {
    ViewPagerAndroid,
} from 'react-native'

export default class Pager extends Component {

    render() {
        return <ViewPagerAndroid
            style={this.props.style}
            initialPage={parseInt(this.props.initialPage)}
        >
            {this.props.children}

        </ViewPagerAndroid>
    }
}
