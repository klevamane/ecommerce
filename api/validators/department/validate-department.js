import Validator from 'validator';
import { isEmpty } from 'lodash';

const validateDepartment = (data) => {
  let errors = {};
  data.department_id = isEmpty(data.department_id) === true ? '' : data.department_id;

  if (Validator.isEmpty(data.department_id)) {
    errors = {
      status: 400,
      code: 'USR_02',
      message: 'The field department id is empty',
      field: 'department_id'
    };
    return { errors, isValid: isEmpty(errors) };
  }

  if (!Validator.isNumeric(data.department_id)) {
    errors = {
      status: 400,
      code: 'DEP_01',
      message: 'The ID is not a number',
      field: 'department_id'
    };
    return { errors, isValid: isEmpty(errors) };
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateDepartment;
