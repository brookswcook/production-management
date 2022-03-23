import { AuthenticationError } from "apollo-server-express";
import express from "express";
import http from "http";
import logger from "./logger";

export class Server {
  private readonly _app: express.Application;
  private readonly _httpServer: http.Server;
  private readonly port: number;
  private readonly nodeEnv: string;
  protected readonly logger = logger;

  constructor(port: number, nodeEnv: string) {
    this._app = express();
    this._httpServer = http.createServer(this._app);
    this.port = port;
    this.nodeEnv = nodeEnv;

    process.on("unhandledRejection", (error: Error) => {
      this.logger.error(`unhandledRejection
      ${error.toString()}`);
    });

    process.on("uncaughtException", (error: Error) => {
      this.logger.error(`uncaughtException
      ${error.toString()}`);
    });
  }

  protected get app(): express.Application {
    return this._app;
  }

  protected get httpServer(): http.Server {
    return this._httpServer;
  }

  start(): Promise<void> {
    this.app.use(
      (
        error: Error,
        _req: express.Request,
        res: express.Response,
        _next: express.NextFunction
      ) => {
        if (error.name === "UnauthorizedError") {
          return res
            .status(401)
            .send(new AuthenticationError("Not authorized or invalid token!"));
        }
        this.logger.error(error.stack);
        return res.status(500).end();
      }
    );
    this.app.all("*", function (_, res: express.Response) {
      res.status(404).send({ error: true, message: "Check your URL please" });
    });

    return new Promise<void>(resolve =>
      this.httpServer.listen({ port: this.port }, () => {
        this.logger.info(`ENV: ${this.nodeEnv}`);
        this.logger.info(`Server ready at http://localhost:${this.port}`);
        resolve();
      })
    );
  }
}
