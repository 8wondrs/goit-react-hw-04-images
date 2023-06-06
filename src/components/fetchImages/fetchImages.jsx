import axios from 'axios';

export async function fetchImages(inputData, page) {
  const searchParams = new URLSearchParams({
    key: '35728132-a870f2b2aed40fb764b4c839c',
    q: inputData,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 12,
    page,
  });

  const images = await axios.get(`https://pixabay.com/api/?${searchParams}`);

  return images.data;
}
