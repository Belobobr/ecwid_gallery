import {
    GALLERY_LOADING,
    GALLERY_LOADED,
    GALLERY_LOADING_ERROR
} from '../constants/actionTypes';
import {status, json} from './helper';
import {
    AsyncStorage
} from 'react-native';

const GALLERY_KEY = 'GALLERY_KEY';

export function loadGallery() {
    return (dispatch, getState) => {
        var galleryItems = getState().gallery.data.slice();
        if (galleryItems.length == 0) {
            dispatch(handleGalleryLoading());

            AsyncStorage.getItem(GALLERY_KEY).then((galleryData) => {
                const cachedData = JSON.parse(galleryData);
                if (cachedData != null) {
                    console.log('Load gallery from storage', cachedData);
                    dispatch(handleGalleryLoaded(cachedData));
                }
            });
        }

        let url = `https://s3.amazonaws.com/vgv-public/tests/astro-native/task.json`;
        fetch(url)
            .then(status)
            .then(json)
            .then(function (data) {
                console.log('Request gallery succeeded with JSON response', data);
                dispatch(handleGalleryLoaded(data));

                AsyncStorage.setItem(GALLERY_KEY, JSON.stringify(data)).then(() => {
                    console.log('Save gallery to storage', data);
                });
            })
            .catch(function (error) {
                console.log('Request gallery failed', error);
                dispatch(handleGalleryLoadingError(error));
            });
    }
}

function handleGalleryLoading() {
    return {type: GALLERY_LOADING}
}

function handleGalleryLoaded(items) {
    return {type: GALLERY_LOADED, items}
}

function handleGalleryLoadingError(error) {
    return {type: GALLERY_LOADING_ERROR, error}
}

