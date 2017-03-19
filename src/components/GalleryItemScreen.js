import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions
} from 'react-native';
import {
    CONTENT_MARGIN,
    HORIZONTAL_CONTENT_MARGIN,
    STATUS_BAR_SIZE
} from './../constants/dimensions';
import Toolbar from './Toolbar';
import Pager from './pager';
import _get from 'lodash.get';
const {width} = Dimensions.get('window');

export default class GalleryItemScreen extends Component {
    render() {
        const routes = this.props.navigation.routes;
        const galleryItemIndex = routes[routes.length - 1].index;

        return <View style={styles.container}>
            <Toolbar icon={require('./../images/icon_back_black.png')}
                     onIconClicked={this.props.handleBackAction}
                     style={styles.toolbar}
                     title={'Gallery'}/>

            <Pager style={styles.galleryItemsContainer}
                   initialPage={galleryItemIndex != undefined ? galleryItemIndex : 0}>
                {
                    this.props.gallery.data.map((galleryItem, index) => {
                        return <GalleryItem galleryItem={galleryItem} key={index}/>
                    })
                }
            </Pager>
        </View>
    }
}

const GalleryItem = ({galleryItem}) => {
    return <ScrollView
        style={styles.galleryItemContainer}
    >
        <Text style={styles.title}>
            {_get(galleryItem, 'title')}
        </Text>

        <Image
            style={styles.avatar}
            source={{uri: _get(galleryItem, 'thumbnailUrl')}}
        />

        <Text style={styles.description}>
            {_get(galleryItem, 'description')}
        </Text>
    </ScrollView>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    toolbar: {
        marginTop: STATUS_BAR_SIZE,
    },
    galleryItemsContainer: {
        flex: 1,
    },
    galleryItemContainer: {
        flex: 1,
        width: width,
    },
    avatar: {
        marginTop: CONTENT_MARGIN,
        marginLeft: CONTENT_MARGIN,
        marginRight: CONTENT_MARGIN,
        height: 320,
    },
    title: {
        fontSize: 16,
        textAlign: 'left',
        color: '#000000',
        margin: HORIZONTAL_CONTENT_MARGIN,
    },
    description: {
        fontSize: 14,
        margin: CONTENT_MARGIN,
    }
});
