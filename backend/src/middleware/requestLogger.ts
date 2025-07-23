import { Request, Response, NextFunction } from 'express';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.path} - ${req.ip && req.ip !== '::1' ? req.ip : 'localhost'}`);
    next();
};

export default requestLogger;