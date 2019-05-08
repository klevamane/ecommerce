import Validator from 'validator';
import { isEmpty } from 'lodash';


const validateCategory = (data) => {
  let errors = {};
  data.category_id = isEmpty(data.category_id) === true ? '' : data.category_id;

  if (Validator.isEmpty(data.category_id)) {
    errors = {
      status: 400,
      code: 'USR_02',
      message: 'The field category id is empty',
      field: 'category'
    };
    return { errors, isValid: isEmpty(errors) };
  }

  if (!Validator.isNumeric(data.category_id)) {
    errors = {
      status: 400,
      code: 'DEP_01',
      message: 'The ID is not a number',
      field: 'category'
    };
    return { errors, isValid: isEmpty(errors) };
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateCategory;
