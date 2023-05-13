import { config } from "dotenv";

config();

// MAIL SENDER CONSTANTS
export const MAIL_HOST = process.env.APP_MAIL_HOST;
export const MAIL_PORT = process.env.APP_MAIL_PORT;
export const MAIL_USER = process.env.APP_MAIL_USER;
export const MAIL_PASSWORD = process.env.APP_MAIL_PASSWORD;
export const DOMAIN = process.env.APP_DOMAIN;
export const WEBSITE_NAME = process.env.APP_WEBSITE_NAME;