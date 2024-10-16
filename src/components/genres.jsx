import React, { Component } from "react";
class Genres extends Component {
  render() {
    return (
      <ul className="list-group">
        {this.props.genres.map((genre) => (
          <li
            onClick={() => this.props.onSelectGenre(genre)}
            className="list-group-item"
            key={genre.id}
          >
            {genre.name}
          </li>
        ))}
      </ul>
    );
  }
}

export default Genres;
