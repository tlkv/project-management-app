import { useContext } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import { AppContext } from '../../App';
import './SearchDetailsPage.scss';

function SearchDetailsPage() {
  const { searchInfo } = useContext(AppContext);
  const { datetaken, id, tags, title, url_l: url, isShown } = searchInfo;

  return (
    <>
      {!isShown && <Navigate to="/" />}
      <h1 className="title">Search Card Details</h1>
      <div>
        <NavLink to="/_search" className="search-back">
          &lt; BACK
        </NavLink>
      </div>
      <div className="search-card-details">
        <div className="search-card-title">{title}</div>
        <div className="search-card-date">
          <span className="modal-descriptor">Date: </span>
          {datetaken}
        </div>
        <div className="search-card-id">
          <span className="modal-descriptor">Id: </span>
          {id}
        </div>
        <div className="search-card-tags">
          <span className="modal-descriptor">Tags: </span>
          {tags}
        </div>
        <div className="search-card-img-wrapper">
          <img className="search-info-img" src={url} alt="search img" />
        </div>
      </div>
    </>
  );
}

export default SearchDetailsPage;
