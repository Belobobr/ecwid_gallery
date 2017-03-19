import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import SocialNetworkApp from '../components/SocialNetworkApp'
import * as navigationActionCreators from '../actions/navigation'
import * as galleryActionCreators from '../actions/gallery';

function mapStateToProps(state) {
    return {
        navigation: state.navigation,
        gallery: state.gallery,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        Object.assign(
            {},
            navigationActionCreators,
            galleryActionCreators
        ), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SocialNetworkApp)