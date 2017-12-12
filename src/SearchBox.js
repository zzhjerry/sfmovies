import React from 'react'
import { Input, ListGroup, ListGroupItem } from 'reactstrap'

const SearchBox = (props) => {
  const { search='', movieCandiates=[], onSearchChanged, onMovieSelected } = props
  return (
    <div>
      <Input value={search} placeholder="search for a movie" onChange={onSearchChanged} />
      <ListGroup>
        {movieCandiates.map(name => {
            <ListGroupItem onClick={() => onMovieSelected(name)}>{name}</ListGroupItem>
        })}
      </ListGroup>
    </div>
  )
}

export default SearchBox
