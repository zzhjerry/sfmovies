import React from 'react'
import { compose, withProps, withHandlers } from "recompose"
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps"

import { apiKey } from './apiKey.js'
const googleMapUrl = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geocoding,geometry,drawing,places`

const MovieLocationMap = compose(
  withProps({
    googleMapURL: googleMapUrl,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100vh`, width: `75vw` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withHandlers(() => {
    const refs = {
      map: undefined,
    }
    return {
      onMapMounted: (props) => ref => {
        refs.map = ref
      },

      reBound: () => (positions) => {
        if (positions.length > 0) {
          const bounds = new window.google.maps.LatLngBounds()
          positions.forEach(position => {
            bounds.extend(position)
          })
          refs.map.fitBounds(bounds)
        }
      }
    }
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  props.reBound(props.positions)
  return (
    <GoogleMap
      ref={props.onMapMounted}
      defaultZoom={11}
      defaultCenter={{ lat: 37.699912, lng: -122.443153 }}>
      {props.positions.map((position, index) => <Marker key={index} position={position} />)}
    </GoogleMap>
  )
})

export default MovieLocationMap
