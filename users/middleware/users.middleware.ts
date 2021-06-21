import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import userService from '../services/users.service';
import { User } from '../types/user.type';

class UsersMiddleware {
  async validateRequiredUserBodyFields(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    if (
      req.body &&
      req.body.email &&
      req.body.password &&
      req.body.givenName &&
      req.body.familyName
    ) {
      next();
    } else {
      res.status(400).send({
        errors: ['Missing required fields: email and password'],
      });
    }
  }

  async validateSameEmailDoesntExist(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const user: User = await userService.getUserByEmail(req.body.email);

    if (user) {
      res.status(400).send({ errors: ['User email already exists'] });
    } else {
      next();
    }
  }

  async validateSameEmailBelongToSameUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const user: User = await userService.getUserByEmail(req.body.email);

    if (user && user._id.toString() === req.params.userId) {
      res.locals.user = user;
      next();
    } else {
      res.status(400).send({ errors: ['Invalid email'] });
    }
  }

  validatePatchEmail = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    if (req.body.email) {
      this.validateSameEmailBelongToSameUser(req, res, next);
    } else {
      next();
    }
  };

  async validateUserExists(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const user: User = await userService.readById(req.params.userId);
    if (user) {
      next();
    } else {
      res.status(404).send({
        errors: [`User ${req.params.userId} not found`],
      });
    }
  }

  async extractUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    req.body.id = req.params.userId;
    next();
  }

  async validMongooseObjectId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    if (mongoose.Types.ObjectId.isValid(req.params.userId)) {
      next();
    } else {
      res.status(400).send({ errors: ['Invalid userId'] });
    }
  }
}

export default new UsersMiddleware();
