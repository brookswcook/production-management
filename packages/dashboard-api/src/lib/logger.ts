import config from "../config";
import { Logger } from "winston";
import { useLogger } from "dashboard-core";

const logger: Logger = useLogger("dashboard-api", config.logging.level); //eslint-disable-line react-hooks/rules-of-hooks

export default logger;
