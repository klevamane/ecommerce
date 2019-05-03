import Validiator from 'validator';
import { isEmpty } from 'lodash';


const validateRegisterCustomer = (data) => {
  let errors = {};

  data.name = isEmpty(data.name) === true ? '' : data.email;
  data.email = isEmpty(data.email) === true ? '' : data.email;
  data.password = isEmpty(data.password) === true ? '' : data.password;

  if (Validiator.isEmpty(data.name)) {
    errors = {
      code: 400,
      message: 'The field name is empty',
      field: 'name'
    };
    return {
      errors, isValid: isEmpty(errors)
    };
  }

  if (Validiator.isEmpty(data.password)) {
    errors = {
      code: 400,
      message: 'The field password is empty',
      field: 'password'
    };
    return { errors, isValid: isEmpty(errors) };
  }

  if (!Validiator.isEmail(data.email)) {
    errors = {
      code: 400,
      message: 'The field email is invalid',
      field: 'email'
    };
    return { errors, isValid: isEmpty(errors) };
  }

  if (Validiator.isEmpty(data.email)) {
    errors = {
      code: 400,
      message: 'The field email is empty',
      field: 'email'
    };
    return { errors, isValid: isEmpty(errors) };
  }
};

export default validateRegisterCustomer;
