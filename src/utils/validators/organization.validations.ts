import Joi from 'joi';
import { iCreateUser } from '../../types/user.type';

export const createOrganizationDataValidation = (data: iCreateUser) => {
  const createOrganizationSchema = Joi.object({});
  return createOrganizationSchema.validate(data);
};
