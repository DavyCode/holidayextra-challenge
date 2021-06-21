import { CommonRoutesConfig } from '../common/common.routes.config';
import UsersController from './controllers/users.controller';
import UsersMiddleware from './middleware/users.middleware';
import jwtMiddleware from '../auth/middleware/jwt.middleware';
import BodyValidationMiddleware from '../common/middleware/body.validation.middleware';
import { body } from 'express-validator';

import express from 'express';

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'UsersRoutes');
  }

  configureRoutes(): express.Application {
    this.app
      .route(`/users`)
      .post(
        UsersMiddleware.validateRequiredUserBodyFields,
        UsersMiddleware.validateSameEmailDoesntExist,
        UsersController.createUser
      );

    this.app.param(`userId`, UsersMiddleware.extractUserId);
    this.app
      .route(`/users/:userId`)
      .all(
        UsersMiddleware.validMongooseObjectId,
        UsersMiddleware.validateUserExists,
        jwtMiddleware.validJWTNeeded
      )
      .get(UsersController.getUserById)
      .delete(UsersController.removeUser);

    this.app.put(`/users/:userId`, [
      jwtMiddleware.validJWTNeeded,
      body('email').isEmail(),
      body('password')
        .isLength({ min: 5 })
        .withMessage('Must include password (5+ characters)'),
      body('givenName').isString(),
      body('familyName').isString(),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      UsersMiddleware.validateSameEmailBelongToSameUser,
      UsersController.put,
    ]);

    this.app.patch(`/users/:userId`, [
      jwtMiddleware.validJWTNeeded,
      body('email').isEmail().optional(),
      body('password')
        .isLength({ min: 5 })
        .withMessage('Password must be 5+ characters')
        .optional(),
      body('givenName').isString().optional(),
      body('familyName').isString().optional(),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      UsersMiddleware.validatePatchEmail,
      UsersController.patch,
    ]);

    return this.app;
  }
}
