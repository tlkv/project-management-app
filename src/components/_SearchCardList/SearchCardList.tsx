import { useContext } from 'react';
import SearchCard from '../_SearchCard/SearchCard';
import './SearchCardList.scss';
import { AppContext } from '../../App';

function SearchCardList() {
  const { apiPhotos } = useContext(AppContext);
  const searchCards = apiPhotos.photos.photo;

  return (
    <>
      {!searchCards.length && <div className="search-cards-err">No results</div>}
      <div className="search-cards-container">
        {searchCards.map(({ datetaken, id, tags, url_l: url, title }, ind) => (
          <SearchCard
            datetaken={datetaken}
            id={id}
            tags={tags}
            url_l={url}
            title={title}
            key={`${url}_${ind + 1}`}
          />
        ))}
      </div>
    </>
  );
}

export default SearchCardList;
