import userModel from "../models/user.js";

export function getUsers(name, job) {
  let promise;
  if (name === undefined && job === undefined) {
    promise = userModel.find();
  } else if (name && job) {
    promise = findUserByNameAndJob(name, job);
  } else if (name && !job) {
    promise = findUserByName(name);
  } else if (job && !name) {
    promise = findUserByJob(job);
  }
  return promise;
}

export function findUserById(id) {
  return userModel.findById(id);
}

export function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;
}

export function findUserByName(name) {
  return userModel.find({ name: name });
}

export function findUserByJob(job) {
  return userModel.find({ job: job });
}

// New function for step 6
export function findUserByNameAndJob(name, job) {
  return userModel.find({ name: name, job: job });
}

// New function for step 6
export function deleteUserById(id) {
  return userModel.findByIdAndDelete(id);
}