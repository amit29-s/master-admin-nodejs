import mongoose, { Schema } from 'mongoose';
import { USER_ROLES } from 'src/enums/user.enums';
import { iCreateUser } from 'src/types/user.type';

const UserSchema = new Schema<iCreateUser>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      require: true,
    },
    address: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },
    role: {
      type: String,
      default: 'CUSTOMER',
      enum: USER_ROLES,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Link to the redefine employee
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model('User', UserSchema);

export default User;
