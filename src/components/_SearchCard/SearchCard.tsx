import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';
import { SearchCardData } from '../../data/interfaces';
import { SEARCH_INFO } from '../../data/constants';
import './SearchCard.scss';

function SearchCard({ datetaken, id, tags, title, url_l: url }: SearchCardData) {
  const navigate = useNavigate();
  const { dispatchSearchInfo } = useContext(AppContext);

  const showInfo = () => {
    dispatchSearchInfo({
      type: SEARCH_INFO,
      payload: { datetaken, id, tags, title, url_l: url, isShown: true },
    });
    navigate('/_search-details');
  };

  return (
    <div
      className="search-card-item"
      onClick={showInfo}
      onKeyDown={() => {}}
      role="button"
      tabIndex={0}
    >
      <div className="search-card-title">{title}</div>
      <div className="search-card-img-wrapper">
        <img className="search-card-img" src={url} alt="search img" />
      </div>
    </div>
  );
}

export default SearchCard;
