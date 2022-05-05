import { ApiResponse, SortTypes } from '../data/interfaces';
import {
  API_PAGES_AMOUNT_DEFAULT,
  API_PAGE_DEFAULT,
  API_PER_PAGE_DEFAULT,
  API_SORT_DEFAULT,
  API_TOTAL_DEFAULT,
} from '../data/constants';

const fetchFlickr = async (
  tag: string,
  sort: SortTypes = API_SORT_DEFAULT,
  perPage: number = API_PER_PAGE_DEFAULT,
  currPage: number = API_PAGE_DEFAULT
) => {
  const currentTag = tag === '' ? '{noresults}' : tag;
  const apiKey = '3c0089ab9bddc0fbd3ac4abe02e7c7d9';
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${currentTag}&per_page=${perPage}&page=${currPage}&sort=${sort}&extras=url_l,tags,date_taken&format=json&nojsoncallback=1`;
  let data: ApiResponse = {
    photos: {
      page: API_PAGE_DEFAULT,
      pages: API_PAGES_AMOUNT_DEFAULT,
      perpage: API_PER_PAGE_DEFAULT,
      photo: [],
      total: API_TOTAL_DEFAULT,
    },
  };
  try {
    const res = await fetch(url);
    data = await res.json();
  } catch (err) {
    throw new Error('API request failed');
  }
  return data;
};

export default fetchFlickr;
