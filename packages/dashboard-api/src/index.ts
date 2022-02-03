import "reflect-metadata";
import { PORT as port, NODE_ENV as nodeEnv } from "./config";
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

class DashboardApolloServer extends Server {
  constructor() {
    super(Number(port), nodeEnv);
  }

  public async init() {
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
}

async function run() {
  const dashboardApolloServer = new DashboardApolloServer();
  await dashboardApolloServer.init();
  void dashboardApolloServer.start();
}

void run();
