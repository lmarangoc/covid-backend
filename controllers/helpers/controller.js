import { ObjectId } from "mongodb";
import { getDB } from "../../db/db.js";

const queryAllCases = async (callback) => {
  const dataBase = getDB();
  await dataBase.collection("case").find({}).limit(50).toArray(callback);
};

const consultCase = async (id, callback) => {
  const dataBase = getDB();
  await dataBase
    .collection("case")
    .findOne({ _id: new ObjectId(id) }, callback);
};

const createCase = async (caseData, callback) => {
  const dataBase = getDB();
  await dataBase.collection("case").insertOne(caseData, callback);
};

const editCase = async (id, edition, callback) => {
  const caseFilter = { _id: new ObjectId(id) };
  const operation = {
    $set: edition,
  };
  const dataBase = getDB();
  await dataBase.collection("case").findOneAndUpdate(
    caseFilter,
    operation,
    {
      upsert: true,
      returnOriginal: true,
    },
    callback
  );
};

const deleteCase = async (id, callback) => {
  const caseFilter = { _id: new ObjectId(id) };
  const dataBase = getDB();
  await dataBase.collection("case").deleteOne(caseFilter, callback);
};

export { queryAllCases, consultCase, createCase, editCase, deleteCase };
