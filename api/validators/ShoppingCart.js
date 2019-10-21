import Validator from 'validator';
import { isEmpty } from 'lodash';

const validateShoppingCart = (data) => {
  let errors = {};
  data.cart_id = isEmpty(data.cart_id) === true ? '' : data.cart_id;
  data.product_id = isEmpty(data.product_id) === true ? '' : data.product_id;
  data.attributes = isEmpty(data.attributes) === true ? '' : data.attributes;

  if (Validator.isEmpty(data.product_id)) {
    errors = {
      status: 400,
      code: 'USR_02',
      message: 'The field product id is empty',
      field: 'product_id'
    };
    return { errors, isValid: isEmpty(errors) };
  }

  if (!Validator.isNumeric(data.product_id)) {
    errors = {
      status: 400,
      code: 'USR_02',
      message: 'The field product id is invalid',
      field: 'product_id'
    };
    return { errors, isValid: isEmpty(errors) };
  }

  if (Validator.isEmpty(data.cart_id)) {
    errors = {
      status: 400,
      code: 'USR_02',
      message: 'The field cart id is empty',
      field: 'cart_id'
    };
    return { errors, isValid: isEmpty(errors) };
  }

  if (Validator.escape(data.cart_id) !== data.cart_id) {
    errors = {
      status: 400,
      code: 'USR_02',
      message: 'The cart id field is invalid',
      field: 'cart_id'
    };
    return { errors, isValid: isEmpty(errors) };
  }

  if (Validator.blacklist(data.cart_id, '@:#();') !== data.cart_id) {
    errors = {
      status: 400,
      code: 'USR_02',
      message: 'The cart id field is invalid',
      field: 'cart_id'
    };
    return { errors, isValid: isEmpty(errors) };
  }

  if (Validator.escape(data.attributes) !== data.attributes) {
    errors = {
      status: 400,
      code: 'USR_02',
      message: 'The cart id field is invalid',
      field: 'cart_id'
    };
    return { errors, isValid: isEmpty(errors) };
  }

  if (Validator.blacklist(data.attributes, '@:#();') !== data.attributes) {
    errors = {
      status: 400,
      code: 'USR_02',
      message: 'The attribute id field is invalid',
      field: 'attribute'
    };
    return { errors, isValid: isEmpty(errors) };
  }

  if (Validator.contains(data.attributes, 'SELECT') || Validator.contains(data.cart_id, 'select')) {
    errors = {
      status: 400,
      code: 'USR_02',
      message: 'The attribute id field is invalid',
      field: 'attribute'
    };
    return { errors, isValid: isEmpty(errors) };
  }

  if (Validator.contains(data.cart_id, 'SELECT') || Validator.contains(data.cart_id, 'select')) {
    errors = {
      status: 400,
      code: 'USR_02',
      message: 'The cart id field is invalid',
      field: 'cart_id'
    };
    return { errors, isValid: isEmpty(errors) };
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateShoppingCart;
