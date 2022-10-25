import { GalleryItem } from "components/ImageGalleryItem/GalleryItem"


export const ImageGallery = ({ images, onClick }) => {
    return (
        
        <ul>
            {images.map(image =>
                <GalleryItem key={image.id} image={image} onClick={onClick} />)}
        </ul>
        
    )
}
