//import config from '../../../config'

export const REMOVE_GALLERY_IMAGE = '[VENUE] REMOVE GALLERY IMAGE';

//const server = config.serverUrl

export function saveCompanyInfo(payload) {
    /*return (dispatch) =>
        request.then((res) => {
            // Handle response status:
            // res.data.status
        });*/
}

export const removeGalleryImage = (payload) => ({ type: REMOVE_GALLERY_IMAGE, payload });
