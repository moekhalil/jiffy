import React, { useState } from 'react';
import { connect } from 'react-redux';
import { DebounceInput } from 'react-debounce-input';

import { requestGifs, requestMoreGifs } from '../../redux/search/searchActions';
import { fetchMoreTrending } from '../../redux/features/fetchTrending';
import GifCollection from './GifCollection';

import './styles.sass';

type GifListType = {
  onQueryChange: any;
  fetchMore: (activeTab: string) => void;
};

const GifList = ({ onQueryChange, fetchMore }: GifListType) => {
  const [activeTab, setTab] = useState('trending');
  const getClassName = (cx: string) => `${cx} ${activeTab === cx ? 'active' : ''}`;

  return (
    <div className="GifList">
      <menu>
        <li className={getClassName('trending')} onClick={() => setTab('trending')}>
          Trending
        </li>

        <li className={getClassName('search')} onClick={() => setTab('search')}>
          <div>Search</div>
          <DebounceInput
            type="text"
            debounceTimeout={600}
            placeholder="Start typing..."
            onChange={(event) => onQueryChange(event.target.value)}
          />
        </li>
      </menu>
      <GifCollection fetchMore={() => fetchMore(activeTab)} activeTab={activeTab} />
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  onQueryChange: (query: string) => dispatch(requestGifs({ query })),
  fetchMore: (activeTab: string) => {
    activeTab === 'trending' && dispatch(fetchMoreTrending());
    activeTab === 'search' && dispatch(requestMoreGifs());
  },
});

export default connect(null, mapDispatchToProps)(GifList);
