import { InternalServerError, MethodNotAllowedError } from "infra/errors";

function onErrorHandler(error, resquest, response) {
  const publicErrorObject = new InternalServerError({
    cause: error,
    statusCode: error.statusCode,
  });

  console.error(publicErrorObject);
  response.status(publicErrorObject.statusCode).json(publicErrorObject);
}

function onNoMatchHandler(request, response) {
  const publicErrorObject = new MethodNotAllowedError();
  response.status(publicErrorObject.statusCode).json(publicErrorObject);
}

const controller = {
  errorHandlers: {
    onNoMatch: onNoMatchHandler,
    onError: onErrorHandler,
  },
};

export default controller;
