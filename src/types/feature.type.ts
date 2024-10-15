import { Schema } from 'mongoose';

export type iFeatureRefId = Schema.Types.ObjectId;

export interface iFeature {
  _id: iFeatureRefId;
  featureName: string;
  keywordsForSearch: string[];
  description: string;
  enabled: boolean;
  stage: string;
  version: number;
  subFeatures: iSubFeature[];
  route: string;
  owner: string[];
}

export interface iSubFeature {
  name: string;
  enabled: boolean;
  description: string;
  config: iConfig;
}

export type iConfig = Record<string, string>;

export interface iCreateFeature extends Omit<iFeature, '_id'> {}
