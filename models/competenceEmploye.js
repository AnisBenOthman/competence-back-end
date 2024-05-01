import mongoose from "mongoose";
const { Schema, model } = mongoose;

const CompetenceEmployeSchema = new Schema({
  niveau: {
    type: Number,
    required: true,
  },
  employeId: {
    type: Schema.Types.ObjectId,
    ref: "Employe",
    required: true,
  },
  competenceId: {
    type: Schema.Types.ObjectId,
    ref: "Competence",
    required: true,
  },
});
export default model("CompetenceEmploye", CompetenceEmployeSchema);
