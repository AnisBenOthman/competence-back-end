import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import typsDefs from "./schema/schema.js";
import resolvers from "./schema/resolver.js";

import { notFoundError, errorHandler } from "./middlewares/error-handler.js";

import competenceRoutes from "./routes/competence.js";
import employeRoutes from "./routes/employe.js";
import competenceEmployeRoutes from "./routes/competenceEmploye.js";
import kpiRoutes from "./routes/kpi.js";

const app = express();
const port = process.env.PORT || 9090;
const databaseName = "iplabel";

mongoose.set("debug", true);
mongoose.Promise = global.Promise;

mongoose
  .connect(`mongodb://127.0.0.1:27017/${databaseName}`)
  .then(() => {
    console.log(`Connected to ${databaseName}`);
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/competence", competenceRoutes);
app.use("/employe", employeRoutes);

app.use("/competenceEmploye", competenceEmployeRoutes);
app.use("/kpi", kpiRoutes);

app.use(notFoundError);
app.use(errorHandler);

async function startApolloServer() {
  const server = new ApolloServer({ typeDefs: typsDefs, resolvers });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`Server ready at ${url}`);
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

startApolloServer();
