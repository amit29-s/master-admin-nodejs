import { Service } from 'typedi';
import { ResponseHandler } from '../response-handler/ResponseHandler.service';
import { iCreateUser, ISingInUser, iUserRefId } from '../../types/user.type';
import { STATUS_CODES } from '../../utils/constant';
import User from '../../models/user.model';
import { createUserDataValidation } from '../../utils/validators/user.validations';
import { generateToken } from '../../auth/jwt';
import bcrypt from 'bcryptjs'

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

      // Hash the password
      const hashedPassword = await bcrypt.hash(userInputs.password, 10);
      const user = new User({ ...userInputs, password: hashedPassword });
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

  async signIn(singInUser:ISingInUser) {
    const {email,password} = singInUser;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return this.catchErrorHandler('Invalid credentialssss', STATUS_CODES.UNAUTHORIZED);
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return this.catchErrorHandler('Invalid credentialsddd', STATUS_CODES.UNAUTHORIZED);
      }

      const token = generateToken({ id: user._id, email: user.email, role: user.role });
      return this.responseHandler(
        { token },
        'Login successful',
        STATUS_CODES.OK,
      );
    } catch (error: any) {
      console.log(error,'erorireoriueoireu')
      return this.catchErrorHandler('Internal server error', STATUS_CODES.INTERNAL_SERVER_ERROR);
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
