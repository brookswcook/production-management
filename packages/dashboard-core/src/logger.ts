import {
  transports,
  format,
  createLogger,
  Logger,
  level as levelType,
} from "winston";

export function useLogger(service: string, level = "info") {
  const logger: Logger = createLogger({
    level: level as levelType,
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
