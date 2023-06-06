import { ThreeDots } from 'react-loader-spinner';
import './Loader.css';

export const Loader = () => {
  return (
    <div className="Spinner">
      <ThreeDots
        height="125"
        width="125"
        radius="9"
        color="#4fa94d"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
};
