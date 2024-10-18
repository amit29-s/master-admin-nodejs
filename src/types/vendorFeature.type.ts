import { Schema } from 'mongoose';

export type iVendorFeatureRefId = Schema.Types.ObjectId;

export interface iVendorFeature {
  _id: iVendorFeatureRefId;
  featureName: string;
  keywordsForSearch: string[];
  description: string;
  enabled: boolean;
  stage: string;
  version: number;
  subFeatures: iVendorSubFeature[];
  route: string;
  owner: string[];
  showInList: boolean;
}

export interface iVendorSubFeature {
  name: string;
  enabled: boolean;
  description: string;
  config: iConfig;
}


export type iConfig = Record<string, string>;

export interface iVendorCreateFeature extends Omit<iVendorFeature, '_id'> {}
