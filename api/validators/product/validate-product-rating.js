import Validator from 'validator';
import { isEmpty } from 'lodash';


const validateProductReview = (data, id) => {
  let errors = {};
  const splitId = id.split('_');
  id = isEmpty(id) === true ? '' : id;
  const code = 'PRO_03';
  data.review = isEmpty(data.review) === true ? '' : data.review;
  data.rating = isEmpty(data.rating) === true ? '' : data.rating;


  if (Validator.isEmpty(data.rating)) {
    errors = {
      status: 400,
      code: 'PRO_03',
      message: 'The rating field is empty',
      field: 'rating'
    };
    return { errors, isValid: isEmpty(errors) };
  }

  if (!Validator.isEmpty(data.rating) && !Validator.isNumeric(data.rating)) {
    errors = {
      status: 400,
      code: 'PRO_03',
      message: 'The rating field is not a valid number',
      field: 'rating'
    };
    return { errors, isValid: isEmpty(errors) };
  }

  if ((data.rating) < 1 || (data.rating) > 5) {
    errors = {
      status: 400,
      code: 'PRO_03',
      message: 'The rating value must be bewteen 1 - 5',
      field: 'rating'
    };
    return { errors, isValid: isEmpty(errors) };
  }

  if (Validator.isEmpty(data.review)) {
    errors = {
      status: 400,
      code: 'PRO_03',
      message: 'The review field is empty',
      field: 'review'
    };
    return { errors, isValid: isEmpty(errors) };
  }

  if (Validator.isEmpty(id)) {
    errors = {
      status: 400,
      code,
      message: `The field ${splitId} id is empty`,
      field: id
    };
    return { errors, isValid: isEmpty(errors) };
  }

  if (!Validator.isNumeric(id)) {
    errors = {
      status: 400,
      code,
      message: 'The ID is not a number',
      field: id
    };
    return { errors, isValid: isEmpty(errors) };
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateProductReview;
