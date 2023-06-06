import { SearchBar } from '../SearchBar/SearchBar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Loader } from '../Loader/Loader';
import { Button } from '../Button/Button';

export const ImagePending = ({
  onSubmit,
  page,
  items,
  totalHits,
  onNextPage,
}) => (
  <div className="App">
    <SearchBar onSubmit={onSubmit} />
    <ImageGallery page={page} items={items} />
    <Loader />
    {totalHits > 12 && <Button onClick={onNextPage} />}
  </div>
);
