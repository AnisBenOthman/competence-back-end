import mongoose from "mongoose";
const { Schema, model } = mongoose;

const CompetenceSchema = new Schema({
  libelle: {
    type: String,
    required: true,
  },
});
export default model("Competence", CompetenceSchema);
