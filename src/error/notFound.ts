import customError from "./customError.js";
import { StatusCodes } from "http-status-codes";

export default class NotFoundError extends customError {
  statusCode = StatusCodes.NOT_FOUND

  constructor(msg: string | undefined) {
    super(msg)
    this.statusCode = this.statusCode

  }
}