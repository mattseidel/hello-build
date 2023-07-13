import { ErrorTypes } from "./ErrorsTypes";

export class ErrorMessage extends Error {
    name: ErrorTypes;
    showTime: number;
  constructor(message: string, type: ErrorTypes, showTime = 3000) {
    super(message);
    this.name = type;
    this.showTime = showTime;
  }
}
