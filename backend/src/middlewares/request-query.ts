import { NextFunction, Request, Response } from 'express'
import BadRequestError  from '../errors/bad-request-error'

export const normalizeLimit = async (req: Request, _: Response, next: NextFunction) => {
    if (req.query.limit)
        if (Number(req.query.limit)>10)
            req.query.limit="10";
    next();
  }

  export const checkQueryOnObject = async (req: Request, _: Response, next: NextFunction) => {
    for (let q in req.query) {
        if (typeof req.query[q] === 'object') {
            next(new BadRequestError('Входной параметр не может быть объектом!'))
        }        
    }
    next();
  }

  