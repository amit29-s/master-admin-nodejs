import { Service } from 'typedi';
import { ResponseHandler } from '../response-handler/ResponseHandler.service';
import { STATUS_CODES } from '../../utils/constant';
import { iVendorCreateFeature } from 'src/types/vendorFeature.type';
import VendorFeature from '../../models/vendorFeature.module';


@Service()
export class VendorFeatureService extends ResponseHandler {
  async createFuture(featureData: iVendorCreateFeature) {
    try {
      
      const organization = new VendorFeature(featureData);
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

  async createManyFeature(vendorFeatureData: iVendorCreateFeature[]) {
    try {
        await VendorFeature.deleteMany({});
        const vendorFeatures = await VendorFeature.insertMany(vendorFeatureData);

        return this.responseHandler(
            vendorFeatures,
            'Organization created successfully',
            STATUS_CODES.OK,
        );
    } catch (error: any) {
        return this.catchErrorHandler(error?.message, STATUS_CODES.BAD_REQUEST);
    }
  }

  async getAllFeatures() {
    try {
      const Features = await VendorFeature.find();

      return this.responseHandler(
        Features,
        'Organization created successfully',
        STATUS_CODES.OK,
      );
    } catch (error: any) {
      return this.catchErrorHandler(error?.message, STATUS_CODES.BAD_REQUEST);
    }
  }

  async deleteFeatureById(id: string) {
    try {
      const deletedFeature = await VendorFeature.findByIdAndDelete(id);
      if (!deletedFeature) {
        return this.catchErrorHandler('Organization not found', STATUS_CODES.NOT_FOUND);
      }
      return this.responseHandler(
        deletedFeature,
        'Organization deleted successfully',
        STATUS_CODES.OK,
      );
    } catch (error: any) {
      return this.catchErrorHandler(error?.message, STATUS_CODES.BAD_REQUEST);
    }
  }

  async updateFeatureById(id: string, updateData: any) {
    try {
      const updatedFeature = await VendorFeature.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true } 
      );
  
      if (!updatedFeature) {
        return this.catchErrorHandler('Feature not found', STATUS_CODES.NOT_FOUND);
      }
  
      return this.responseHandler(
        updatedFeature,
        'Feature updated successfully',
        STATUS_CODES.OK
      );
    } catch (error: any) {
      return this.catchErrorHandler(error?.message, STATUS_CODES.BAD_REQUEST);
    }
  }
}
