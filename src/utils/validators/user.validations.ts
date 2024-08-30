import Joi from 'joi';
import { ICreateUser } from '../../types/user/user.type';

export const createUserDataValidation = (data: ICreateUser) => {
  const createUserSchema = Joi.object({
    first_name: Joi.string()
      .trim()
      .label('First name')
      .exist()
      .min(3)
      .messages({
        'any.required': 'First name is required.',
        'string.min': 'First name must be at least 3 characters long.',
      }),
    last_name: Joi.string().trim().label('Last name').exist().min(3).messages({
      'any.required': 'Last name is required.',
      'string.min': 'Last name must be at least 3 characters long.',
    }),
    email: Joi.string().label('email').exist().email().messages({
      'any.required': 'Email is required.',
      'string.email': 'Email is invalid.',
    }),
    phoneNo: Joi.string().label('Phone number').exist().length(10).messages({
      'any.required': 'Phone number is required.',
      'string.length': 'Inavlid phone number.',
    }),
    user_type: Joi.string().label('User type').allow('').optional(),
  });
  return createUserSchema.validate(data);
};
