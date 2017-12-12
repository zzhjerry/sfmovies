import React from 'react'
import { compose, withProps } from "recompose"
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps"

const apiKey = 'AIzaSyCLLp5bEvdOEdFUcg7NesW7mZJLn3lokzY'
const googleMapUrl = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geocoding,geometry,drawing,places`

const MovieLocationMap = compose(
  withProps({
    googleMapURL: googleMapUrl,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100vh`, width: `75vw` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
  defaultZoom={11}
  defaultCenter={{ lat: 37.699912, lng: -122.443153 }} >
  <Marker position={{ lat: 37.699912, lng: -122.443153 }} />
  </GoogleMap>
 )

export default MovieLocationMap
