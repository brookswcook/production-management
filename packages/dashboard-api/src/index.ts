import "reflect-metadata";
import config from "./config";
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
import { authChecker } from "./lib/auth";
import { graphqlUploadExpress } from "graphql-upload";
import { logPlugin } from "./lib/graphqlLogPlugin";
import { TypegooseMiddleware } from "./lib/typegoose-middleware";

class DashboardApolloServer extends Server {
  constructor() {
    const { port, environment } = config;
    super(port, environment);
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
      globalMiddlewares: [TypegooseMiddleware],
      authChecker,
    });
    return new ApolloServer({
      plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground(),
        ApolloServerPluginDrainHttpServer({ httpServer: this.httpServer }),
        logPlugin,
      ],
      introspection: true,
      schema,
      context: ({ req }) => ({
        user: req.user,
      }),
    });
  }

  protected setupMiddlewares() {
    this.app.use(
      cors({
        origin: "*",
        methods: ["GET", "POST"],
      })
    );
    this.app.use(graphqlUploadExpress({ maxFileSize: 2e7 }));
    this.app.use(jwt(jwtAuth));
  }

  protected async initializeDB() {
    try {
      const { debugModeEnabled, uri } = config.db;
      mongoose.set("debug", debugModeEnabled);
      await mongoose.connect(uri);
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
