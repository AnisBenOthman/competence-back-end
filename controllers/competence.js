import Competence from "../models/competence.js";

export async function addOnce(req, res) {
  const labelle = await Competence.findOne({
    libelle: req.body.libelle.toLowerCase(),
  });
  if (labelle) {
    res.status(200).json({ message: "libelle existe deja" });
  } else {
    Competence.create({
      libelle: req.body.libelle.toLowerCase(),
    })
      .then((newCompetence) => {
        res
          .status(200)
          .json({ message: "New competence added", data: newCompetence });
      })
      .catch((error) => {
        res.status(500).json({ message: "Error adding the competence", error });
      });
  }
}

export function getAll(req, res) {
  Competence.find({})
    .then((competences) => {
      const data = competences.map((o) => ({
        id: o._id,
        libelle: o.libelle.charAt(0).toUpperCase() + o.libelle.slice(1),
      }));
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: "Server Error", err });
    });
}

export async function getAllQL() {
  const competence = await Competence.find();
  return competence.map((o) => ({
    id: o._id,
    libelle:
      o.libelle.charAt(0).toUpperCase() + o.libelle.slice(1).toLowerCase(),
  }));
}

export function getMany(req, res) {
  Competence.find({ libelle: req.params.libelle.toLowerCase() })
    .then((competences) => {
      const data = competences.map((o) => ({
        id: o._id,
        libelle: o.libelle.charAt(0).toUpperCase() + o.libelle.slice(1),
      }));
      res.status(200).json(data);
    })
    .catch((e) => {
      res.status(404).json({ message: "Not found" });
    });
}

export function getOnce(req, res) {
  Competence.findById({ _id: req.params.competenceId })
    .then((competence) => {
      res.status(200).json({
        id: competence._id,
        libelle:
          competence.libelle.charAt(0).toUpperCase() +
          competence.libelle.slice(1),
      });
    })
    .catch((e) => {
      res.status(404).json({ message: "NotFound" });
    });
}

export function updateOne(req, res) {
  Competence.findByIdAndUpdate(
    { _id: req.params.competenceId },
    { libelle: req.body.libelle }
  )
    .then((competence) => {
      res
        .status(200)
        .json({ message: "Update Successful", newLabelle: competence });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}
