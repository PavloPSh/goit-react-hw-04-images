import { Component } from "react";

import { InfinitySpin } from "react-loader-spinner";
import { ImageGallery } from "components/ImageGallery/ImageGallery";
import { getImages } from "services/imageApi";
import { Searchbar } from "components/Searchbar/Searchbar";
import { Modal } from "components/Modal/Modal";

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
        

        return (
            <div>
                {modalOpen && <Modal onClose={this.closeModal} src={modalSrc} id={modalId}  />}
                <Searchbar onSubmit={this.onSearch} />
                {loading && <InfinitySpin width='200' color="#4fa94d" />}
                {error && <p>пу-пу-пу</p>} 
                {isImages && <ImageGallery images={images} onClick={this.openModal} />}
                {isImages && <button onClick={this.loadMore}>load more</button>}
            </div>
        )
    }
}
