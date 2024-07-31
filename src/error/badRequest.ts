import customError from "./customError";
import { StatusCodes } from "http-status-codes";

export default class BadRequestError extends customError {
  statusCode = StatusCodes.BAD_REQUEST

  constructor(msg: string | undefined) {
    super(msg)
    this.statusCode = this.statusCode
  }
}