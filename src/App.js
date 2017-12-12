import React, { Component } from 'react'
import _ from 'lodash'
import superagent from 'superagent'
import Q from 'bluebird'
import { apiKey } from './apiKey.js'

/* components */
import MovieLocationMap from './MovieLocationMap.js'
import Select from 'react-select'
import MovieInfo from './MovieInfo.js'
import 'react-select/dist/react-select.css'

class App extends Component {
  render() {
    const { search, titles, currentMovie, positions } = this.state
    return (
      <div className="d-flex h-100">
        <div className="w-25 m-3 d-flex flex-column justify-content-between">
          <Select
            value={search}
            onChange={this.onSearchChanged}
            options={titles}>
          </Select>
          <MovieInfo currentMovie={currentMovie}></MovieInfo>
        </div>

        <MovieLocationMap
          className="w-75"
          positions={positions}>
        </MovieLocationMap>
      </div>
    )
  }

  constructor(props) {
    super(props)
    this.state = {
      titles: [], // array of { value: ..., title: ... } pairs used for autocomplete
      movies: {}, // fetched from sfdata api, keyed by movie name (reformated)
      currentMovie: {}, // used to display current movie's info
      search: '', // the search text
      positions: [] // used to display the markers
    }
    this.fetchMovies$Q = this.fetchMovies$Q.bind(this)
    this.onSearchChanged = this.onSearchChanged.bind(this)
    this.getPositions = this.getPositions.bind(this)
  }

  componentDidMount() {
    this.fetchMovies$Q().then(movies => {
      this.setState({
        titles: _.map(movies, (_, k) => ({ value: k, label: k })),
        movies: movies
      })
    })
  }

  fetchMovies$Q() {
    return superagent.get('https://data.sfgov.org/resource/wwmu-gmzc.json')
      .then((res) => {
        const movies = res.body // this is an array of movies with duplicate title
        // group movies by title and merge location information into an array
        const moviesKeyedByTitle = _.reduce(movies, (acc, value, index) => {
          const { title, locations } = value
          if (!acc[title]) {
            acc[title] = value
            acc[title].locations = _.compact([locations])
          } else {
            acc[title].locations.push(locations)
          }
          return acc
        }, {})
        return moviesKeyedByTitle
      })
  }

  onSearchChanged(title) {
    const { movies } = this.state
    const currentMovie = movies[title.value]
    this.setState({
      search: title,
      currentMovie
    })
    this.getPositions(currentMovie.locations)
  }

  getPositions(locations) {
    if (_.isEmpty(locations)) {
      this.setState({ positions: [] })
      return
    }
    const requests$Q = locations.map(location => {
      location = encodeURIComponent(location)
      return superagent.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${apiKey}`)
    })
    Q.all(requests$Q).then(responses => {
      return responses.map(response => {
        return _.get(response.body, 'results.0.geometry.location')
      })
    }).then(positions => {
      this.setState({ positions: _.compact(positions) })
    })
  }
}

export default App
