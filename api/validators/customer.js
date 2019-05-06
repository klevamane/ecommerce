import Validiator from 'validator';
import { isEmpty } from 'lodash';


export const validateRegisterCustomer = (data) => {
  let errors = {};

  data.name = isEmpty(data.name) === true ? '' : data.name;
  data.email = isEmpty(data.email) === true ? '' : data.email;
  data.password = isEmpty(data.password) === true ? '' : data.password;

  if (Validiator.isEmpty(data.name)) {
    errors = {
      status: 400,
      code: 'USR_02',
      message: 'The field name is empty',
      field: 'name'
    };

    return { errors, isValid: isEmpty(errors) };
  }

  if (Validiator.isEmpty(data.name)) {
    errors = {
      status: 400,
      code: 'USR_02',
      message: 'The field name is empty',
      field: 'name'
    };
    return { errors, isValid: isEmpty(errors) };
  }

  if (Validiator.is(data.name)) {
    errors = {
      status: 400,
      code: 'USR_02',
      message: 'The field name is empty',
      field: 'name'
    };
    return { errors, isValid: isEmpty(errors) };
  }


  if (Validiator.isEmpty(data.email)) {
    errors = {
      status: 400,
      code: 'USR_02',
      message: 'The field email is empty',
      field: 'email'
    };
    return { errors, isValid: isEmpty(errors) };
  }

  if (!Validiator.isEmail(data.email)) {
    errors = {
      status: 400,
      code: 'USR_03',
      message: 'The field email is invalid',
      field: 'email'
    };
    return { errors, isValid: isEmpty(errors) };
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export const validateCustomerLogin = (data) => {
  let errors = {};
  data.password = isEmpty(data.password) === true ? '' : data.password;
  data.email = isEmpty(data.email) === true ? '' : data.email;

  if (Validiator.isEmpty(data.email)) {
    errors = {
      status: 400,
      code: 'USR_02',
      message: 'The field email is empty',
      field: 'email'
    };
    return { errors, isValid: isEmpty(errors) };
  }

  if (Validiator.isEmpty(data.password)) {
    errors = {
      status: 400,
      code: 'USR_02',
      message: 'The field password is empty',
      field: 'password'
    };
    return { errors, isValid: isEmpty(errors) };
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export const validateCustomerUpdate = (data) => {
  const pattern = /^[a-zA-Z ]+$/;
  let errors = {};
  data.name = isEmpty(data.name) === true ? '' : data.name;
  data.email = isEmpty(data.email) === true ? '' : data.email;
  data.shipping_region_id = isEmpty(data.shipping_region_id) === true ? '' : data.shipping_region_id;

  if (Validiator.isEmpty(data.name)) {
    errors = {
      status: 400,
      code: 'USR_02',
      message: 'The field name is empty',
      field: 'name'
    };
    return { errors, isValid: isEmpty(errors) };
  }

  if (!data.name.match(pattern)) {
    errors = {
      status: 400,
      code: 'USR_02',
      message: 'The field name is invalid',
      field: 'name'
    };
    return { errors, isValid: isEmpty(errors) };
  }

  if (Validiator.isEmpty(data.email)) {
    errors = {
      status: 400,
      code: 'USR_02',
      message: 'The field email is empty',
      field: 'email'
    };
    return { errors, isValid: isEmpty(errors) };
  }

  if (!Validiator.isEmail(data.email)) {
    errors = {
      status: 400,
      code: 'USR_03',
      message: 'The field email is invalid',
      field: 'email'
    };
    return { errors, isValid: isEmpty(errors) };
  }

  // if (!Validiator.isNumeric(data.shipping_region_id) && !Validiator.isEmpty(data.shipping_region_id)) {
  //   errors = {
  //     status: 400,
  //     code: 'USR_02',
  //     message: 'The field shipping_id is invalid',
  //     field: 'shipping_id'
  //   };
  //   return { errors, isValid: isEmpty(errors) };
  // }


  return {
    errors,
    isValid: isEmpty(errors)
  };
};
