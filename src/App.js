import React, { Component } from 'react'
import _ from 'lodash'
import superagent from 'superagent'

/* components */
import MovieLocationMap from './MovieLocationMap.js'

class App extends Component {
  render() {
    return (
      <div className="d-flex h-100">
        <div className="w-25">
        </div>
        <MovieLocationMap className="w-75"></MovieLocationMap>
      </div>
    )
  }

  constructor(props) {
    super(props)
    this.state = {
      titles: [],
      movies: {}, // keyed by movie name
      currentMovie: {},
      movieSearch: ''
    }
    this.fetchMovies$Q = this.fetchMovies$Q.bind(this)
    this.selectRandomMovie = this.selectRandomMovie.bind(this)
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
