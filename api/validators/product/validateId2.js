import Validator from 'validator';
import { isEmpty } from 'lodash';


const validateId2 = (id, code) => {
  let errors = {};
  const splitId = id.split('_');
  id = isEmpty(id) === true ? '' : id;

  if (Validator.isEmpty(id)) {
    errors = {
      status: 400,
      code,
      message: `The field ${splitId} id is empty`,
      field: id
    };
    return { errors };
  }

  if (!Validator.isNumeric(id)) {
    errors = {
      status: 400,
      code,
      message: 'The ID is not a number',
      field: id
    };
    return { errors };
  }
};

export default validateId2;
