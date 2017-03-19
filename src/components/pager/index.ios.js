import React, {Component} from 'react';
import {
    ScrollView,
    Dimensions
} from 'react-native'
var {width} = Dimensions.get('window');

export default class Pager extends Component {

    render() {
        return <ScrollView
            style={this.props.style}
            enableEmptySections={true}
            horizontal={true}
            pagingEnabled={true}
            contentOffset={{x: this.props.initialPage * width, y: 0}}
        >
            {this.props.children}
        </ScrollView>
    }
}
