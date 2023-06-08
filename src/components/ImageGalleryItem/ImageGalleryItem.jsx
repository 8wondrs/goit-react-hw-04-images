import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../Modal/Modal';
import './ImageGalleryItem.css';

export const ImageGalleryItem = ({ item }) => {
  const [shownModal, setShownModal] = useState(false);

  const toggleModal = () => {
    setShownModal(prevState => !prevState);
  };

  const { webformatURL } = item;

  return (
    <li className="ImageGalleryItem">
      <img
        onClick={toggleModal}
        className="ImageGalleryItem-image"
        src={webformatURL}
        alt="img"
      />
      {shownModal && <Modal onClose={toggleModal} image={item} />}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
  }),
};
