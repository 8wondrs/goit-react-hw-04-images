import React, { Component } from 'react';
import { fetchImages } from './fetchImages/fetchImages';
import { SearchBar } from './SearchBar/SearchBar';
import { ImagePending } from './ImageStatuses/ImagePending';
import { ImageRejected } from './ImageStatuses/ImageRejected';
import { ImageResolved } from './ImageStatuses/ImageResolved';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

let page = 1;

export class App extends Component {
  state = {
    inputData: '',
    items: [],

    status: 'idle',
    totalHits: 0,
  };

  handleSubmit = async inputData => {
    page = 1;
    if (inputData.trim() === '') {
      return toast.error('You cannot search by empty field, try again.');
    } else {
      try {
        this.setState({ status: 'pending' });
        const { totalHits, hits } = await fetchImages(inputData, page);
        if (hits.length < 1) {
          this.setState({ status: 'idle' });
          return toast.warn(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        } else {
          this.setState({
            items: hits,
            inputData,
            totalHits: totalHits,
            status: 'resolved',
          });
        }
      } catch (error) {
        this.setState({ status: 'rejected' });
      }
    }
  };

  onNextPage = async () => {
    this.setState({ status: 'pending' });

    try {
      const { hits } = await fetchImages(this.state.inputData, (page += 1));
      this.setState(
        prevState => ({
          items: [...prevState.items, ...hits],
          status: 'resolved',
        }),
        () => {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }
      );
    } catch (error) {
      this.setState({ status: 'rejected' });
    }
  };

  render() {
    const { totalHits, status } = this.state;
    if (status === 'idle') {
      return (
        <>
          <ToastContainer />
          <SearchBar onSubmit={this.handleSubmit} />
        </>
      );
    }

    if (status === 'pending') {
      return (
        <>
          <ToastContainer />
          <ImagePending
            onSubmit={this.handleSubmit}
            page={page}
            items={this.state.items}
            totalHits={totalHits}
            onNextPage={this.onNextPage}
          />
        </>
      );
    }

    if (status === 'rejected') {
      return (
        <>
          <ToastContainer />
          <ImageRejected onSubmit={this.handleSubmit} />;
        </>
      );
    }

    if (status === 'resolved') {
      return (
        <>
          <ToastContainer />
          <ImageResolved
            onSubmit={this.handleSubmit}
            page={page}
            items={this.state.items}
            totalHits={totalHits}
            onNextPage={this.onNextPage}
          />
        </>
      );
    }
  }
}

export default App;
