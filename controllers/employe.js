import CompetenceEmploye from "../models/competenceEmploye.js";
import Employe from "../models/employe.js";
import { validationResult } from "express-validator";

export function addOnce(req, res) {
  if (!validationResult(req).isEmpty()) {
    res.status(400).json(validationResult(req).array());
  } else {
    // send back all errors
    Employe.create({
      nom: req.body.nom.toLowerCase(),
      prenom: req.body.prenom.toLowerCase(),
      pays: req.body.pays.toLowerCase(),
    })
      .then((employe) => {
        res.status(200).json(employe);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
}

export function getAll(req, res) {
  Employe.find()
    .then((allEmployee) => {
      const data = allEmployee.map((o) => ({
        id: o._id,
        nom: o.nom.charAt(0).toUpperCase() + o.nom.slice(1),
        prenom: o.prenom.toUpperCase(),
        pays: o.pays.charAt(0).toUpperCase() + o.pays.slice(1),
      }));

      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
}

export async function getAllQL_Employe() {
  const employes = await Employe.find({});

  return employes.map((o) => ({
    id: o._id,
    nom: o.nom.charAt(0).toUpperCase() + o.nom.slice(1).toLowerCase(),
    prenom: o.prenom.toUpperCase(),
    pays: o.pays.charAt(0).toUpperCase() + o.pays.slice(1).toLowerCase(),
  }));
}

export async function getOneEmploye(id) {
  try {
    const employe = await Employe.findById({ _id: id });
    if (!employe) {
      throw new ApolloError("employe not found");
      return;
    }
    return {
      Id: employe.id,
      nom: employe.nom.charAt(0).toUpperCase() + employe.nom.slice(1),
      prenom: employe.prenom.toUpperCase(),
      pays: employe.pays.charAt(0).toUpperCase() + employe.pays.slice(1),
    };
  } catch (error) {
    console.error(error);
    throw new Error("unable to fetch  employee data");
  }
}

export function getOnceTwo(req, res) {
  Employe.find({
    nom: req.params.nom.toLowerCase(),
    prenom: req.params.prenom.toLowerCase(),
  })
    .then((employe) => {
      const data = employe.map((o) => ({
        id: o._id,
        nom: o.nom.charAt(0).toUpperCase() + o.nom.slice(1),
        prenom: o.prenom.toUpperCase(),
        pays: o.pays.charAt(0).toUpperCase() + o.pays.slice(1),
      }));
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(404).json("Employé non trouvé");
    });
}

export function getOnce(req, res) {
  Employe.findById({ _id: req.params.employeId })
    .then((employe) => {
      res.status(200).json({
        _id: employe._id,
        nom: employe.nom.charAt(0).toUpperCase() + employe.nom.slice(1),
        prenom: employe.prenom.toUpperCase(),
        pays: employe.pays.charAt(0).toUpperCase() + employe.pays.slice(1),
      });
    })
    .catch((err) => {
      res.status(404).json("Employé non trouvé");
    });
}

export function getMany(req, res) {
  Employe.find({ nom: req.params.nom.toLowerCase() })
    .then((employes) => {
      const data = employes.map((o) => ({
        id: o.id,
        nom: o.nom.charAt(0).toUpperCase() + o.nom.slice(1),
        prenom: o.prenom.toUpperCase(),
        pays: o.pays.charAt(0).toUpperCase() + o.pays.slice(1),
      }));
      res.status(200).json(data);
    })
    .catch((e) => {
      res.status(404).json({ message: "Not found" });
    });
}

export function updateOne(req, res) {
  Employe.findByIdAndUpdate({ _id: req.params.employeId }, req.body)
    .then((employee) => {
      res.status(200).json({
        Message: "update successfuly",
        nom: req.body.nom,
        prenom: req.body.prenom,
        pays: req.body.pays,
      });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
}

export async function deleteOne(req, res) {
  try {
    await Employe.findByIdAndDelete({ _id: req.params.employeId });

    res.status(200).json({ message: "CompetenceEmploye deleted successfully" });
  } catch (error) {
    console.error(error);
  }
}
