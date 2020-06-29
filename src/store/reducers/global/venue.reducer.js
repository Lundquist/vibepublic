import * as Actions from 'app/store/actions';

const initialState = {
    coverImage: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpixnio.com%2Ffree-images%2F2017%2F09%2F23%2F2017-09-23-14-24-17.jpg&f=1&nofb=1',
    gallery: [
        {
            id: 1,
            imgSrc: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpimg.mycdn.me%2FgetImage%3FdisableStub%3Dtrue%26type%3DVIDEO_S_720%26url%3Dhttps%253A%252F%252Fvdp.mycdn.me%252FgetImage%253Fid%253D295793265315%2526idx%253D4%2526thumbType%253D32%2526f%253D1%26signatureToken%3D0L-wwqRvO_AigXEoQRmALQ&f=1&nofb=1'
        },
        {
            id: 2,
            imgSrc: 'https://pimg.mycdn.me/getImage?disableStub=true&type=VIDEO_S_720&url=http%3A%2F%2Fi.mycdn.me%2Fimage%3Fid%3D858274401699%26t%3D50%26plc%3DWEB%26tkn%3D*EYgXDJ0pia6d2nKJjV8cjvg-V3I&signatureToken=pTy8Mks73T-Ru9w2OvK2dw'
        },
        {
            id: 3,
            imgSrc: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpimg.mycdn.me%2FgetImage%3FdisableStub%3Dtrue%26type%3DVIDEO_S_720%26skipBlack%3Dtrue%26url%3Dhttp%253A%252F%252Fi.mycdn.me%252Fimage%253Fid%253D857614818211%2526t%253D50%2526plc%253DWEB%2526tkn%253D*R5AAAqhlrgOHIic2eiARVdmVwbA%26signatureToken%3DdXF-RC_Q3ou8l_9awOFZBw&f=1&nofb=1'
        }
    ]
};

const venueReducer = function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
  
        case Actions.REMOVE_GALLERY_IMAGE: {
            const imageId = payload;
            const imageList = state.gallery.filter((image) => image.id !== imageId);

            return {
                ...state,
                gallery: imageList
            };
        }
    
        default: {
            return state;
        }
    }
};

export default venueReducer;
