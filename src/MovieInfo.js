import React from 'react'
import _ from 'lodash'

const MovieInfo = (props) => {
  const {
    title, locations=[], director, writer, production_company,
    release_year, actor_1, actor_2, actor_3
  } = props.currentMovie
  return (
    <div className="">
      {title && <div>Title:</div>}
      <small className="font-italic">{title}</small>
      {!_.isEmpty(locations) && <div>Locations:</div>}
      <small className="font-italic">{locations.join(', ')}</small>
      {director && <div>Director:</div>}
      <small className="font-italic">{director}</small>
      {writer && <div>Writer:</div>}
      <small className="font-italic">{writer}</small>
      {production_company && <div>Prouction Company:</div>}
      <small className="font-italic">{production_company}</small>
      {release_year && <div>Release Year:</div>}
      <small className="font-italic">{release_year}</small>
      {(actor_1 || actor_2 || actor_3) && <div>actors:</div>}
      <small className="font-italic">{_.compact([actor_1, actor_2, actor_3]).join(', ')}</small>
    </div>
  )
}

export default MovieInfo
