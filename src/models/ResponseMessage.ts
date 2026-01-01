import {StatusCodes} from 'http-status-codes';

export class ResponseMessage{
  constructor(public message: string = "", status: string = "", statusCode: StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR) {}
}
