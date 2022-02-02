import { PORT, NODE_ENV } from "../config";
import express from "express";
import logger from "./logger";

export class Server {
  private readonly _app: express.Application;

  readonly logger = logger;

  constructor() {
    this._app = express();

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

  start(): void {
    this.app.use(
      (
        error: Error,
        _req: express.Request,
        res: express.Response,
        _next: express.NextFunction
      ) => {
        if (error.name === "UnauthorizedError") {
          res.status(401).send("Unauthorized");
        }
        this.logger.error(error.stack);
        return res.status(500).end();
      }
    );
    this.app.all("*", function (_, res: express.Response) {
      res.status(404).send({ error: true, message: "Check your URL please" });
    });
    this.app.listen(PORT, () =>
      this.logger.info(
        `ENV: ${NODE_ENV}; Dashboard-api is listening on port ${PORT}`
      )
    );
  }
}
