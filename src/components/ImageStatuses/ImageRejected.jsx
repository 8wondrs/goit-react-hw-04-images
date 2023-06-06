import { SearchBar } from '../SearchBar/SearchBar';

export const ImageRejected = ({ onSubmit }) => (
  <div className="App">
    <SearchBar onSubmit={onSubmit} />
    <p>Something wrong, try later</p>
  </div>
);
