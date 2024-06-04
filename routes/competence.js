import express from "express";
import { body } from "express-validator";
import {
  getAll,
  addOnce,
  getOnce,
  getMany,
  updateOne,
  deleteOne,
} from "../controllers/competence.js";
const router = express.Router();

router.route("/").get(getAll).post(addOnce);

router.route("/id/:competenceId").get(getOnce).put(updateOne).delete(deleteOne);

router.route("/:libelle").get(getMany);

export default router;
