import { ObjectId } from "mongodb";
import { getDB } from "../../db/db.js";
//import jwt_decode from "jwt-decode";

const queryAllUsers = async (callback) => {
  const dataBase = getDB();
  await dataBase.collection("user").find({}).limit(50).toArray(callback);
};

const consultUser = async (id, callback) => {
  const dataBase = getDB();
  await dataBase
    .collection("user")
    .findOne({ _id: new ObjectId(id) }, callback);
};

const createUser = async (userData, callback) => {
  const dataBase = getDB();
  await dataBase.collection("user").insertOne(userData, callback);
};

const editUser = async (id, edition, callback) => {
  const userFilter = { _id: new ObjectId(id) };
  const operation = {
    $set: edition,
  };
  const dataBase = getDB();
  await dataBase.collection("user").findOneAndUpdate(
    userFilter,
    operation,
    {
      upsert: true,
      returnOriginal: true,
    },
    callback
  );
};

const deleteUser = async (id, callback) => {
  const userFilter = { _id: new ObjectId(id) };
  const dataBase = getDB();
  await dataBase.collection("user").deleteOne(userFilter, callback);
};

/* const queryOrCreateUser = async (req, callback) => {
  const token = req.headers.authorization.split("Bearer ")[1];
  const user = jwt_decode(token)["http://localhost/userData"];
  console.log(user);
  const dataBase = getDB();
  await dataBase
    .collection("user")
    .findOne({ email: user.email }, async (err, response) => {
      console.log("response consulta bd", response);
      if (response) {
        callback(err, response);
      } else {
        user.auth0ID = user._id;
        delete user._id;
        user.rol = "sin rol";
        user.estado = "pendiente";
        await createUser(user, (err, respuesta) => callback(err, user));
      }
    });
}; */

export { queryAllUsers, consultUser, createUser, editUser, deleteUser };
