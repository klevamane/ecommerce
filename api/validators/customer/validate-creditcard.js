import Validiator from 'validator';
import { isEmpty } from 'lodash';


const validateCustomerCreditCard = (data) => {
  let errors = {};
  data.credit_card = isEmpty(data.credit_card) === true ? '' : data.credit_card;

  if (Validiator.isEmpty(data.credit_card)) {
    errors = {
      status: 400,
      code: 'USR_02',
      message: 'The credit card field is empty',
      field: 'credit_card'
    };
    return { errors, isValid: isEmpty(errors) };
  }

  if (!Validiator.isCreditCard(data.credit_card)) {
    errors = {
      status: 400,
      code: 'USR_02',
      message: 'The credit number is invalid',
      field: 'credit_card'
    };
    return { errors, isValid: isEmpty(errors) };
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateCustomerCreditCard;
