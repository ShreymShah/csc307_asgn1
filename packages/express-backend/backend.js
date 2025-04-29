// backend.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { getUsers, findUserById, addUser, deleteUserById } from "./services/user-service.js";

// Load environment variables
dotenv.config();

const app = express();
const port = 8000;

// Extract the connection string from environment variables
const { MONGO_CONNECTION_STRING } = process.env;

// Set mongoose to debug mode and connect to MongoDB
mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING + "users") // connect to Db "users"
  .catch((error) => console.log(error));

app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  
  getUsers(name, job)
    .then((users) => {
      res.send({ users_list: users });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("An error occurred while fetching users");
    });
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  
  findUserById(id)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(404).send("Resource not found.");
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("An error occurred while fetching the user");
    });
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  
  addUser(userToAdd)
    .then((newUser) => {
      res.status(201).send(newUser);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("An error occurred while adding the user");
    });
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  
  deleteUserById(id)
    .then((result) => {
      if (result) {
        res.status(204).send();
      } else {
        res.status(404).send("Resource not found.");
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("An error occurred while deleting the user");
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});