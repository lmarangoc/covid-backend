import Express from "express";
import {
  queryAllCases,
  consultCase,
  createCase,
  editCase,
  deleteCase,
} from "../../controllers/helpers/controller.js";

const caseRoutes = Express.Router();

const genericCallback = (res) => (err, result) => {
  if (err) {
    res.status(500);
  } else {
    res.json(result);
  }
};

caseRoutes.route("/helper").get((req, res) => {
  console.log("Someone did get on the /case route");
  queryAllCases(genericCallback(res));
});

caseRoutes.route("/helper/:id").get((req, res) => {
  console.log("Someone did get on the /case route");
  consultCase(req.params.id, genericCallback(res));
});

caseRoutes.route("/helper/registercase").post((req, res) => {
  createCase(req.body, genericCallback(res));
});

caseRoutes.route("/helper/:id").patch((req, res) => {
  editCase(req.params.id, req.body, genericCallback(res));
});

caseRoutes.route("/helper/:id").delete((req, res) => {
  deleteCase(req.params.id, genericCallback(res));
});

export default caseRoutes;
