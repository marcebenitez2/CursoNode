import cors from "cors";

const ACCEPTED_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:8080",
  "https://my-app.com",
];

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
  cors({
    origin: (origin, callback) => {
      if (acceptedOrigins.includes(origin)) {
        callback(null, true);
      }
      if (!origin) {
        callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    },
  });
