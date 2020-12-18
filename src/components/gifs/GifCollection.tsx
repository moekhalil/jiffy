import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ITrendingStore, ISearchStore, Image } from '../../redux/features/types';
import GifCard from './GifCard';

interface RootState {
  trending: ITrendingStore;
  search: ISearchStore;
}

const trendingReducer = (state: RootState) => state.trending;
const searchReducer = (state: RootState) => state.search;

const GifCollection = ({ activeTab, fetchMore }: { activeTab: string; fetchMore: any }) => {
  const reducerType = activeTab === 'search' ? searchReducer : trendingReducer;
  const reducerState = useSelector(reducerType);
  const gifs = reducerState.gifs;
  const isLoading = reducerState.loading === 'pending';

  const [modalImage, setModalImage]: [Image | undefined, (image?: Image) => void] = useState();

  const fetchOnScroll = ({ currentTarget }: { currentTarget: HTMLDivElement }): void => {
    if (isLoading) {
      return;
    }
    const { scrollTop, clientHeight, scrollHeight } = currentTarget;
    if (scrollTop + clientHeight + 2 >= scrollHeight) {
      fetchMore();
    }
  };

  return (
    <div className="GifCollection" onTouchMove={fetchOnScroll} onScroll={fetchOnScroll}>
      <div className={`gif-modal ${modalImage ? '' : 'hidden'}`}>
        <img
          onClick={() => setModalImage()}
          src={modalImage?.original.url}
          title={modalImage?.title}
          alt={modalImage?.title || ''}
          className="full-size-gif"
        />
      </div>

      {gifs.map((image: Image, idx: number) => (
        <GifCard key={idx} onImageClick={(x: Image) => setModalImage(x)} image={image} />
      ))}
    </div>
  );
};

export default GifCollection;
