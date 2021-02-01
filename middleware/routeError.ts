import { Request } from "express";
import { NextFunction } from "express";
import { Response } from "express";

/**
 * Route error middleware module.
 * @module routeError
 * @requires express-validator
 */
const { validationResult } = require('express-validator');

/**
 * Route error middleware.
 * @function
 * @name routeError
 * @param {object} - The request object
 * @param {object} - The response object
 * @param {object} - The next middleware or endpoint in the chain
 */
export const routeError = (request: Request, response: Response, next: NextFunction) => {
  // Set route access errors.
  const { errors } = validationResult(request);

  if (errors.length > 0) {
    // Return failure response.
    return response.status(400).json({
      code: 400,
      msg: 'Error in request parameter(s)',
      errors
    });
  }

  // Return to next middleware/controller.
  return next();
};