import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import todosRoutes from "./routes/todos.js";

const app = express();
dotenv.config();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/todos", todosRoutes);

const mongodb =
  process.env.MONGODB_URI ||
  "mongodb+srv://shijan:shijan1111@cluster0.zpajc.mongodb.net/todos-database?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Welcome to the server");
});

// Connect to MongoDB and then start the server
mongoose
  .connect(mongodb)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });
