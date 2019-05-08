import Validator from 'validator';

export const customNegativeValidator = (response, validationtype, data, code, message, field) => {
  if (!Validator[validationtype](data)) {
    const errors = {
      status: 400,
      code,
      message,
      field
    };
    return response.status(400).json(errors);
  }
};

export const customPositiveValidator = (response, validationtype, data, code, message, field) => {
  if (Validator[validationtype](data)) {
    const errors = {
      status: 400,
      code,
      message,
      field
    };
    return response.status(400).json(errors);
  }
};
