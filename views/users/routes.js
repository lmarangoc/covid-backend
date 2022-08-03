import Express from "express";
import {
  queryAllUsers,
  consultUser,
  createUser,
  editUser,
  deleteUser,
} from "../../controllers/users/controller.js";

const userRoutes = Express.Router();

const genericCallback = (res) => (err, result) => {
  if (err) {
    res.status(500);
  } else {
    res.json(result);
  }
};

userRoutes.route("/admin").get((req, res) => {
  console.log("Someone did get on the /admin route");
  queryAllUsers(genericCallback(res));
});

/* userRoutes.route("/admin/self").get((req, res) => {
  console.log("Someone did get on the /self route");
  queryOrCreateUser(req, genericCallback(res));
}); */

userRoutes.route("/admin/:id").get((req, res) => {
  console.log("Someone did get on the /admin route");
  consultUser(req.params.id, genericCallback(res));
});

userRoutes.route("/admin").post((req, res) => {
  createUser(req.body, genericCallback(res));
});

userRoutes.route("/admin/:id").patch((req, res) => {
  editUser(req.params.id, req.body, genericCallback(res));
});

userRoutes.route("/admin/:id").delete((req, res) => {
  deleteUser(req.params.id, genericCallback(res));
});

export default userRoutes;
