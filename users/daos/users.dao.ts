import mongooseService from '../../common/services/mongoose.service';
import debug from 'debug';
import { CreateUserDto } from '../dto/create.user.dto';
import { PatchUserDto } from '../dto/patch.user.dto';
import { PutUserDto } from '../dto/put.user.dto';
import { User } from '../types/user.type';

const log: debug.IDebugger = debug('app:users-dao');

class UsersDao {
  Schema = mongooseService.getMongoose().Schema;

  userSchema = new this.Schema({
    email: String,
    password: { type: String, select: false },
    givenName: String,
    familyName: String,
    created: Date,
  });

  User = mongooseService.getMongoose().model('Users', this.userSchema);

  constructor() {
    log('Created new instance of UsersDao');
  }

  async addUser(userFields: CreateUserDto): Promise<string> {
    const user = new this.User({
      ...userFields,
      created: Date.now(),
    });
    await user.save();
    return user._id;
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.User.findOne({ email: email }).exec();
  }

  async getUserByEmailWithPassword(email: string): Promise<User> {
    return this.User.findOne({ email: email })
      .select('_id email created +password')
      .exec();
  }

  async removeUserById(userId: string): Promise<void> {
    return this.User.deleteOne({ _id: userId }).exec();
  }

  async getUserById(userId: string): Promise<User> {
    return this.User.findOne({ _id: userId }).populate('User').exec();
  }

  async updateUserById(
    userId: string,
    userFields: PatchUserDto | PutUserDto
  ): Promise<User> {
    const existingUser = await this.User.findOneAndUpdate(
      { _id: userId },
      { $set: userFields },
      { new: true }
    ).exec();

    return existingUser;
  }
}

export default new UsersDao();
