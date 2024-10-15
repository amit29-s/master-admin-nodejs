import { Service } from 'typedi';
import { ResponseHandler } from '../response-handler/ResponseHandler.service';
import { iCreateUser, iUserRefId } from '../../types/user.type';
import { STATUS_CODES } from '../../utils/constant';
import User from '../../models/user.model';
import { createUserDataValidation } from '../../utils/validators/user.validations';

@Service()
export class UserService extends ResponseHandler {
  ////////////////////////////////////////////
  ////////////////////////////////////////////
  ///////// CREATE
  ////////////////////////////////////////////
  ////////////////////////////////////////////
  async createUser(userInputs: iCreateUser) {
    try {
      const { error } = createUserDataValidation(userInputs);
      if (error) throw new Error(error?.details?.[0]?.message);

      //
      const isUserAlreadyCreated = await User.findOne({
        email: userInputs?.email,
      });
      if (isUserAlreadyCreated?._id) throw new Error('User already exits');

      //
      const user = new User(userInputs);
      const savedUser = await user.save();

      //
      return this.responseHandler(
        savedUser,
        'User created successfully',
        STATUS_CODES.OK,
      );
    } catch (error: any) {
      return this.catchErrorHandler(error?.message, STATUS_CODES.BAD_REQUEST);
    }
  }

  ////////////////////////////////////////////
  ////////////////////////////////////////////
  ///////// READ
  ////////////////////////////////////////////
  ////////////////////////////////////////////
  async fetchUser(userId: iUserRefId) {
    try {
      //
      return this.responseHandler(
        {},
        'User created successfully',
        STATUS_CODES.OK,
      );
    } catch (error: any) {
      return this.catchErrorHandler(error?.message, STATUS_CODES.BAD_REQUEST);
    }
  }
  async fetchUsers(by: 'VENDOR' | 'CORE', ids: iUserRefId[]) {
    try {
      //
      return this.responseHandler(
        {},
        'User created successfully',
        STATUS_CODES.OK,
      );
    } catch (error: any) {
      return this.catchErrorHandler(error?.message, STATUS_CODES.BAD_REQUEST);
    }
  }

  ////////////////////////////////////////////
  ////////////////////////////////////////////
  ///////// UPDATE
  ////////////////////////////////////////////
  ////////////////////////////////////////////
  async updateUser(userInputs: iCreateUser) {
    try {
      //
      return this.responseHandler(
        {},
        'User created successfully',
        STATUS_CODES.OK,
      );
    } catch (error: any) {
      return this.catchErrorHandler(error?.message, STATUS_CODES.BAD_REQUEST);
    }
  }

  ////////////////////////////////////////////
  ////////////////////////////////////////////
  ///////// DELETE
  ////////////////////////////////////////////
  ////////////////////////////////////////////
}
