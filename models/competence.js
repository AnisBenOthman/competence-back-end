import mongoose from "mongoose";
import CompetenceEmploye from "./competenceEmploye.js";
const { Schema, model } = mongoose;

const CompetenceSchema = new Schema({
  libelle: {
    type: String,
    required: true,
  },
});

CompetenceSchema.post("findOneAndDelete", async function (doc, next) {
  try {
    await CompetenceEmploye.deleteMany({ competenceId: doc._id });
    console.log(doc);
    console.log(`les affectations de la ${doc._id} sont tous supprimées`);
    next();
  } catch (err) {
    console.error(err.message);
  }
});

export default model("Competence", CompetenceSchema);
