import Competence from "../models/competence.js";
import Employe from "../models/employe.js";
import CompetenceEmploye from "../models/competenceEmploye.js";
import { validationResult } from "express-validator";
import competenceEmploye from "../models/competenceEmploye.js";

export async function addOnce(req, res, next) {
  try {
    const competence = await Competence.findById({
      _id: req.params.competenceId,
    });
    console.log(competence);
    const anis = await Employe.findOne({
      _id: req.params.employeId,
    });

    const condition = await CompetenceEmploye.findOne({
      competenceId: req.params.competenceId,
      employeId: req.params.employeId,
    });
    if (!validationResult(req).isEmpty()) {
      res.status(400).json(validationResult(req).array());
    } else if (condition) {
      res
        .status(200)
        .json({ error: "competence deja affecté à cette personne" });
    } else
      res.json(
        await CompetenceEmploye.create({
          niveau: req.body.niveau,
          employeId: req.params.employeId,
          competenceId: req.params.competenceId,
        })
      );
  } catch (error) {
    next(error);
  }
}

export async function getAll(req, res) {
  try {
    const listObject = await CompetenceEmploye.find()
      .populate("employeId")
      .populate("competenceId")
      .exec();

    // const data = listObject.map((obj) => ({
    //   nom:
    //     obj.employeId.nom.charAt(0).toUpperCase() + obj.employeId.nom.slice(1),
    //   prenom:
    //     obj.employeId.prenom.charAt(0).toUpperCase() +
    //     obj.employeId.prenom.slice(1),
    //   pays:
    //     obj.employeId.pays.charAt(0).toUpperCase() +
    //     obj.employeId.pays.slice(1),
    //   competence:
    //     obj.competenceId.libelle.charAt(0).toUpperCase() +
    //     obj.competenceId.libelle.slice(1),
    //   niveau: obj.niveau,
    // }));

    res.status(200).json(listObject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getAllCompetenceEmploye() {
  try {
    const listObject = await CompetenceEmploye.find()
      .populate("employeId")
      .populate("competenceId")
      .exec();
    console.log(listObject);
    return listObject;
    //  listObject.map((obj) => ({
    //   nom:
    //     obj.employeId.nom.charAt(0).toUpperCase() + obj.employeId.nom.split(1),
    //   prenom:
    //     obj.employeId.prenom.charAt(0).toUpperCase() +
    //     obj.employeId.prenom.split(1),
    //   pays:
    //     obj.employeId.pays.charAt(0).toUpperCase() +
    //     obj.employeId.pays.split(1),
    //   competence:
    //     obj.competenceId.libelle.charAt(0).toUpperCase() +
    //     obj.competenceId.libelle.split(1),
    //   niveau: obj.niveau,
    // }));
  } catch (err) {
    return err;
  }
}

export function getManyEmploye(req, res) {
  competenceEmploye
    .find({ employeId: req.params.employeId })
    .populate("employeId")
    .populate("competenceId")
    .exec()
    .then((employes) => {
      const data = employes.map((obj) => ({
        id: obj._id,
        nom:
          obj.employeId.nom.charAt(0).toUpperCase() +
          obj.employeId.nom.slice(1),
        prenom:
          obj.employeId.prenom.charAt(0).toUpperCase() +
          obj.employeId.prenom.slice(1),
        pays:
          obj.employeId.pays.charAt(0).toUpperCase() +
          obj.employeId.pays.slice(1),
        competence:
          obj.competenceId.libelle.charAt(0).toUpperCase() +
          obj.competenceId.libelle.slice(1),
        niveau: obj.niveau,
      }));
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export async function getManyCompetence(req, res) {
  try {
    const competences = await competenceEmploye
      .find({
        competenceId: req.params.competenceId,
      })
      .populate("employeId")
      .populate("competenceId")
      .exec();

    const data = competences.map((obj) => ({
      id: obj._id,
      nom:
        obj.employeId.nom.charAt(0).toUpperCase() + obj.employeId.nom.slice(1),
      prenom:
        obj.employeId.prenom.charAt(0).toUpperCase() +
        obj.employeId.prenom.slice(1),
      pays:
        obj.employeId.pays.charAt(0).toUpperCase() +
        obj.employeId.pays.slice(1),
      competence:
        obj.competenceId.libelle.charAt(0).toUpperCase() +
        obj.competenceId.libelle.slice(1),
      niveau: obj.niveau,
    }));
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

export function updateOne(req, res) {
  competenceEmploye
    .findByIdAndUpdate(
      { _id: req.params.affectationId },
      { niveau: req.body.niveau }
    )
    .then((affectation) => {
      res.status(200).json({ message: "Update Successful", affectation });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
}

export async function filtreByCompetence(req, res) {
  try {
    const employes = await competenceEmploye
      .find({ competenceId: req.params.competenceId })
      .populate("employeId")
      .populate("competenceId")
      .sort("-niveau")
      .limit(2)
      .exec();
    const data = employes.map((obj) => ({
      nom:
        obj.employeId.nom.charAt(0).toUpperCase() + obj.employeId.nom.slice(1),
      prenom:
        obj.employeId.prenom.charAt(0).toUpperCase() +
        obj.employeId.prenom.slice(1),
      pays:
        obj.employeId.pays.charAt(0).toUpperCase() +
        obj.employeId.pays.slice(1),
      competence:
        obj.competenceId.libelle.charAt(0).toUpperCase() +
        obj.competenceId.libelle.slice(1),
      niveau: obj.niveau,
    }));
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

export async function filtreByPays(req, res) {
  try {
    const listePays = await Employe.find({
      pays: req.params.pays.toLowerCase(),
    });
    const data = [];
    listePays.map((o) => data.push(o._id));

    const listEmployes = await CompetenceEmploye.find({
      employeId: { $in: data },
    })
      .populate("employeId")
      .populate("competenceId");

    const dataFinal = listEmployes.map((obj) => ({
      nom:
        obj.employeId.nom.charAt(0).toUpperCase() + obj.employeId.nom.slice(1),
      prenom:
        obj.employeId.prenom.charAt(0).toUpperCase() +
        obj.employeId.prenom.slice(1),
      pays:
        obj.employeId.pays.charAt(0).toUpperCase() +
        obj.employeId.pays.slice(1),
      competence:
        obj.competenceId.libelle.charAt(0).toUpperCase() +
        obj.competenceId.libelle.slice(1),
      niveau: obj.niveau,
    }));
    res.status(200).json(dataFinal);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

export async function deleteOnce(req,res){
  try {
    const affect = await CompetenceEmploye.findByIdAndDelete({_id : req.params.id});
    res.status(200).json({message : "Affectation has been deleted successfully"})
  }catch(error){
    res.status(500).json({error : error})
  }
}
