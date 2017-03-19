import React, {Component} from 'react'
import MainScreen from './MainScreen';
import GalleryItemScreen from './GalleryItemScreen';

import {
    BackAndroid,
    NavigationExperimental
} from 'react-native'

const {
    CardStack: NavigationCardStack
} = NavigationExperimental;

class SocialNetworkApp extends Component {
    constructor(props) {
        super(props);
        this.renderScene = this.renderScene.bind(this);
        this.handleBackAction = this.handleBackAction.bind(this)
    }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.handleBackAction)
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this.handleBackAction)
    }

    renderScene(navigationProps) {
        const {route} = navigationProps.scene;
        switch (route.key) {
            case 'main':
                return <MainScreen {...this.props} handleNavigate={this.handleNavigate.bind(this)}/>;
            case 'mediaItem':
                return <GalleryItemScreen {...this.props} handleNavigate={this.handleNavigate.bind(this)}
                                          handleBackAction={this.handleBackAction.bind(this)}/>;
        }
    }

    handleBackAction() {
        if (this.props.navigation.index === 0) {
            return false
        }
        this.props.popRoute();
        return true
    }

    handleNavigate(action) {
        switch (action && action.type) {
            case 'push':
                this.props.pushRoute(action.route);
                return true;
            case 'back':
            case 'pop':
                return this.handleBackAction();
            case 'reset':
                this.props.resetRoutes(action.routes, action.index);
            default:
                return false
        }
    }

    render() {
        return (
            <NavigationCardStack
                navigationState={this.props.navigation}
                onNavigate={this.handleNavigate.bind(this)}
                renderScene={this.renderScene}
                onNavigateBack={this.handleBackAction}
            />
        )
    }
}

export default SocialNetworkApp