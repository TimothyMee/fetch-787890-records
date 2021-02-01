import { NextFunction, Request, Response } from "express";
import { start } from "repl";
import { Record } from "../models/records";

export class RecordController {
    /**
     * Constructor
     *
     */
    constructor( ) { }
      
    /**
     * Controller to fetch records.
     * @function
     * @name fetch
     * @param {object} - The request object containing params or body.
     * @param {object} - The response object for attaching/customizing data to respond with.
     * @param {object} - The next middleware in the chain to process the request.
     * @returns {object} - JSON response object.
     */
    async fetch(request: Request, response: Response, next: NextFunction) {
      try {
        const { startDate, endDate, minCount, maxCount } = request.body;
        //check if valid dates 
        if(!Date.parse(startDate) || !Date.parse(endDate)) {
          return response.status(400).json({
            code: 400,
            msg: 'Invalid dates. Check start and end date'
          }) 
        }

        //set hours to capture all data within range
        const parsedStartDate = new Date(startDate).setHours(0, 0, 0, 0);
        const parsedEndDate = new Date(endDate).setHours(23, 59, 59, 999);

        // query to fetch data
        const records = await Record.aggregate([
          {
            $match: {
              "$expr": {
                "$and": [
                  {
                    "$gte": [
                      "$createdAt", 
                      {
                          "$toDate": parsedStartDate 
                      }
                    ],
                  },
                  {
                    "$lte": [
                      "$createdAt", 
                      {
                          "$toDate": parsedEndDate 
                      }
                    ],
                  }
                ]
                
              }
            }
          },
          {
            $addFields: {
              totalCount: {
                $sum: "$counts"
              },
            }
          },
          {
            $match: {
              totalCount: {
                $gte: minCount,
                $lte: maxCount
              }
            }
          },
          {
            $project: {
              createdAt: 1,
              totalCount: 1,
              _id: 0,
              key: 1,
            }
          }
        ]);

        return response.status(200).json({
          code: 0,
          msg: "Success",
          records
        })
        
      } catch (error: any) {
        // Return the failed response.
        return response.status(500).json({
          code: 500,
          msg: 'An error occurred fetching data'
        });
      }
    }
  }