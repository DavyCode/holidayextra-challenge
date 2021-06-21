import express from 'express';
import debug from 'debug';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_TOKEN_EXPIRE } from '../../config/env';

const log: debug.IDebugger = debug('app:auth-controller');

// @ts-expect-error
const jwtSecret: string = JWT_SECRET;
const tokenExpirationInSeconds = parseInt(JWT_TOKEN_EXPIRE as string, 10);

class AuthController {
  async createJWT(req: express.Request, res: express.Response) {
    try {
      const token = jwt.sign(req.body, jwtSecret, {
        expiresIn: tokenExpirationInSeconds,
      });
      return res.status(201).send({ accessToken: token });
    } catch (err) {
      log('createJWT error: %O', err);
      return res.status(500).send();
    }
  }
}

export default new AuthController();
