import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux'
import AppStateConnector from './src/store/AppStateConnector'
import configureStore from './src/store/configureStore'

const store = configureStore();

export default class ecwid_gallery extends Component {
  render() {
    return <Provider store={store}>
        <AppStateConnector />
        </Provider>
  }
}

AppRegistry.registerComponent('ecwid_gallery', () => ecwid_gallery);
