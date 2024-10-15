import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";

import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

import dbConnection from "./dbConfig/dbConnection.js";
import router from "./routes/index.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8800;

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Apply CORS middleware immediately after app initialization
app.use(cors(corsOptions));

// MONGODB CONNECTION
dbConnection();

// Detailed logging middleware
// app.use((req, res, next) => {
//   res.on('finish', () => {
//     console.log('Response headers:', res.getHeaders());
//   });
//   next();
// });

// Other middleware
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(xss());
app.use(mongoSanitize());

// Use router after other middleware
app.use(router);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
    },
  });
});

// Log unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Catch-all middleware for unhandled routes
app.use((req, res) => {
  console.log(`Unhandled route: ${req.method} ${req.url}`);
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Dev Server running on port: ${PORT}`);
});
