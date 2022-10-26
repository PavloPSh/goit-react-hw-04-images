import { GalleryItem } from "components/ImageGalleryItem/GalleryItem"
import { ImageGalleryStyle } from "./ImageGallery.styled"


export const ImageGallery = ({ images, onClick }) => {
    return (
        
        <ImageGalleryStyle>
            {images.map(image =>
                <GalleryItem key={image.id} image={image} onClick={onClick} />)}
        </ImageGalleryStyle>
        
    )
}
