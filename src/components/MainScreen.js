import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    ActivityIndicator,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import {
    CONTENT_MARGIN,
    STATUS_BAR_SIZE,
    HORIZONTAL_CONTENT_MARGIN
} from './../constants/dimensions';
import Toolbar from './Toolbar';
const {width} = Dimensions.get('window');

export default class MainScreen extends Component {
    constructor(props) {
        super(props);
        this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    }

    componentDidMount() {
        this.props.loadGallery();
    }

    render() {
        const dataSource = this.dataSource.cloneWithRows(this.props.gallery.data);
        const content = <ListView
            enableEmptySections={true}
            contentContainerStyle={styles.list}
            dataSource={dataSource}
            renderRow={(rowData, sectionID, rowID) => {
                return <GalleryItem uri={rowData.thumbnailUrl} index={rowID} handleNavigate={this.props.handleNavigate}/>
            }}
        />;

        const loading = <View style={styles.loading}>
            <ActivityIndicator/>
        </View>;

        var body = this.props.gallery.loading ? loading : content;

        return <View style={styles.container}>
            <Toolbar
                style={styles.toolbar}
                title="Gallery"/>
            {body}
        </View>
    }
}

const GalleryItem = ({uri, index, handleNavigate}) => {
    return <TouchableOpacity style={styles.item} onPress={(()=> {
        var pushMediaItemRoute = {
            type: 'push',
            route: {
                key: 'mediaItem',
                title: 'Media Item',
                index: index,
            },
        };

        handleNavigate(pushMediaItemRoute);
    }).bind(this)}>
        <Image
            style={{flex: 1}}
            source={{uri: uri}}
        />
    </TouchableOpacity>
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    toolbar: {
        marginTop: STATUS_BAR_SIZE,
    },
    avatar: {
        marginTop: CONTENT_MARGIN,
        marginLeft: CONTENT_MARGIN,
        marginRight: CONTENT_MARGIN,
        height: 320,
    },
    list: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#ffffff',
    },
    item: {
        margin: (HORIZONTAL_CONTENT_MARGIN / 2),
        width: (width / 2) - HORIZONTAL_CONTENT_MARGIN,
        height: (width / 2) - HORIZONTAL_CONTENT_MARGIN,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    }
});
