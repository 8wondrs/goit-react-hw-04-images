import { SearchBar } from '../SearchBar/SearchBar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';

export const ImageResolved = ({
  onSubmit,
  page,
  items,
  totalHits,
  onNextPage,
}) => (
  <div className="App">
    <SearchBar onSubmit={onSubmit} />
    <ImageGallery page={page} items={items} />
    {totalHits > 12 && totalHits > items.length && (
      <Button onClick={onNextPage} />
    )}
  </div>
);
