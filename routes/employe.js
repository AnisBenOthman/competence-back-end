import express from "express";
import { body } from "express-validator";
import {
  getAll,
  addOnce,
  getOnce,
  updateOne,
  getMany,
  getOnceTwo,
  deleteOne,
  getPays,
  getEmployeByPays,
} from "../controllers/employe.js";

const router = express.Router();

router
  .route("/")
  .get(getAll)
  .post(body("nom").isLength({ min: 3, max: 20 }), addOnce);

router.route("/nom/:nom/prenom/:prenom").get(getOnceTwo);

router.route("/:employeId").put(updateOne).get(getOnce).delete(deleteOne);

router.route("/nom/:nom").get(getMany);
router.route("/pays/getpays").get(getPays);
router.route("/pays/filtrepays").post(getEmployeByPays);

export default router;
