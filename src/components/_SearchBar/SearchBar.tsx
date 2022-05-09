import { FormEvent, KeyboardEvent, useContext, useEffect, useState } from 'react';
import './SearchBar.scss';
import logo from '../../assets/svg/logo.svg';
import { AppContext } from '../../App';
import fetchFlickr from '../../api/_flickr';
import {
  API_QUERY,
  SORT_TYPES,
  SORT_DEF,
  UPD_PER_PAGE,
  PREV_PAGE,
  NEXT_PAGE,
  DEF_PAGE,
} from '../../data/constants';

function SearchBar() {
  const { pagination, dispatchPagination, sort, dispatchSort, apiPhotos, dispatchApiQuery } =
    useContext(AppContext);

  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setLoader] = useState(false);

  const perPage = pagination.perpage;
  const currentPage = pagination.page;
  const pagesCount = apiPhotos.photos.pages;

  const handleQuery = async () => {
    setLoader(true);
    const newPhotos = await fetchFlickr(searchValue, sort, perPage, currentPage); // 4th param
    setLoader(false);
    dispatchApiQuery({ type: API_QUERY, payload: newPhotos });
  };

  const handleSelect = async (e: FormEvent<HTMLSelectElement>) => {
    const newSort = (e.target as HTMLInputElement).value;
    dispatchSort({ type: newSort });
  };

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setSearchValue((e.target as HTMLInputElement).value);
  };

  const handleClick = () => {
    dispatchPagination({ type: DEF_PAGE, payload: pagesCount });
  };

  const handleEnterPressed = async (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      dispatchPagination({ type: DEF_PAGE, payload: pagesCount });
    }
  };

  const handlePrev = () => {
    dispatchPagination({ type: PREV_PAGE, payload: pagesCount });
  };

  const handleNext = () => {
    dispatchPagination({ type: NEXT_PAGE, payload: pagesCount });
  };

  const handlePerPage = (e: FormEvent<HTMLInputElement>) => {
    const newPerPage = parseInt((e.target as HTMLInputElement).value, 10);
    dispatchPagination({ type: UPD_PER_PAGE, payload: newPerPage });
  };

  useEffect(() => {
    const content = localStorage.getItem('search-api-value');
    if (content) {
      setSearchValue(content);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('search-api-value', searchValue);
    });
    return () => {
      localStorage.setItem('search-api-value', searchValue);
    };
  }, [searchValue]);

  useEffect(() => {
    if (searchValue) {
      handleQuery();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, pagination]);

  return (
    <>
      <div className="advanced-search-wrapper">
        <input
          type="search"
          value={searchValue}
          onChange={handleChange}
          onKeyDown={handleEnterPressed}
          placeholder="find image by tag"
          className="search-field"
          data-testid="search-field"
        />
        <button
          type="button"
          className="search-button"
          onClick={handleClick}
          data-testid="search-button"
        >
          Search Flickr
        </button>
        {isLoading && <img src={logo} className="loader" alt="logo" />}
      </div>
      <div className="advanced-search-wrapper panel-wrapper">
        <span>Sort: </span>
        <label htmlFor="form-sort">
          <select
            id="form-sort"
            data-testid="form-sort"
            className="form-sort"
            onChange={handleSelect}
            defaultValue={SORT_DEF[sort]}
          >
            {Object.values(SORT_TYPES).map((i) => {
              return (
                <option value={i.action} key={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
        </label>
        <button
          type="button"
          className="prev-button"
          onClick={handlePrev}
          data-testid="prev-button"
        >
          &lt;
        </button>
        <div className="search-page-current">
          {currentPage} / {pagesCount}
        </div>
        <button
          type="button"
          className="next-button"
          onClick={handleNext}
          data-testid="next-button"
        >
          &gt;
        </button>
        <span>Per Page: </span>
        <input
          type="number"
          min="0"
          value={perPage}
          className="search-per-page"
          onChange={handlePerPage}
        />
      </div>
    </>
  );
}

export default SearchBar;
