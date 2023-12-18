import { Router } from "express";
import { MovieController } from "../controllers/movies.js";

export const createMovieRouter = ({ MovieModel }) => {
  const moviesRouter = Router();
  const movieController = new MovieController({ movieModel: MovieModel });

  moviesRouter.get("/", movieController.getAll); // Usar movieController en lugar de MovieController
  moviesRouter.get("/:id", movieController.getById); // Usar movieController en lugar de MovieController
  moviesRouter.post("/", movieController.create); // Usar movieController en lugar de MovieController
  moviesRouter.delete("/:id", movieController.delete); // Usar movieController en lugar de MovieController
  moviesRouter.patch("/:id", movieController.update); // Usar movieController en lugar de MovieController

  return moviesRouter;
};
