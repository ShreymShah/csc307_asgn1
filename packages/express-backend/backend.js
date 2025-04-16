// backend.js
import express from "express";

const app = express();
const port = 8000;

app.use(express.json());

// Users data structure
const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

// Helper functions
const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

// New helper function for Step 7: filter by name AND job
const findUserByNameAndJob = (name, job) => {
  return users["users_list"].filter(
    (user) => user["name"] === name && user["job"] === job
  );
};

// New helper function for Step 7: delete user by ID
const deleteUserById = (id) => {
  const initialLength = users["users_list"].length;
  users["users_list"] = users["users_list"].filter(
    (user) => user["id"] !== id
  );
  // Return true if a user was deleted, false otherwise
  return users["users_list"].length !== initialLength;
};

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  
  // Step 7: Handle filtering by both name and job
  if (name !== undefined && job !== undefined) {
    let result = findUserByNameAndJob(name, job);
    result = { users_list: result };
    res.send(result);
  }
  // Original filtering by name only
  else if (name !== undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } 
  // No filters, return all users
  else {
    res.send(users);
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.status(201).send(userToAdd);
});

// Step 7: New DELETE endpoint to remove a user by ID
app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  const deleted = deleteUserById(id);
  
  if (deleted) {
    // Return 204 No Content for successful deletion with no response body
    res.status(204).send();
  } else {
    // Return 404 if user not found
    res.status(404).send("Resource not found.");
  }
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});