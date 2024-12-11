import { NextFunction, Request, Response } from 'express'

export const normalizeLimit = async (req: Request, _: Response, next: NextFunction) => {
    if (req.query.limit)
        if (Number(req.query.limit)>10)
            req.query.limit="10";
    next();
  }