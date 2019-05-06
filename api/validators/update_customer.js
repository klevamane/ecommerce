// import Validiator from 'validator';
// import { isEmpty } from 'lodash';


// const validateUpdateCustomer = (data) => {
//   let errors = {};
//   data.email = isEmpty(data.email) === true ? '' : data.email;
//   data.name = isEmpty(data.name) === true ? '' : data.name;
//   data.password = isEmpty(data.password) === true ? '' : data.password;
//   data.eve_phone = isEmpty(data.eve_phone) === true ? '' : data.eve_phone;
//   data.address_1 = isEmpty(data.address_1) === true ? '' : data.address_1;
//   data.address_2 = isEmpty(data.address_2) === true ? '' : data.address_2;
//   data.city = isEmpty(data.city) === true ? '' : data.city;
//   data.region = isEmpty(data.region) === true ? '' : data.region;
//   data.postal_code = isEmpty(data.postal_code) === true ? '' : data.postal_code;
//   data.country = isEmpty(data.country) === true ? '' : data.country;
//   data.credit_card = isEmpty(data.credit_card) === true ? '' : data.credit_card;

//   if (Validiator.isEmpty(data.name)) {
//     errors = {
//       error: {
//         status: 400,
//         code: 'USR_02',
//         message: 'The field name is empty',
//         field: 'name'
//       }
//     };

//     return { errors, isValid: isEmpty(errors) };
//   }

//   if (Validiator.isEmpty(data.email)) {
//     errors = {
//       code: 'USR_02',
//       message: 'The field email is empty',
//       field: 'email'
//     };
//     return { errors, isValid: isEmpty(errors) };
//   }

//   return {
//     errors,
//     isValid: isEmpty(errors)
//   };
// };

// export default validateUpdateCustomer;
