import { CommonRoutesConfig } from '../common/common.routes.config';
import authController from './controllers/auth.controller';
import authMiddleware from './middleware/auth.middleware';
import express from 'express';

export class AuthRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'AuthRoutes');
  }

  configureRoutes(): express.Application {
    this.app.post(`/auth`, [
      authMiddleware.validateBodyRequest,
      authMiddleware.verifyUserPassword,
      authController.createJWT,
    ]);
    return this.app;
  }
}
