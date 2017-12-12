# SF Movies

This app shows a map of San Francisco with markers denoting places a film is filmed at. This is how it works:

- When the app is loaded, it will display a random movie's filmed locations. And this random movie will be changed every 5s.
- The map will occupy the full height of right side. The left side will be a search bar and a bunch of texts showing the information of the movie such as title, release year, production company, director, writer, actor1,2,3, and locations.
- When people start typing movie names, there will be up to 8 autocompleted candidates as a list below the input area. The movie infomation text will disappear. The markers on the map will show the locations of first movie candidate.
- If user type an invalid movie name, UI will show "Movie name not found"

## Components

### `<SearchBox />`

**Props:**

- `search` {string}: the movie search text from the user
- `movieCandidates` {Array<string>}: an array of movie names as autocomplete candidates
- `onSearchChanged` {Function}:
    - generate a list of movie candiates implied from the search text.
    - set the first candidate as `currentMovie`
    - get the positions based on locations of the `currentMovie`, which will be used to display marker on the map.
    - if there's no candidate, set `currentMovie` to empty object and diaplsy "Movie name not found"
- `onMovieSelected` {Function}:
    - set `search` to the given movie name
    - set `currentMovie` to the movie whose title match with `search`
    - clear candidate list

### `<MovieInfo />`

### `<MovieLocationMap />`

**Props:**

- `positions` (Array<LatLngLiteral>): an array of [LatLngLiteral](https://developers.google.com/maps/documentation/javascript/3.exp/reference#LatLngLiteral) that are used to display markers on the map

## Security

According to [this post](https://stackoverflow.com/a/39625963/2599541), google map api key has to be public on web source code, so I've restricted my API key to be used by only this app's address.

## Architecture

This is a static web app without a backend system hosted on Netlify.

- SF movie data with locaitons are retrived from [here](https://data.sfgov.org/resource/wwmu-gmzc.json)
- Location names will be turned into latitude and longitude via [Geocoding API](https://developers.google.com/maps/documentation/geocoding/intro)

## Libraries

- [react-google-maps](https://tomchentw.github.io/react-google-maps/#introduction)
- [lodash](https://lodash.com/docs/4.17.4)
- [bootstrap](https://getbootstrap.com/)
- [reactstrap](https://reactstrap.github.io/)
- [superagent](https://github.com/visionmedia/superagent)
