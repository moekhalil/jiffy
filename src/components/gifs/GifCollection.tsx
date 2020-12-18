import React, { useState } from 'react';
import { Image, ISearchStore, ITrendingStore } from '../../redux/features/types';
import GifCard from './GifCard';

interface GifCollectionProps {
  activeTabState: ISearchStore | ITrendingStore;
  fetchMore: any;
}

const GifCollection = ({ activeTabState, fetchMore }: GifCollectionProps) => {
  const gifs = activeTabState.gifs;
  const isLoading = activeTabState.loading === 'pending';

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
