import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./src/middleware/errorMiddleware.js";
import allRoutes from "./src/routes/index.js"
const server = express();

// middleware
server.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true   
}));

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

// routes
server.use("/api/v1", allRoutes);
// test route
server.get("/", (req, res) => {
  res.send("Server is running ");
});

// ERROR MIDDLEWARE (ALWAYS LAST)
server.use(errorHandler);

export { server };