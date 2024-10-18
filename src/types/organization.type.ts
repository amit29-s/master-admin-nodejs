import { Schema } from 'mongoose';
import { iFeatureRefId } from './feature.type';
import { iUserRefId } from './user.type';

export type iOrgRefId = Schema.Types.ObjectId;

export interface iOrganization {
  _id: iOrgRefId;
  image: string;
  storeName: string;
  status: 'active' | 'inactive';
  features: iFeatureRefId[];
  members: iUserRefId[];
  createdBy: iUserRefId;
  addresses: iOrganizationAddress[];
  storeType: string;
  contactInfo: {
    phoneNumbers: string[];
    emails: string[];
  };
  taxInfo: {
    taxIdentificationNumber: string;
  };
}

export interface iCreatOrg extends Omit<iOrganization, '_id'> {}

export interface iOrganizationAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  isHeadquater: boolean;
}
