import mysql from "mysql2/promise";

const config = {
  host: "localhost",
  user: "root",
  password: "",
  database: "moviesdb",
};

const connection = await mysql.createConnection(config);

export class MovieModel {
  static async getAll({ genre }) {
    console.log("getAll");

    if (genre) {
      const lowerCaseGenre = genre.toLowerCase();

      const [genres] = await connection.query(
        "SELECT id, name FROM genres WHERE LOWER(name) = ?;",
        [lowerCaseGenre]
      );

      if (genres.length === 0) return [];

      const [{ id }] = genres;

      const [movies] = await connection.query(
        "SELECT m.title, m.year, m.director, m.duration, m.poster, m.rate, m.id, g.name as genre " +
          "FROM movies m " +
          "INNER JOIN movie_genre mg ON m.id = mg.movie_id " +
          "INNER JOIN genres g ON mg.genre_id = g.id " +
          "WHERE g.id = ?;",
        [id]
      );

      return movies;
    }

    const [movies] = await connection.query(
      "SELECT title, year, director, duration, poster, rate, id FROM movies;"
    );

    return movies;
  }

  static async getById({ id }) {
    const movies = await connection.query(
      "SELECT title, year, director, duration, poster, rate, id FROM movies WHERE id = (?)",
      [id]
    );

    if (movies.length === 0) return null;

    return movies[0];
  }

  static async create({ input }) {
    const {
      genre,
      title,
      year,
      director,
      duration,
      poster,
      rate,
    } = input;
  
    console.log(input);
  
    const [uuidResult] = await connection.query("SELECT UUID() uuid;");
    const [{ uuid }] = uuidResult;
  
    try {
      // Para insertar la película
      await connection.query(
        "INSERT INTO movies (id, title, year, director, duration, poster, rate) VALUES (?, ?, ?, ?, ?, ?, ?);",
        [uuid, title, year, director, duration, poster, rate]
      );
  
      // Para insertar los géneros
      for (const genreInput of genre) {
        // Verificar si el género ya existe en la base de datos
        const [genres] = await connection.query(
          "SELECT id, name FROM genres WHERE LOWER(name) = ?;",
          [genreInput.toLowerCase()]
        );
  
        // Si no existe, lo creamos
        if (genres.length === 0) {
          await connection.query("INSERT INTO genres (name) VALUES (?);", [
            genreInput,
          ]);
  
          // Relacionar la película con el nuevo género
          await connection.query(
            "INSERT INTO movie_genre (movie_id, genre_id) VALUES (?, ?);",
            [uuid, genreInput]
          );
        }
        // Si ya existe, simplemente relacionamos la película con el género existente
        else {
          await connection.query(
            "INSERT INTO movie_genre (movie_id, genre_id) VALUES (?, ?);",
            [uuid, genres[0].id]
          );
        }
      }
    } catch (error) {
      console.log(error)
    }
  
    const [movies] = await connection.query(
      "SELECT title, year, director, duration, poster, rate, id id FROM movies WHERE id = (?)",
      [uuid]
    );
  
    return movies[0];
  }
  
  static async delete({ id }) {


    const [movies] = await connection.query(
      "DELETE FROM movies WHERE id = ?;",
      [id]
    );

    await connection.query(
      "DELETE FROM movie_genre WHERE movie_id = ?;",
      [id]
    );
    
    return movies;
  }

  static async update({ id, input }) {
    const {
      genre: genreInput,
      title,
      year,
      director,
      duration,
      poster,
      rate,
    } = input;

    const [movies] = await connection.query(
      "UPDATE movies SET title = ?, year = ?, director = ?, duration = ?, poster = ?, rate = ? WHERE id = ?;",
      [title, year, director, duration, poster, rate, id]
    );

    return movies;
  }
}
