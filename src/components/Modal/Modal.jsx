import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { ModalBox, ModalOverlay } from './Modal.styled';

const modalRoot = document.getElementById('modal-root')

export const Modal = ({ src, id, onClose }) => {
    
    useEffect(() => {

        document.addEventListener('keydown', closeModal);

        return (() => {
            document.removeEventListener('keydown', closeModal);
        })
    });

    const closeModal = ({ target, currentTarget,code }) => {
        if (target === currentTarget || code === 'Escape') {
            onClose();
        } 
    }



    return createPortal(
            <ModalOverlay onClick={closeModal}>
                <ModalBox >
                    <img src={src} alt={id} />
                </ModalBox>
            </ModalOverlay>,
            modalRoot
        )
    
}


Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    src: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
}