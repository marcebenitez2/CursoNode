import express, { json } from "express";
import { moviesRouter } from "./routes/movies.js";
import { corsMiddleware } from "./middlewares/cors.js";
const app = express();

app.use(json()); // Para que express entienda el body de las peticiones POST
app.disable("x-powered-by"); // Para que no se vea que estamos usando express, MAS SEGURIDAD
app.use(corsMiddleware());

app.use("/movies", moviesRouter);

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
