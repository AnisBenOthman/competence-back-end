const typsDefs = `#graphql
  
  type Employe {
    id: ID!
    nom: String!
    prenom: String!
    pays: String!
    competences: [Competence!]
  }
  type Competence {
    id: ID!
    libelle: String!
    employes: [Employe!]
  }
  type CompetenceEmploye {
    id: ID!
    employe: Employe!
    competence: Competence!
    niveau: Int!
  }
  type Query {
    getCompetences: [Competence]
    getEmployes: [Employe]
    getEmploye(id: ID!) : Employe
    affectation: [CompetenceEmploye]
  }
  type  Mutation {
    ajouterEmploye(employe:AddEmployeInput!):Employe
    updateEmploye(id:ID!,nom:String,prenom:String,pays:String):Employe
    supprimerEmploye(id:ID!):Employe
    ajouterCompetenceEmploye(employeId: ID!, competenceId: ID!, niveau : Int!): CompetenceEmploye
  }
  input AddEmployeInput {
    nom : String!
    prenom: String!
    pays: String!
  }
`;

export default typsDefs;
