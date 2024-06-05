import Employe from "../models/employe.js";
import CompetenceEmploye from "../models/competenceEmploye.js";
import Competence from "../models/competence.js";

export async function nbEmploye(req, res) {
  try {
    const nbEmploye = await Employe.find();
    const nb = nbEmploye.length;
    res.status(200).json({ totalEmploye: nb });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

export async function nbEmployePays(req, res) {
  try {
    const nbEmploye = await Employe.aggregate([
      { $group: { _id: "$pays", pays: { $sum: 1 } } },
      { $project: { pays: "$_id", nbEmploye: "$pays", _id: 0 } },
    ]);
    res.status(200).json(nbEmploye);
  } catch (e) {
    res.status(500).json(e.message);
  }
}

export async function nbEmployeCompetence(req, res) {
  try {
    const nbEmploye = await CompetenceEmploye.aggregate([
      {
        $lookup: {
          from: "competences",
          localField: "competenceId",
          foreignField: "_id",
          as: "competenceDetails",
        },
      },
      {
        $unwind: "$competenceDetails", // Unwind to get the object instead of array
      },
      {
        $group: {
          _id: "$competenceDetails.libelle",
          nbEmploye: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          competence: "$_id",
          nbEmploye: 1,
        },
      },
    ]);
    console.log(nbEmploye);
    res.status(200).json(nbEmploye);
  } catch (e) {
    res.status(500).json(e.message);
  }
}

export async function nbEmployeCompetencePays(req, res) {
  try {
    const nbEmploye = await CompetenceEmploye.aggregate([
      {
        $lookup: {
          from: "competences",
          localField: "competenceId",
          foreignField: "_id",
          as: "competenceDetails",
        },
      },
      {
        $lookup: {
          from: "employes",
          localField: "employeId",
          foreignField: "_id",
          as: "employeDetails",
        },
      },
      {
        $unwind: "$competenceDetails", // Unwind to get the object instead of array
      },
      {
        $unwind: "$employeDetails",
      },
      {
        $group: {
          _id: {
            competence: "$competenceDetails.libelle",
            employe: "$employeDetails.pays",
          },
          nbEmploye: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          competence: "$_id.competence",
          pays: "$_id.employe",
          nbEmploye: 1,
        },
      },
    ]);
    console.log(nbEmploye);
    res.status(200).json(nbEmploye);
  } catch (e) {
    res.status(500).json(e.message);
  }
}
export async function nbEmployeCompetencePaysGroupe(req, res) {
  try {
    const nbEmploye = await CompetenceEmploye.aggregate([
      {
        $lookup: {
          from: "competences",
          localField: "competenceId",
          foreignField: "_id",
          as: "competenceDetails",
        },
      },
      {
        $lookup: {
          from: "employes",
          localField: "employeId",
          foreignField: "_id",
          as: "employeDetails",
        },
      },
      {
        $unwind: "$competenceDetails", // Unwind to get the object instead of array
      },
      {
        $unwind: "$employeDetails",
      },
      {
        $group: {
          _id: {
            competence: "$competenceDetails.libelle",
            employe: "$employeDetails.pays",
          },
          nbEmploye: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.competence",
          details: {
            $push: { k: "$_id.employe", v: "$nbEmploye" },
          },
        },
      },
      {
        $project: {
          _id: 0,
          competence: "$_id",
          details: { $arrayToObject: "$details" },
        },
      },
    ]);
    console.log(nbEmploye);
    res.status(200).json(nbEmploye);
  } catch (e) {
    res.status(500).json(e.message);
  }
}

export async function nbCompetence(req, res) {
  try {
    const nbCompetence = await Competence.find();
    res.status(200).json({ nbCompetence: nbCompetence.length });
  } catch (e) {
    res.status(500).json(e.message);
  }
}

export async function nbCompetencePays(req, res) {
  try {
    const nbCompetence = await CompetenceEmploye.aggregate([
      {
        $lookup: {
          from: "competences",
          localField: "competenceId",
          foreignField: "_id",
          as: "competenceDetails",
        },
      },
      {
        $lookup: {
          from: "employes",
          localField: "employeId",
          foreignField: "_id",
          as: "employeDetails",
        },
      },
      {
        $unwind: "$competenceDetails", // Unwind to get the object instead of array
      },
      {
        $unwind: "$employeDetails",
      },
      {
        $group: {
          _id: {
            competence: "$competenceDetails.libelle",
            employe: "$employeDetails.pays",
          },
        },
      },
      {
        $group: {
          _id: "$_id.employe",
          nbCompetence: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          nbCompetence: 1,
          pays: "$_id",
        },
      },
    ]);
    console.log(nbCompetence);
    res.status(200).json(nbCompetence);
  } catch (e) {
    res.status(500).json(e.message);
  }
}
