import { Service } from 'typedi';
import { ResponseHandler } from '../response-handler/ResponseHandler.service';
import { STATUS_CODES } from '../../utils/constant';
import { iCreatOrg } from 'src/types/organization.type';
import Organization from '../../models/organization.model';
// import { createUserDataValidation } from '../../utils/validators/user.validations';

@Service()
export class OrganizationService extends ResponseHandler {
  async createOrganization(organizationData: iCreatOrg) {
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
      const organization = new Organization(organizationData);
      const savedOrganization = await organization.save();

      return this.responseHandler(
        savedOrganization,
        'Organization created successfully',
        STATUS_CODES.OK,
      );
    } catch (error: any) {
      return this.catchErrorHandler(error?.message, STATUS_CODES.BAD_REQUEST);
    }
  }

  async getOrganizations() {
    try {
      const organizations = await Organization.find();
      
      return this.responseHandler(
        organizations,
        'Organization created successfully',
        STATUS_CODES.OK,
      );
    } catch (error: any) {
      return this.catchErrorHandler(error?.message, STATUS_CODES.BAD_REQUEST);
    }
  }

  async deleteOrganizationById(id: string) {
    try {
      const deletedOrganization = await Organization.findByIdAndDelete(id);
      if (!deletedOrganization) {
        return this.catchErrorHandler('Organization not found', STATUS_CODES.NOT_FOUND);
      }
      return this.responseHandler(
        deletedOrganization,
        'Organization deleted successfully',
        STATUS_CODES.OK,
      );
    } catch (error: any) {
      return this.catchErrorHandler(error?.message, STATUS_CODES.BAD_REQUEST);
    }
  }

  // Multiple delete by an array of MongoDB IDs
  async deleteOrganizationsByIds(ids: string[]) {
    try {
      const deletedOrganizations = await Organization.deleteMany({ _id: { $in: ids } });
      return this.responseHandler(
        { deletedCount: deletedOrganizations.deletedCount },
        'Organizations deleted successfully',
        STATUS_CODES.OK,
      );
    } catch (error: any) {
      return this.catchErrorHandler(error?.message, STATUS_CODES.BAD_REQUEST);
    }
  }
}
