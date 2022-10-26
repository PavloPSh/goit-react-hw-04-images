import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { ModalBox, ModalOverlay } from './Modal.styled';



const modalRoot = document.getElementById('modal-root')

export class Modal extends Component {

    componentDidMount() {
        document.addEventListener('keydown',this.closeModal)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.closeModal)
    }

    closeModal = ({ target, currentTarget,code }) => {
        if (target === currentTarget || code === 'Escape') {
            this.props.onClose();
        } 
    }

    render() {
        const { src, id } = this.props;
        const { closeModal } = this;
        return createPortal(
            <ModalOverlay onClick={closeModal}>
                <ModalBox >
                    <img src={src} alt={id} />
                </ModalBox>
            </ModalOverlay>,
            modalRoot
        )
    }
}


Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    src: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
}