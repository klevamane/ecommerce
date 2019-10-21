import Validator from 'validator';
import { isEmpty } from 'lodash';
import CustomValidationError from './CUSTOM';
import { errorsObj } from '../constants';


const validateOrder = (data, res) => {
  //   try {
  //     if (Validator.isEmpty(data.cart_id)) {
  //       errors = errorsObj('USR_03', 'The field cart id is empty', 'cart_id');
  //       throw new CustomValidationError('I SEE U HERE');
  //     }
  //   } catch (e) {
  //     if (e.name === 'ValidationError') {
  //       return res.status(400).json(errors);
  //     }
  //   }
  // };

  let errors;

  data.cart_id = isEmpty(data.cart_id) === true ? '' : data.cart_id;
  data.tax_id = isEmpty(data.tax_id) === true ? '' : data.tax_id;
  data.shipping_id = isEmpty(data.shipping_id) === true ? '' : data.shipping_id;

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

  if (Validator.isEmpty(data.shipping_id)) {
    errors = {
      status: 400,
      code: 'USR_02',
      message: 'The field shipping id is empty',
      field: 'shipping_id'
    };
    return { errors, isValid: isEmpty(errors) };
  }

  if (!Validator.isNumeric(data.shipping_id)) {
    errors = {
      status: 400,
      code: 'USR_02',
      message: 'The field shipping id is invalid',
      field: 'shipping_id'
    };
    return { errors, isValid: isEmpty(errors) };
  }

  if (Validator.isEmpty(data.tax_id)) {
    errors = {
      status: 400,
      code: 'USR_02',
      message: 'The field tax id is empty',
      field: 'tax_id'
    };
    return { errors, isValid: isEmpty(errors) };
  }

  if (!Validator.isNumeric(data.shipping_id)) {
    errors = {
      status: 400,
      code: 'USR_02',
      message: 'The field tax id is invalid',
      field: 'tax_id'
    };
    return { errors, isValid: isEmpty(errors) };
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateOrder;
