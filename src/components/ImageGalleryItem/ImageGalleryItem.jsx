import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../Modal/Modal';
import './ImageGalleryItem.css';

export class ImageGalleryItem extends Component {
  state = {
    shownModal: false,
  };

  toggleModal = () => {
    this.setState(prevState => ({
      shownModal: !prevState.shownModal,
    }));
  };

  render() {
    const { item } = this.props;
    const { webformatURL } = item;
    const { shownModal } = this.state;

    return (
      <li className="ImageGalleryItem">
        <img
          onClick={this.toggleModal}
          className="ImageGalleryItem-image"
          src={webformatURL}
          alt="img"
        />
        {shownModal && <Modal onClose={this.toggleModal} image={item} />}
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  item: PropTypes.object,
};
