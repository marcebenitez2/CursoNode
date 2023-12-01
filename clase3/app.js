const express = require("express");
const movies = require("./movies.json");
const crypto = require("node:crypto");

const app = express();
app.use(express.json()); // Para que express entienda el body de las peticiones POST
app.disable("x-powered-by"); // Para que no se vea que estamos usando express, MAS SEGURIDAD

app.get("/movies", (req, res) => {
  const { genre } = req.query;
  if (genre) {
    const moviesByGenre = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
    );
    return res.json(moviesByGenre);
  }
  res.json(movies);
});

app.get("/movies/:id", (req, res) => {
  const { id } = req.params;

  const movie = movies.find((movie) => movie.id === id);

  if (movie) return res.json(movie);

  res.status(404).json({ error: "Movie not found" });
});

app.post("/movies", (req, res) => {
  const { title, year, director, duration, poster, genre, rate } = req.body;

  const newMovie = {
    id: crypto.randomUUID(),
    title: title,
    year: year,
    director: director,
    duration: duration,
    poster: poster,
    genre: genre,
    rate: rate ?? 0,
  };
  console.log(newMovie);
  movies.push(newMovie);

  res.status(201).json(newMovie);
});

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
