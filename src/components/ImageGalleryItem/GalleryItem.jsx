import { ImageItem } from "./ImageItem.styled";

export const GalleryItem = ({image, onClick}) => {
    const { id, webformatURL, largeImageURL } = image;
    return (
        <ImageItem onClick={() =>{onClick(largeImageURL,id)}}>
            <img src={webformatURL} alt={id} />
        </ImageItem>
    )
}