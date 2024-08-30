import { Service } from 'typedi';
import { ResponseHandler } from '../response-handler/ResponseHandler.service';
import { ICreateUser } from '../../types/user/user.type';
import { STATUS_CODES } from '../../utils/constant';
import User from '../../models/user';
import { createUserDataValidation } from '../../utils/validators/user.validations';

@Service()
export class UserService extends ResponseHandler {
  async createCustomer(userData: ICreateUser) {
    try {
      const { error } = createUserDataValidation(userData);
      if (error)
        return this.catchErrorHandler(
          error?.details?.[0]?.message,
          STATUS_CODES.BAD_REQUEST,
        );
      const isUserAlreadyCreated = await User.findOne({
        email: userData?.email,
      });
      if (isUserAlreadyCreated?._id)
        return this.catchErrorHandler(
          'User already exits',
          STATUS_CODES.BAD_REQUEST,
        );
      const user = new User(userData);
      const savedUser = await user.save();

      return this.responseHandler(
        savedUser,
        'User created successfully',
        STATUS_CODES.OK,
      );
    } catch (error: any) {
      return this.catchErrorHandler(error?.message, STATUS_CODES.BAD_REQUEST);
    }
  }
}
