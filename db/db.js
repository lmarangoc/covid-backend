import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config({ path: "./.env" });

const stringdataBase = process.env.DATABASE_URL;

const client = new MongoClient(stringdataBase, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dataBase;

const connectDB = (callback) => {
  client.connect((err, db) => {
    if (err) {
      console.log("Error connecting to the database");
    }
    dataBase = db.db("covid");
    console.log("Successful connection");
    return callback();
  });
};

const getDB = () => {
  return dataBase;
};

export { connectDB, getDB };
