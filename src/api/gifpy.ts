import { Gif } from '../redux/features/types';

const BASE_URL = 'https://api.giphy.com/v1/gifs';
const API_KEY = 'MNpyzy8uQHQGafnS6sGtPQiw3y8WhoVd';

type params = {
  offset: number;
  limit: number;
  query?: string;
};

type resultRow = {
  images: {
    original: Gif;
    fixed_width: Gif;
  };
  title: string;
};

const transformRows = async (response: Response) => {
  const rows = await response.json();

  return rows.data.map((row: resultRow) => ({
    original: row.images.original,
    fixedWidth: row.images.fixed_width,
    title: row.title,
  }));
};

export const getTrendingImages = async ({ offset, limit }: params) => {
  const url = `${BASE_URL}/trending?api_key=${API_KEY}&offset=${offset}&limit=${limit}`;
  const res = await fetch(url);
  return transformRows(res);
};

export const searchImages = async ({ query, offset, limit }: params) => {
  const url = `${BASE_URL}/search?api_key=${API_KEY}&q=${query}&offset=${offset}&limit=${limit}`;
  const res = await fetch(url);
  return transformRows(res);
};
