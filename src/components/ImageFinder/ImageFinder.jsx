import { Component } from "react";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ImageGallery } from "components/ImageGallery/ImageGallery";
import { getImages } from "services/imageApi";
import { Searchbar } from "components/Searchbar/Searchbar";
import { LoadMoreButton } from "components/LoadMoreButton/LoadButton";
import { Modal } from "components/Modal/Modal";
import { Loader } from "components/Loader/Loader";

import { ImageFinderBox } from "./ImageFinderBox.styled";

export class ImageFinder extends Component {
    state = {
        images: [],
        page: 1,
        search:'',
        loading: false,
        error: null,
        modalOpen: false,
        modalSrc: "",
        modalId:'',

    }

    // componentDidMount() {
    //     this.fetchImages()
    // }

    componentDidUpdate(_, prevState) {
        const { page, search } = this.state;
        if (prevState.search !== search || prevState.page !== page) {
            this.fetchImages();
        }
    }

    async fetchImages() {
        const { page, search } = this.state;
        
        this.setState({
            loading: true,
        });
    
        try {
            const data = await getImages(page, search);
            if (data.totalHits === 0) {
                return toast.error('No image:(')
            }
            this.setState(({ images }) => {
                return {
                    images: [...images, ...data.hits]
                }
            })
        } catch (error) {
            this.setState({ error })
        } finally {
            this.setState({ loading: false })
        }
    }

    onSearch = (search)  => {
        if (search !== this.state.search) {
            this.setState({
                search,
                images: [],
                
             })
        }
    }

    loadMore = () => {
        this.setState(({ page }) => {
            return {
                page: page + 1,
            }
        })
    }

    openModal = (src,id) => {
        this.setState({
            modalOpen: true, 
            modalSrc: src,
            modalId: id,
        })
    }

    closeModal = () => {
        this.setState({
            modalOpen: false,
        })
    }
    
    render() {

        const { images, loading, error, modalOpen,modalSrc,modalId } = this.state;
        const isImages = Boolean(images.length);
        const { closeModal, onSearch, openModal, loadMore } = this;
        

        return (
            <ImageFinderBox>
                {modalOpen && <Modal onClose={closeModal} src={modalSrc} id={modalId}  />}
                <Searchbar onSubmit={onSearch} />
                {loading && <Loader />}
                {error && <p>Something went wrong...</p>} 
                {isImages && <ImageGallery images={images} onClick={openModal} />}
                {isImages && <LoadMoreButton text={'Load more'} onClick={loadMore} />}
                <ToastContainer autoClose={1500} />
            </ImageFinderBox>
        )
    }
}
