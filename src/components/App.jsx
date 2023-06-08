import React, { useState, useEffect } from 'react';
import { fetchImages } from './fetchImages/fetchImages';
import { SearchBar } from './SearchBar/SearchBar';
import { ImagePending } from './ImageStatuses/ImagePending';
import { ImageRejected } from './ImageStatuses/ImageRejected';
import { ImageResolved } from './ImageStatuses/ImageResolved';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

let page = 1;

export const App = () => {
  const [inputData, setInputData] = useState('');
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('idle');
  const [totalHits, setTotalHits] = useState(0);
  const [shouldScroll, setShouldScroll] = useState(false);

  const handleSubmit = async inputData => {
    page = 1;
    if (inputData.trim() === '') {
      return toast.error('You cannot search by empty field, try again.');
    } else {
      try {
        setStatus({ status: 'pending' });
        const { totalHits, hits } = await fetchImages(inputData, page);
        if (hits.length < 1) {
          setStatus({ status: 'idle' });
          return toast.warn(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        } else {
          setItems(hits);
          setInputData(inputData);
          setTotalHits(totalHits);
          setStatus('resolved');
        }
      } catch (error) {
        setStatus('rejected');
      }
    }
  };

  const onNextPage = async () => {
    setStatus('pending');

    try {
      const { hits } = await fetchImages(inputData, (page += 1));
      setItems(prevItems => [...prevItems, ...hits]);
      setStatus('resolved');
      setShouldScroll(true);
    } catch (error) {
      setStatus('rejected');
    }
  };

  useEffect(() => {
    if (shouldScroll) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
      setShouldScroll(false);
    }
  }, [shouldScroll]);

  if (status === 'idle') {
    return (
      <>
        <ToastContainer />
        <SearchBar onSubmit={handleSubmit} />
      </>
    );
  }

  if (status === 'pending') {
    return (
      <>
        <ToastContainer />
        <ImagePending
          onSubmit={handleSubmit}
          page={page}
          items={items}
          totalHits={totalHits}
          onNextPage={onNextPage}
        />
      </>
    );
  }

  if (status === 'rejected') {
    return (
      <>
        <ToastContainer />
        <ImageRejected onSubmit={handleSubmit} />;
      </>
    );
  }

  if (status === 'resolved') {
    return (
      <>
        <ToastContainer />
        <ImageResolved
          onSubmit={handleSubmit}
          page={page}
          items={items}
          totalHits={totalHits}
          onNextPage={onNextPage}
        />
      </>
    );
  }
};
