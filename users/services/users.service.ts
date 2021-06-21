import UsersDao from '../daos/users.dao';
import { CRUD } from '../../common/interfaces/crud.interface';
import { CreateUserDto } from '../dto/create.user.dto';
import { PutUserDto } from '../dto/put.user.dto';
import { PatchUserDto } from '../dto/patch.user.dto';
import { User } from '../types/user.type';

class UsersService implements CRUD {
  async create(resource: CreateUserDto): Promise<string> {
    return UsersDao.addUser(resource);
  }

  async deleteById(id: string): Promise<void> {
    return UsersDao.removeUserById(id);
  }

  async patchById(id: string, resource: PatchUserDto): Promise<User> {
    return UsersDao.updateUserById(id, resource);
  }

  async putById(id: string, resource: PutUserDto): Promise<User> {
    return UsersDao.updateUserById(id, resource);
  }

  async readById(id: string): Promise<User> {
    return UsersDao.getUserById(id);
  }

  async updateById(id: string, resource: CreateUserDto): Promise<User> {
    return UsersDao.updateUserById(id, resource);
  }

  async getUserByEmail(email: string): Promise<User> {
    return UsersDao.getUserByEmail(email);
  }

  async getUserByEmailWithPassword(email: string): Promise<User> {
    return UsersDao.getUserByEmailWithPassword(email);
  }
}

export default new UsersService();
