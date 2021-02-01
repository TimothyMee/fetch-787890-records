
import * as express from 'express';
import { NextFunction } from 'express';
import { Response } from 'express';
import { Request } from 'express';
import { check } from 'express-validator';
import { RecordController } from '../controllers/RecordController';
import { routeError } from '../middleware/routeError';

const router = express.Router();
const recordController = new RecordController();
/**
 * Base route to fetch records.
 * @function
 */
router.post(
   '/', 
   [
      check('startDate').notEmpty().trim(),
      check('endDate').notEmpty().trim(),
      check('minCount').notEmpty().isNumeric(),
      check('maxCount').notEmpty().isNumeric(),
   ],
   routeError,
   recordController.fetch
);

/**
 * 404 Not Found error.
 * @function
 */
router.use((request: Request, response: Response, next: NextFunction) => {
   return response.status(404).json({
      code: 404,
      msg: 'Not found'
   })
});

export { router as routes };
