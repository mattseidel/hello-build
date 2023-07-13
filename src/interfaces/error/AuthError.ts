import { ErrorMessage } from "./Error";
import { ErrorTypes } from "./ErrorsTypes";

export class AuthError extends ErrorMessage {
  constructor(message: string, showTime = 3000) {
    super(message, ErrorTypes.AuthError, showTime);
  }
}
