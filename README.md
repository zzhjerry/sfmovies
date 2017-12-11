# SF Movies

This app shows a map of San Francisco and markers denoting places a film is filmed at. This is how it works:

- When the app is loaded, it will display a random movie's filmed locations. And this random movie will be changed every 5s.
- The map will occupy the full height of right side. The left side will be a search bar and a bunch of texts showing the information of the movie such as title, release year, production company, director, writer, actor1,2,3, and locations.
- When people start typing movie names, there will be up to 8 autocomplete candidates as a list below the input area. The movie info text will disappear. The markers on the map will show the locations of first movie candidate.
- If user type an invalid movie name, UI will show "Invalid movie name"

## Components

### `<SearchBox />`

### `<MovieInfo />`

### `<MovieLocationMap />`
