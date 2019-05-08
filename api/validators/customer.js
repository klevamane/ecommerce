import Validator from 'validator';
import { isEmpty } from 'lodash';

const pattern = /^[a-zA-Z ]+$/;

export const validateRegisterCustomer = (data) => {
  let errors = {};

  data.name = isEmpty(data.name) === true ? '' : data.name;
  data.email = isEmpty(data.email) === true ? '' : data.email;
  data.password = isEmpty(data.password) === true ? '' : data.password;

  if (Validator.isEmpty(data.name)) {
    errors = {
      status: 400,
      code: 'USR_02',
      message: 'The field name is empty',
      field: 'name'
    };

    return { errors, isValid: isEmpty(errors) };
  }

  if (Validator.isEmpty(data.name)) {
    errors = {
      status: 400,
      code: 'USR_02',
      message: 'The field name is empty',
      field: 'name'
    };
    return { errors, isValid: isEmpty(errors) };
  }

  if (Validator.is(data.name)) {
    errors = {
      status: 400,
      code: 'USR_02',
      message: 'The field name is empty',
      field: 'name'
    };
    return { errors, isValid: isEmpty(errors) };
  }


  if (Validator.isEmpty(data.email)) {
    errors = {
      status: 400,
      code: 'USR_02',
      message: 'The field email is empty',
      field: 'email'
    };
    return { errors, isValid: isEmpty(errors) };
  }

  if (!Validator.isEmail(data.email)) {
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

  if (Validator.isEmpty(data.email)) {
    errors = {
      status: 400,
      code: 'USR_02',
      message: 'The field email is empty',
      field: 'email'
    };
    return { errors, isValid: isEmpty(errors) };
  }

  if (Validator.isEmpty(data.password)) {
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
  let errors = {};
  data.name = isEmpty(data.name) === true ? '' : data.name;
  data.email = isEmpty(data.email) === true ? '' : data.email;
  data.password = isEmpty(data.password) === true ? '' : data.password;
  data.day_phone = isEmpty(data.day_phone) === true ? '' : data.day_phone;
  data.eve_phone = isEmpty(data.eve_phone) === true ? '' : data.eve_phone;
  data.mob_phone = isEmpty(data.mob_phone) === true ? '' : data.mob_phone;

  // data.day = isEmpty(data.shipping_region_id) === true ? '' : data.shipping_region_id;

  if (Validator.isEmpty(data.name)) {
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

  if (Validator.isEmpty(data.email)) {
    errors = {
      status: 400,
      code: 'USR_02',
      message: 'The field email is empty',
      field: 'email'
    };
    return { errors, isValid: isEmpty(errors) };
  }

  if (!Validator.isEmail(data.email)) {
    errors = {
      status: 400,
      code: 'USR_03',
      message: 'The field email is invalid',
      field: 'email'
    };
    return { errors, isValid: isEmpty(errors) };
  }


  if (!Validator.isMobilePhone(data.mob_phone, ['en-US']) && !Validator.isEmpty(data.mob_phone)) {
    errors = {
      status: 400,
      code: 'USR_02',
      message: 'The field mobile phone is invalid',
      field: 'mob_phone'
    };
    return { errors, isValid: isEmpty(errors) };
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};


export const validateCustomerAddressUpdate = (data) => {
  let errors = {};
  data.address_1 = isEmpty(data.address_1) === true ? '' : data.address_1;
  data.address_2 = isEmpty(data.address_2) === true ? '' : data.address_2;
  data.city = isEmpty(data.city) === true ? '' : data.city;
  data.region = isEmpty(data.region) === true ? '' : data.region;
  data.postal_code = isEmpty(data.postal_code) === true ? '' : data.postal_code;
  data.country = isEmpty(data.country) === true ? '' : data.country;
  data.shipping_region_id = isEmpty(data.shipping_region_id) === true ? '' : data.shipping_region_id;

  if (Validator.isEmpty(data.address_1)) {
    errors = {
      status: 400,
      code: 'USR_02',
      message: 'The field address 1 is empty',
      field: 'address_1'
    };
    return { errors, isValid: isEmpty(errors) };
  }

  if (Validator.isEmpty(data.city)) {
    errors = {
      status: 400,
      code: 'USR_02',
      message: 'The field city is empty',
      field: 'city'
    };
    return { errors, isValid: isEmpty(errors) };
  }

  if (Validator.isEmpty(data.city)) {
    errors = {
      status: 400,
      code: 'USR_02',
      message: 'The field city is empty',
      field: 'city'
    };
    return { errors, isValid: isEmpty(errors) };
  }

  if (Validator.isEmpty(data.city)) {
    errors = {
      status: 400,
      code: 'USR_02',
      message: 'The field city is empty',
      field: 'city'
    };
    return { errors, isValid: isEmpty(errors) };
  }

  if (!data.city.match(pattern)) {
    errors = {
      status: 400,
      code: 'USR_02',
      message: 'The field city is invalid',
      field: 'city'
    };
    return { errors, isValid: isEmpty(errors) };
  }

  if (Validator.isEmpty(data.region)) {
    errors = {
      status: 400,
      code: 'USR_02',
      message: 'The field region is empty',
      field: 'region'
    };
    return { errors, isValid: isEmpty(errors) };
  }

  if (!data.region.match(pattern)) {
    errors = {
      status: 400,
      code: 'USR_02',
      message: 'The field region is invalid',
      field: 'region'
    };
    return { errors, isValid: isEmpty(errors) };
  }

  if (Validator.isEmpty(data.postal_code)) {
    errors = {
      status: 400,
      code: 'USR_02',
      message: 'The field postal_code is empty',
      field: 'postal_code'
    };
    return { errors, isValid: isEmpty(errors) };
  }

  if (Validator.isEmpty(data.country)) {
    errors = {
      status: 400,
      code: 'USR_02',
      message: 'The field country is empty',
      field: 'country'
    };
    return { errors, isValid: isEmpty(errors) };
  }

  if (!data.country.match(pattern)) {
    errors = {
      status: 400,
      code: 'USR_02',
      message: 'The field country is invalid',
      field: 'country'
    };
    return { errors, isValid: isEmpty(errors) };
  }

  if (Validator.isEmpty(data.shipping_region_id)) {
    errors = {
      status: 400,
      code: 'USR_02',
      message: 'The field shipping region id is empty',
      field: 'shipping_region_id'
    };
    return { errors, isValid: isEmpty(errors) };
  }

  if (!Validator.isNumeric(data.shipping_region_id)) {
    errors = {
      status: 400,
      code: 'USR_02',
      message: 'The field shipping_id is invalid',
      field: 'shipping_region_id'
    };
    return { errors, isValid: isEmpty(errors) };
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
