import React, { Component } from 'react';
import SearchBox from './SearchBox.js'
import MovieInfo from './MovieInfo.js'
import MovieLocationMap from './MovieLocationMap.js'

class App extends Component {
  render() {
    return (
      <div className="d-flex">
        <div className="w-25">
          <SearchBox></SearchBox>
          <MovieInfo></MovieInfo>
        </div>
        <MovieLocationMap></MovieLocationMap>
      </div>
    );
  }
}

export default App
