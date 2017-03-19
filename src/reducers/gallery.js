import {
    GALLERY_LOADING,
    GALLERY_LOADED,
    GALLERY_LOADING_ERROR
} from '../constants/actionTypes'

const initialState = {
    data: [],
    loading: false,
    error: false,
};

function galleryState(state = initialState, action) {
    switch (action.type) {
        case GALLERY_LOADING:
            return {
                ...state,
                loading: true,
                error: false,
                data: []
            };
        case GALLERY_LOADING_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                data: []
            };
        case GALLERY_LOADED:
            return {
                ...state,
                loading: false,
                error: false,
                data: action.items,
            };
        default:
            return state
    }
}

export default galleryState