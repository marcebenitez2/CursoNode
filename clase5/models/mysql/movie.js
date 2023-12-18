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

      // get genre ids from database table using genre names
      const [genres] = await connection.query(
        "SELECT id, name FROM genres WHERE LOWER(name) = ?;",
        [lowerCaseGenre]
      );

      // no genre found
      if (genres.length === 0) return [];

      // get the id from the first genre result
      const [{ id }] = genres;

      // get all movies ids from database table
      // la query a movie_genres
      // join
      // y devolver resultados..
      return [];
    }

    const [movies] = await connection.query(
      "SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie;"
    );

    return movies;
  }

  static async getById({ id }) {}

  static async create({ input }) {}

  static async delete({ id }) {}

  static async update({ id, input }) {}
}
