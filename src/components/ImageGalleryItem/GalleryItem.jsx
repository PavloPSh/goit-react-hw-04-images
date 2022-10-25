

export const GalleryItem = ({image, onClick}) => {
    const { id, webformatURL, largeImageURL } = image;
    return (
        <li onClick={() =>{onClick(largeImageURL,id)}}>
            <img src={webformatURL} alt={id} />
        </li>
    )
}