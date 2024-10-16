import React, { Component } from "react";
import api_key from "./utils/api_key";
import Movies from "./components/Movies";
import Genres from "./components/genres";
import Navbar from "./components/navbar";

const baseUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}`;

class App extends Component {
  state = {
    movies: [],
    genres: [],
    selectedGenre: { id: "", name: "Popular" },
  };

  fetchMovies = async (url, genreId) => {
    let data = [];
    if (!genreId) {
      const response = await fetch(url);
      data = await response.json();
    } else {
      const response = await fetch(`${url}&with_genres=${genreId}`);
      data = await response.json();
    }
    this.setState({ movies: data.results });
  };

  fetchGenres = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ genres: data.genres });
  };

  handleSelectGenre = (genre) => {
    this.setState({ selectedGenre: genre });
  };

  componentDidMount() {
    this.fetchMovies(baseUrl);
    this.fetchGenres(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`
    );
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedGenre.id !== this.state.selectedGenre.id) {
      this.fetchMovies(baseUrl, this.state.selectedGenre.id);
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <main className="container pt-4">
          <div className="row">
            <aside className="col-lg-2">
              <Genres
                selectedGenre={this.state.selectedGenre}
                genres={this.state.genres}
                onSelectGenre={this.handleSelectGenre}
              />
            </aside>
            <section className="col-lg-10">
              <div className="row g-3">
                <Movies
                  selectedGenre={this.state.selectedGenre}
                  movies={this.state.movies}
                />
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
