import "reflect-metadata";
import {
  PORT as port,
  NODE_ENV as nodeEnv,
  MONGO_DEBUG_MODE_ENABLED,
  MONGO_URI,
} from "./config";
import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
import { Server } from "./lib/server";
import cors from "cors";
import jwt from "express-jwt";
import { jwtAuth } from "./lib/jwt";
import { buildSchema } from "type-graphql";
import mongoose from "mongoose";

class DashboardApolloServer extends Server {
  constructor() {
    super(Number(port), nodeEnv);
  }

  public async init() {
    await this.initializeDB();
    const apolloServer = await this.setupApolloServer();
    await apolloServer.start();
    this.setupMiddlewares();
    apolloServer.applyMiddleware({ app: this.app });
    this.logger.info(`Apollo server path is: ${apolloServer.graphqlPath}`);
  }

  protected async setupApolloServer(): Promise<ApolloServer> {
    const schema = await buildSchema({
      resolvers: [__dirname + "/modules/**/*.resolver.{js,ts}"],
    });
    return new ApolloServer({
      plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground(),
        ApolloServerPluginDrainHttpServer({ httpServer: this.httpServer }),
      ],
      introspection: true,
      schema,
    });
  }

  protected setupMiddlewares() {
    this.app.use(jwt(jwtAuth));
    this.app.use(
      cors({
        origin: "*",
        methods: ["GET", "POST"],
      })
    );
  }

  protected async initializeDB() {
    try {
      mongoose.set("debug", Boolean(MONGO_DEBUG_MODE_ENABLED));
      await mongoose.connect(MONGO_URI);
      this.logger.info("Connected to mongo successfully");
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}

async function run() {
  const dashboardApolloServer = new DashboardApolloServer();
  await dashboardApolloServer.init();
  void dashboardApolloServer.start();
}

void run();
