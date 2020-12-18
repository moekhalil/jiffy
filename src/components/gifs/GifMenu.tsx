import React from 'react';
import { DebounceInput } from 'react-debounce-input';

interface GifMenuProps {
  activeTab: string;
  onQueryChange: (searchText: string) => void;
  setTab: (tabName: string) => void;
}

const GifMenu = ({ activeTab, onQueryChange, setTab }: GifMenuProps) => {
  const getClassName = (itemName: string) =>
    `${itemName} ${activeTab === itemName ? 'active' : ''}`;

  return (
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
  );
};

export default GifMenu;
