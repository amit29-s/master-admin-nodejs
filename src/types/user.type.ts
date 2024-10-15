import { iUserRoles } from 'src/enums/user.enums';
import { iOrgRefId } from './organization.type';
import { Schema } from 'mongoose';

export type iUserRefId = Schema.Types.ObjectId;

export interface iUser {
  _id: iUserRefId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  phoneNo: string;
  role: iUserRoles;
  organization: iOrgRefId;
  createdBy: iUserRefId;
}

export interface iCreateUser extends Omit<iUser, '_id'> {}
