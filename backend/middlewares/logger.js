import winston from "winston";
const _transports = winston.transports;
const _format = winston.format;

import { logger, errorLogger as _errorLogger } from "express-winston";

export const requestLogger = logger({
  transports: [new _transports.File({ filename: "request.log" })],
  format: _format.json(),
});

export const errorLogger = _errorLogger({
  transports: [new _transports.File({ filename: "error.log" })],
  format: _format.json(),
});

export default {
  requestLogger,
  errorLogger,
};
