import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { fetchTrending, fetchMoreTrending } from '../../redux/features/fetchTrending';
import { requestGifs, requestMoreGifs } from '../../redux/search/searchActions';
import { ISearchStore, ITrendingStore } from '../../redux/features/types';

import GifCollection from './GifCollection';
import GifMenu from './GifMenu';

import './styles.sass';

type GifListType = {
  onQueryChange: (query: string) => void;
  fetchTrendingImages: () => void;
  fetchMore: (activeTab: string) => void;
  trendingState: ITrendingStore;
  searchState: ISearchStore;
};

const GifList = ({
  onQueryChange,
  fetchMore,
  fetchTrendingImages,
  trendingState,
  searchState,
}: GifListType) => {
  const [activeTab, setTab] = useState('trending');
  const activeTabState = activeTab === 'search' ? searchState : trendingState;

  /*
    on page load, load trending images.
    if we wish to refresh trending images on tab change, we could set activeTab
    as dependency and return a function that calls a store reset action to
    clear the trending store state.
  */
  useEffect(fetchTrendingImages, [fetchTrendingImages]);

  return (
    <div className="GifList">
      <GifMenu activeTab={activeTab} setTab={setTab} onQueryChange={onQueryChange} />
      <GifCollection fetchMore={() => fetchMore(activeTab)} activeTabState={activeTabState} />
    </div>
  );
};

const mapStateToProps = (state: { trending: ITrendingStore; search: ISearchStore }) => ({
  trendingState: state.trending,
  searchState: state.search,
});

const mapDispatchToProps = (dispatch: any) => ({
  onQueryChange: (query: string) => dispatch(requestGifs({ query })),
  fetchTrendingImages: () => dispatch(fetchTrending()),
  fetchMore: (activeTab: string) => {
    activeTab === 'trending' && dispatch(fetchMoreTrending());
    activeTab === 'search' && dispatch(requestMoreGifs());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GifList);
