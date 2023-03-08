import sendgrid, { MailDataRequired } from "@sendgrid/mail";
import logger from "./logger";
import config from "../config";

sendgrid.setApiKey(config.sendgrid.apiKey);

export async function send(args: MailDataRequired) {
  try {
    await sendgrid.send(args);
  } catch (error) {
    logger.error("Error sending email:", error, args);
    throw new Error("Error sending email");
  }
}
