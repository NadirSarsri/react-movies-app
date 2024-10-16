import React, { Component } from "react";
import Movie from "./Movie";
class Movies extends Component {
  render() {
    const { movies } = this.props;
    return (
      <>
        <h2>{this.props.selectedGenre.name}</h2>
        {movies.map((movie) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </>
    );
  }
}

export default Movies;
