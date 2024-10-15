import { Service } from 'typedi';
import { ResponseHandler } from '../response-handler/ResponseHandler.service';
import { iCreateUser } from '../../types/user.type';
import { STATUS_CODES } from '../../utils/constant';
import User from '../../models/user.model';
// import { createUserDataValidation } from '../../utils/validators/user.validations';

@Service()
export class OrganizationService extends ResponseHandler {
  async createOrganization(userData: iCreateUser) {
    try {
      // const { error } = createUserDataValidation(userData);
      // if (error)
      //   return this.catchErrorHandler(
      //     error?.details?.[0]?.message,
      //     STATUS_CODES.BAD_REQUEST,
      //   );
      // const isOrgAlreadyCreated = await User.findOne({
      //   email: userData?.email,
      // });
      // if (isOrgAlreadyCreated?._id)
      //   return this.catchErrorHandler(
      //     'Organization already exits with this address',
      //     STATUS_CODES.BAD_REQUEST,
      //   );
      const user = new User(userData);
      const savedUser = await user.save();

      return this.responseHandler(
        savedUser,
        'Organization created successfully',
        STATUS_CODES.OK,
      );
    } catch (error: any) {
      return this.catchErrorHandler(error?.message, STATUS_CODES.BAD_REQUEST);
    }
  }
}
