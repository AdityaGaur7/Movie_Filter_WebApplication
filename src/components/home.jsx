import React, { useState, useEffect } from "react";
import "./ok.css";
function App() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filters, setFilters] = useState({
    language: "",
    country: "",
    genre: "",
  });

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
        setFilteredMovies(data);
      });
  }, []);

  const handleFilterChange = (filterType, value) => {
    setFilters({
      ...filters,
      [filterType]: value,
    });
  };

  useEffect(() => {
    let filteredData = movies;

    if (filters.language !== "") {
      filteredData = filteredData.filter((movie) =>
        movie.movielanguages.includes(filters.language)
      );
    }

    if (filters.country !== "") {
      filteredData = filteredData.filter((movie) =>
        movie.moviecountries.includes(filters.country)
      );
    }

    if (filters.genre !== "") {
      filteredData = filteredData.filter((movie) =>
        movie.moviegenres.includes(filters.genre)
      );
    }

    setFilteredMovies(filteredData);
  }, [filters, movies]);

  return (
    <div>
      <h1 style={{ color: "red", fontFamily: "sans-serif" }}>Movies</h1>
      <div className="options">
        <label>
          Language:
          <select
            className="option"
            value={filters.language}
            onChange={(e) => handleFilterChange("language", e.target.value)}
          >
            <option value="">All</option>
            <option value="Hindi">Hindi</option>
            <option value="Malayalam">Malayalam</option>
            <option value="Kannada">Kannada</option>
            <option value="Tamil">Tamil</option>
            <option value="English">English</option>
            <option value="Japanese">Japanese</option>
            <option value="Chinese">Chinese</option>
            <option value="Spanish">Spanish</option>
            <option value="Korean">Korean</option>
            <option value="Telugu">Telugu</option>
          </select>
        </label>
        <label>
          Country:
          <select
            className="option"
            value={filters.country}
            onChange={(e) => handleFilterChange("country", e.target.value)}
          >
            <option value="">All</option>
            <option value="Australia">Australia</option>
            <option value="Canada">Canada</option>
            <option value="Germany">Germany</option>
            <option value="France">France</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Ireland">Ireland</option>
            <option value="India">India</option>
            <option value="Norway">Norway</option>
            <option value="United States">United States</option>
          </select>
        </label>
        <label>
          Genre:
          <select
            className="option"
            value={filters.genre}
            onChange={(e) => handleFilterChange("genre", e.target.value)}
          >
            <option value="">All</option>
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
            <option value="Fantasy">Fantasy</option>
          </select>
        </label>
      </div>
      <div>
        {filteredMovies.map((movie) => (
          <div className="movie-card" key={movie.imdbmovieid}>
            <img
              className="movie-image"
              src={movie.moviemainphotos[0]}
              alt={movie.movietitle}
            />
            <div className="movie">
              <div className="movie-details">
                <h2 className="movie-title">{movie.movietitle}</h2>
                <p className="movie-info">
                  <span>Languages:</span> {movie.movielanguages.join(", ")}
                </p>
                <p className="movie-info">
                  <span> Countries:</span> {movie.moviecountries.join(", ")}
                </p>
                <p className="movie-info">
                  <span> Genres:</span> {movie.moviegenres.join(", ")}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
