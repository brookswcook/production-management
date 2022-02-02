import { Server } from "./lib/server";
import cors from "cors";
import jwt from "express-jwt";
import { jwtAuth } from "./lib/jwt";

class DashboardServer extends Server {
  constructor() {
    super();
    this.init();
  }

  protected init() {
    this.logger.info(`Dashboard app`);
    this.setupMiddlewares();
    this.setupRoutes();
    this.start();
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

  protected setupRoutes() {
    this.app.use("/", (req, res) => res.send("Dashboard app"));
    this.logger.info("Routes ready");
  }
}

new DashboardServer();
