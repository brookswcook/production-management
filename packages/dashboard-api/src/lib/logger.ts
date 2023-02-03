import config from "../config";
import { transports, format, createLogger, Logger } from "winston";

function useLogger(service: string, level = "info") {
  const logger: Logger = createLogger({
    level: level,
    format: format.json(),
    defaultMeta: { service },
    transports: [
      new transports.File({ filename: "error.log", level: "error" }),
      new transports.File({ filename: "combined.log" }),
    ],
  });

  if (process.env.NODE_ENV !== "production") {
    logger.add(
      new transports.Console({
        format: format.simple(),
      })
    );
  }

  return logger;
}

const logger: Logger = useLogger("dashboard-api", config.logging.level); //eslint-disable-line react-hooks/rules-of-hooks

export default logger;
