import Validator from 'validator';
import { isEmpty } from 'lodash';


const validateProductReview = (data) => {
  let errors = {};
  data.page = isEmpty(data.page) === true ? '' : data.page;
  data.limit = isEmpty(data.limit) === true ? '' : data.limit;
  data.description_length = isEmpty(data.description_length) === true ? '' : data.description_length;

  if (!Validator.isEmpty(data.page) && !Validator.isNumeric(data.page)) {
    errors = {
      status: 400,
      code: 'PRO_02',
      message: 'The page is not a valid number',
      field: 'page'
    };
    return { errors, isValid: isEmpty(errors) };
  }

  if (!Validator.isEmpty(data.limit) && !Validator.isNumeric(data.limit)) {
    errors = {
      status: 400,
      code: 'PRO_02',
      message: 'The limit is not a valid number',
      field: 'limit'
    };
    return { errors, isValid: isEmpty(errors) };
  }

  if (!Validator.isEmpty(data.description_length) && !Validator.isNumeric(data.description_length)) {
    errors = {
      status: 400,
      code: 'PRO_02',
      message: 'The description length is not a valid number',
      field: 'description_length'
    };
    return { errors, isValid: isEmpty(errors) };
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateProductPagination;
