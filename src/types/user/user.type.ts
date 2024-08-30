export interface IUser {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  address: Record<string, any>;
  user_type: string;
  phoneNo: number;
}

export interface ICreateUser extends Omit<IUser, '_id'> {}
