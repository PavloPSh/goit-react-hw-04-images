import PropTypes from 'prop-types';

import { ImageItem } from "./ImageItem.styled";

export const GalleryItem = ({image, onClick}) => {
    const { id, webformatURL, largeImageURL } = image;
    return (
        <ImageItem onClick={() =>{onClick(largeImageURL,id)}}>
            <img src={webformatURL} alt={id} />
        </ImageItem>
    )
}


GalleryItem.propTypes = {
    image: PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
    }),
    onClick: PropTypes.func.isRequired,
}
