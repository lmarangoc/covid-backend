import Express from "express";
import Cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db/db.js";
import userRoutes from "./views/users/routes.js";
import caseRoutes from "./views/helpers/routes.js";

dotenv.config({ path: "./.env" });

const app = Express();
app.use(Express.json());
app.use(Cors());

app.use(userRoutes);
app.use(caseRoutes);

const main = () => {
  return app.listen(process.env.PORT, () => {
    console.log(`Listening port ${process.env.PORT}`);
  });
};

connectDB(main);
