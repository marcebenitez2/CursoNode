const express = require("express");
const movies = require("./movies.json");
const crypto = require("node:crypto");
const { validateMovie } = require("./schemas/movies");

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
  const resultado = validateMovie(req.body);

  if (resultado.error) {
    return res.status(400).json({ error: JSON.parse(resultado.error.message) });
  }

  const newMovie = {
    id: crypto.randomUUID(),
    ...resultado.data,
  };
  console.log(resultado);
  movies.push(newMovie);

  res.status(201).json(newMovie);
});

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
