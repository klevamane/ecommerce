export const errorsObject = {
  status: 400,
  code: 'USR_02',
  message: 'The field cart id is empty',
  field: 'cart_id'
};

export const errorMessages = {
  emptyCartId: 'The field cart id is empty',
  emptyTaxId: 'The field tax id is empty',
  emptyShoppingId: 'The shopping id is empty'
};

export const errorsObj = (code, message, field) => {
  const error = {
    status: 400,
    code,
    message,
    field
  };
  return error;
};
