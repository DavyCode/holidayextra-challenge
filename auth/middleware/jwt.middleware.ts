import express from 'express';
import jwt from 'jsonwebtoken';
import { Jwt } from '../../common/types/jwt';
import { JWT_SECRET } from '../../config/env';

// @ts-expect-error
const jwtSecret: string = JWT_SECRET;

class JwtMiddleware {
  validJWTNeeded(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.headers['authorization']) {
      try {
        const authorization = req.headers['authorization'].split(' ');
        if (authorization[0] !== 'Bearer') {
          return res.status(401).json({ message: 'Unauthorized' });
        } else {
          res.locals.jwt = jwt.verify(authorization[1], jwtSecret) as Jwt;
          next();
        }
      } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
    } else {
      return res.status(401).json({ message: 'Authorization Required' });
    }
  }
}

export default new JwtMiddleware();
