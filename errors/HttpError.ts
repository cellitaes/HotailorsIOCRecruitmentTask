import { INTERNAL_SERVER_ERROR } from "../constants/messages";
import { HttpStatus } from "../enums/HttpStatus";

export class HttpError extends Error {
  readonly code: number;

  constructor(
    message: string = INTERNAL_SERVER_ERROR,
    code: number = HttpStatus.INTERNAL_ERROR
  ) {
    super(message);
    this.code = code;
  }
}
