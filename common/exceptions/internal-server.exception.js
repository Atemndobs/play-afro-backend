import { internalServerError } from "../../utils/response/responseCode";
import GeneralError from "./general-error";

class IntenalServerException extends GeneralError {
  constructor(message) {
    super()
    this.message = message
    this.status = internalServerError
  }

}

export default IntenalServerException
