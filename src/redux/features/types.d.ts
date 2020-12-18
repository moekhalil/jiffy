interface Gif {
  height: string;
  width: string;
  size: string;
  url: string;
  mp4_size: string;
  mp4: string;
  webp_size: string;
  webp: string;
}

interface Image {
  title: string;
  original: Gif;
  fixedWidth: Gif;
}

export interface GifPayload {
  gifs: Array<Image>;
}

interface BaseGifCollection {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  limit: 12 | 24 | 36;
  offset: number;
  gifs: Array<GIF>;
}

export interface ITrendingStore extends BaseGifCollection {}
export interface ISearchStore extends BaseGifCollection {
  query: string;
  queryHistory: Array<string>;
}
