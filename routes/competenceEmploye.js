import express from "express";
import { body } from "express-validator";
import {
  getAll,
  addOnce,
  updateOne,
  getManyEmploye,
  getManyCompetence,
  filtreByCompetence,
  filtreByPays,
  deleteOnce,
  updateEmploye,
  getTeam,
} from "../controllers/competenceEmploye.js";
const router = express.Router();

router.route("/").get(getAll);
router.route("/getTeam").get(getTeam);

router
  .route("/:employeId/:competenceId")
  .post(body("niveau").isInt({ max: 3 }), addOnce);

router.route("/employe/:employeId").get(getManyEmploye).put(updateEmploye);
router.route("/:id").delete(deleteOnce).put(updateOne);

router.route("/competence/:competenceId").get(getManyCompetence);
router.route("/filtre/:competenceId").get(filtreByCompetence);

router.route("/update/:affectationId").patch(updateOne);
router.route("/pays/:pays").get(filtreByPays);

router.use((err, req, res, next) => {
  if (err) res.status(500).json({ error: true, message: err?.message, err });
});

export default router;
