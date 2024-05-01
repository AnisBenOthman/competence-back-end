import mongoose from "mongoose";
import CompetenceEmploye from "./competenceEmploye.js";
const { Schema, model } = mongoose;

const EmployeSchema = new Schema({
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  pays: {
    type: String,
    required: true,
  },
});

EmployeSchema.post("findOneAndDelete", async function (doc, next) {
  try {
    await CompetenceEmploye.deleteMany({ employeId: doc._id });
    console.log(`Competences de l'employé ${doc._id} supprimées`);
    next();
  } catch (err) {
    console.error(err.message);
  }
});

export default model("Employe", EmployeSchema);
