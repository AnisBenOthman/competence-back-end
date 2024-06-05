import express from "express";
import {
  nbCompetence,
  nbCompetencePays,
  nbEmploye,
  nbEmployeCompetence,
  nbEmployeCompetencePays,
  nbEmployeCompetencePaysGroupe,
  nbEmployePays,
} from "../controllers/kpi.js";
const router = express.Router();

router.route("/").get(nbEmploye);

router.route("/pays").get(nbEmployePays);
router.route("/competence").get(nbEmployeCompetence);
router.route("/competence/pays").get(nbEmployeCompetencePays);
router.route("/competence/paysgroupe").get(nbEmployeCompetencePaysGroupe);
router.route("/competence/nbcompetence").get(nbCompetence);
router.route("/competence/nbcompetencepays").get(nbCompetencePays);
export default router;
