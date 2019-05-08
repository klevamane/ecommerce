import Validator from 'validator';
import { isEmpty } from 'lodash';


const validateCategoryQuery = (data) => {
  let errors = {};
  data.page = isEmpty(data.page) === true ? '' : data.page;
  data.limit = isEmpty(data.limit) === true ? '' : data.limit;

  if (!Validator.isEmpty(data.page) && !Validator.isNumeric(data.page)) {
    errors = {
      status: 400,
      code: 'USR_02',
      message: 'The page is not a valid number',
      field: 'page'
    };
    return { errors, isValid: isEmpty(errors) };
  }

  if (!Validator.isEmpty(data.limit) && !Validator.isNumeric(data.limit)) {
    errors = {
      status: 400,
      code: 'USR_02',
      message: 'The limit is not a valid number',
      field: 'limit'
    };
    return { errors, isValid: isEmpty(errors) };
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateCategoryQuery;
