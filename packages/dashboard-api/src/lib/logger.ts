import { LOG_LEVEL } from "../config";
import { Logger } from "winston";
import { useLogger } from "dashboard-core";

const logger: Logger = useLogger("dashboard-api", LOG_LEVEL); //eslint-disable-line react-hooks/rules-of-hooks

export default logger;
