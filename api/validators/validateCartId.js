import Validator from 'validator';
import { isEmpty } from 'lodash';

const validateCartId = (data) => {
  let errors = {};
  data.cart_id = isEmpty(data.cart_id) === true ? '' : data.cart_id;

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

export default validateCartId;
