import React from 'react';
import GifList from './components/gifs';
import SiteHeader from './components/SiteHeader';

import './App.sass';

function App() {
  return (
    <div className="jiffy-app">
      <SiteHeader />
      <main>
        <GifList />
      </main>
    </div>
  );
}

export default App;
