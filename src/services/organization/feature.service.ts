import { Service } from 'typedi';
import { ResponseHandler } from '../response-handler/ResponseHandler.service';
import { STATUS_CODES } from '../../utils/constant';
import { iCreateFeature, iFeature, iSubFeature } from 'src/types/feature.type';
import Feature from '../../models/feature.model';
import { OrganizationService } from './organization.service';
import axios from 'axios';

@Service()
export class FeatureService extends ResponseHandler {
  private OrganizationService: OrganizationService;

  constructor() {
    super();
    this.OrganizationService = new OrganizationService();
  }

  async createFuture(featureData: iCreateFeature) {
    try {
      const organization = new Feature(featureData);
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

  async insertFeaturesInClientDataBase(
    vendorFeatureData: iCreateFeature[],
    clientId: string,
  ) {
    try {
      const clientInfo =
        await this.OrganizationService.getOrganizationInfo(clientId);

      if (!clientInfo || !clientInfo?.data?.base_url) {
        throw new Error('Client information or base URL not found');
      }

      const clientApiUrl = `${clientInfo.data.base_url}/feature/createManyFeature`;

      const response = await axios.post(clientApiUrl, vendorFeatureData);

      if (response.status === 200) {
        return this.responseHandler(
          response.data,
          'Features inserted successfully in client database',
          STATUS_CODES.OK,
        );
      } else {
        throw new Error('Failed to insert features in client database');
      }
    } catch (error: any) {
      return this.catchErrorHandler(error?.message, STATUS_CODES.BAD_REQUEST);
    }
  }

  async getMergedFeatures(clientId: string) {
    try {
      let clientAdminFeatures: iFeature[] = [];
      let redefineAdminFeatures: iFeature[] = [];

      function ensureObjectIdString(id: any) {
        return id ? id.toString() : id;
      }

      const clientInfo =
        await this.OrganizationService.getOrganizationInfo(clientId);

      if (!clientInfo || !clientInfo?.data?.base_url) {
        throw new Error('Client information or base URL not found');
      }

      const redefineFeaturesResponse = await this.getAllFeatures();

      if (redefineFeaturesResponse.status === 200) {
        redefineAdminFeatures = redefineFeaturesResponse.data;
      }
      try {
        const clientApiUrl = `${clientInfo.data.base_url}/feature/getAllFeatures`;
        const clientFeaturesResponse = await axios.get(clientApiUrl);
  
        if (clientFeaturesResponse.status === 200) {
          clientAdminFeatures = clientFeaturesResponse.data?.data;
        }
        console.log(clientAdminFeatures,'kljasldkfjsaldkfjlskadfjlksadjflksdjflks')
      } catch (error) {
        console.log('Make Sure that Client Server is Running')
      }

      // Example merge logic: Add Client Admin's features if they aren't already in Redefine Admin's list

      const mergedSubFeatures = (
        allSubFeatures: iSubFeature[],
        allowedSubFeatures: iSubFeature[],
      ) => {
        return allSubFeatures.map((feature) => {
          const allowed = allowedSubFeatures.find((f) => ensureObjectIdString(f._id) === ensureObjectIdString(feature._id));
          if (allowed) {
            return {
              ...allowed,
              enabled: allowed.enabledForClient
            };
          } else {
            return feature;
          }
        });
      };
      console.log(clientAdminFeatures[0],'mergedFeaturesData',redefineAdminFeatures[0])
      const mergedFeaturesData = redefineAdminFeatures.map((feature) => {
        const allowed = clientAdminFeatures.find((f) => ensureObjectIdString(f._id) === ensureObjectIdString(feature._id));
        
        console.log(allowed,'allowed')
        if (allowed) {
          return {
            ...allowed,
            enabled: allowed.enabledForClient,
            subFeatures: mergedSubFeatures(
              feature.subFeatures,
              allowed.subFeatures,
            ),
          };
        } else {
          return {...feature};
        }
      });



      return this.responseHandler(
        mergedFeaturesData,
        'Organization created successfully',
        STATUS_CODES.OK,
      );
    } catch (error: any) {
      return this.catchErrorHandler(error?.message, STATUS_CODES.BAD_REQUEST);
    }
  }

  async getAllFeatures() {
    try {
      const Features = await Feature.find().lean();

      return this.responseHandler(
        Features,
        'All Features send successfully',
        STATUS_CODES.OK,
      );
    } catch (error: any) {
      return this.catchErrorHandler(error?.message, STATUS_CODES.BAD_REQUEST);
    }
  }

  async deleteFeatureById(id: string) {
    try {
      const deletedFeature = await Feature.findByIdAndDelete(id);
      if (!deletedFeature) {
        return this.catchErrorHandler(
          'Organization not found',
          STATUS_CODES.NOT_FOUND,
        );
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
      const updatedFeature = await Feature.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true },
      );

      if (!updatedFeature) {
        return this.catchErrorHandler(
          'Feature not found',
          STATUS_CODES.NOT_FOUND,
        );
      }

      return this.responseHandler(
        updatedFeature,
        'Feature updated successfully',
        STATUS_CODES.OK,
      );
    } catch (error: any) {
      return this.catchErrorHandler(error?.message, STATUS_CODES.BAD_REQUEST);
    }
  }
}
