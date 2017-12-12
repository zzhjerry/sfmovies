import React, { Component } from 'react'
import _ from 'lodash'
import superagent from 'superagent'

/* components */
import SearchBox from './SearchBox.js'
import MovieLocationMap from './MovieLocationMap.js'

class App extends Component {
  render() {
    const { search } = this.state
    return (
      <div className="d-flex h-100">
        <div className="w-25 m-3">
          <SearchBox search={search} onSearchChanged={this.onSearchChanged}></SearchBox>
        </div>

        <MovieLocationMap
          className="w-75"
          positions={[{ lat: 37.699912, lng: -122.443153 }]}>
        </MovieLocationMap>
      </div>
    )
  }

  constructor(props) {
    super(props)
    this.state = {
      titles: [],
      movies: {}, // keyed by movie name
      currentMovie: {},
      search: ''
    }
    this.fetchMovies$Q = this.fetchMovies$Q.bind(this)
    this.selectRandomMovie = this.selectRandomMovie.bind(this)
    this.onSearchChanged = this.onSearchChanged.bind(this)
  }

  componentDidMount() {
    this.fetchMovies$Q().then(movies => {
      this.setState({
        titles: Object.keys(movies),
        movies: movies
      })
      this.selectRandomMovie()
    })
  }

  fetchMovies$Q() {
    return superagent.get('https://data.sfgov.org/resource/wwmu-gmzc.json')
      .then((res) => {
        const movies = res.body // this is an array
        const moviesKeyedByTitle = _.reduce(movies, (acc, value, index) => {
          const { title, locations } = value
          if (!acc[title]) {
            acc[title] = value
            acc[title].locations =[locations]
          } else {
            acc[title].locations.push(locations)
          }
          return acc
        }, {})
        return moviesKeyedByTitle
      })
  }

  onSearchChanged(event) {
    this.setState({ search: event.target.value })
  }

  selectRandomMovie() {
    // only run when search text isn't empty
    if (this.state.movieSearch) return
    const { titles, movies } = this.state
    const title = titles[_.random(0, titles.length)]
    this.setState({
      currentMovie: movies[title] || {}
    })
  }
}

export default App
