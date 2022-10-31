import { useState,useEffect } from "react";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ImageGallery } from "components/ImageGallery/ImageGallery";
import { getImages } from "services/imageApi";
import { Searchbar } from "components/Searchbar/Searchbar";
import { LoadMoreButton } from "components/LoadMoreButton/LoadButton";
import { Modal } from "components/Modal/Modal";
import { Loader } from "components/Loader/Loader";

import { ImageFinderBox } from "./ImageFinderBox.styled";


export const ImageFinder = () => {
    
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const [searchInput, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalSrc, setModalSrc] = useState('');
    const [modalId, setModalId] = useState(0);

    useEffect(() => {
        
        const fetchImages = async () => {

            if (searchInput === '') {
                return;
            }
    
            setLoading(true);
    
            try {
                const data = await getImages(page, searchInput);

                if (data.totalHits === 0) {
                    return toast.error('No image:(')
                };

                setImages((images) => {
                    return [...images, ...data.hits]
                });

                
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();

    }, [page, searchInput]);
    

    

    const loadMore = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const openModal = (src, id) => {
        setModalOpen(true);
        setModalSrc(src);
        setModalId(id);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const onSearch = search => {

        if (search !== searchInput) {
            setSearch(search);
            setImages([]);
            setPage(1);
        }
    };

    const isImages = Boolean(images.length);


    return (
        <ImageFinderBox>
            {modalOpen && <Modal onClose={() => { closeModal() }} src={modalSrc} id={modalId} />}
            <Searchbar onSubmit={onSearch} />
            {loading && <Loader />}
            {error && <p>Something went wrong...</p>}
            {isImages && <ImageGallery images={images} onClick={openModal} />}
            {isImages && <LoadMoreButton text={'Load more'} onClick={loadMore} />}
            <ToastContainer autoClose={1500} />
        </ImageFinderBox>
    )
};


