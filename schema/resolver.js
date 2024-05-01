import { getAllQL } from "../controllers/competence.js";
import { getAllCompetenceEmploye } from "../controllers/competenceEmploye.js";
import { getAllQL_Employe, getOneEmploye } from "../controllers/employe.js";
import CompetenceEmploye from "../models/competenceEmploye.js";
import Competence from "../models/competence.js";
import Employe from "../models/employe.js";
import competence from "../models/competence.js";

const resolvers = {
  Query: {
    getCompetences() {
      return getAllQL();
    },
    getEmployes() {
      return getAllQL_Employe();
    },
    getEmploye(_, args) {
      return getOneEmploye(args.id);
    },
    async affectation() {
      const listObject = await CompetenceEmploye.find()
        .populate("employeId")
        .populate("competenceId")
        .exec();
      const data = listObject.map((o) => ({
        employe: o.employeId,
        competence: o.competenceId,
        niveau: o.niveau,
      }));

      console.log(data);

      return data;
    },
  },
  Employe: {
    async competences(parent) {
      const listObject = await CompetenceEmploye.find(
        { $or: [{ employeId: parent._id }, { employeId: parent.id }] },
        { competenceId: 1, _id: 0 }
      );
      console.log("le parent", parent);
      const data = [];
      for (let i of listObject) {
        data.push(i.competenceId);
      }

      const final = await Competence.find({ _id: { $in: data } });

      return final;
    },
  },
  Mutation: {
    async ajouterEmploye(_, args) {
      try {
        const newEmploye = await Employe.create(args.employe);
        console.log(args);
        console.log(newEmploye);
        return newEmploye;
      } catch (error) {
        console.error(error);
      }
    },
    async updateEmploye(_, args) {
      try {
        const employe = await Employe.findByIdAndUpdate(args.id, args);
        if (!employe) throw new Error(`employe with ID ${args.id} not found`);

        return employe;
      } catch (error) {
        console.error(error);
      }
    },
    async supprimerEmploye(_, args) {
      try {
        const employe = await Employe.findByIdAndDelete(args.id);
        if (!employe)
          throw new Error(`ID ${args.id} de l'employé n'existe pas`);

        return employe;
      } catch (err) {
        console.error(err);
      }
    },
    async ajouterCompetenceEmploye(_, args) {
      try {
        const employe = await CompetenceEmploye.create({ ...args });
        return employe;
      } catch (error) {
        console.error(error);
      }
    },
  },
};

export default resolvers;
