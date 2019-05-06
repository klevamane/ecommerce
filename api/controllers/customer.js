// imports from npm
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import Sequelize from 'sequelize';

// user defined imports
import { Customer } from '../models';
import {
  validateRegisterCustomer,
  validateCustomerLogin,
  validateCustomerUpdate,
  validateCustomerAddressUpdate
} from '../validators/customer';
import validateCustomerCreditCard from '../validators/customer/validate-creditcard';

const filterEditableAttributes = (unchangedRequestObject, editableAttributes) => {
  Object.keys(unchangedRequestObject).forEach((key) => {
    if (!editableAttributes.includes(key)) {
      delete unchangedRequestObject[key];
    }
  });
};

/**
 * Class representing customers
 */
export default class CustomerController {
  /**
    * @desc Register a new customer
    * @param {*} req - Request object
    * @param {*} res - Response object
    * @returns {object} An object containing the user data and token
    */
  static registerCustomer(req, res) {
    const { errors, isValid } = validateRegisterCustomer(req.body);
    if (isValid === false) {
      return res.status(400).json(errors);
    }

    Customer.findOne({ where: { email: req.body.email } })
      .then((customer) => {
        if (customer) {
          return res.status(400).json({
            code: 'USR_04',
            message: 'The email already exists',
            field: 'email'
          });
        }

        // bcryptjs
        bcryptjs.genSalt(10, (err, salt) => {
          bcryptjs.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err;

            Customer.create({ name: req.body.name, email: req.body.email, password: hash })
              .then((newCustomer) => {
                const token = jwt.sign({ customer_id: newCustomer.dataValues.customer_id, email: newCustomer.dataValues.email }, 'secretKey', { expiresIn: '2h' });
                res.json({ customer: { schema: newCustomer }, accessToken: `Bearer ${token}`, expires_in: '2h' });
              });
          });
        });
      });
  }

  /**
   * @description Enables a customer to login
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @returns {object} An object containing the user data and token
   */
  static CustomerLogin(req, res) {
    const { errors, isValid } = validateCustomerLogin(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Customer.findOne({ where: { email: req.body.email } })
      .then((customer) => {
        if (!customer) {
          return res.status(400).json({
            code: 'USR_05',
            message: "The email doesn't not exists",
            field: 'email'
          });
        }
        bcryptjs.compare(req.body.password, customer.password, (err, result) => {
          if (result) {
            const signedToken = jwt.sign({ customer_id: customer.customer_id, email: customer.email }, 'secretKey', { expiresIn: '2h' });
            delete customer.dataValues.password;
            return res.status(200).json({
              customer: {
                schema: customer
              },
              accessToken: `Bearer ${signedToken}`
            });
          }
          return res.status(400).json({
            code: 'USR_05',
            message: 'The Email or Password is invalid',
            field: 'email'
          });
        });
      });
  }

  /**
   * @description Gets the details of a customer by the customer id
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @returns {object} An object containing the user data and token
   */
  static getCustomerById(req, res) {
    const customerId = req.user.customer_id;
    Customer.findOne({ where: { customer_id: customerId }, attributes: { exclude: ['password'] } })
      .then(customer => res.json({ customer }))
      .catch(err => res.status(400).json(err));
  }

  /**
   * @description Update the details of a customer
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @returns {object} An object containing the user data and token
   */
  static async updateCustomerDetails(req, res) {
    const customerId = req.user.customer_id;
    const editableAttributes = ['name', 'email', 'password', 'day_phone', 'eve_phone', 'mob_phone'];

    // Spread the request body to remove reference upon change
    const unchangedRequestObject = { ...req.body };

    // Remove attributes in the object that should not be editable based on the route
    filterEditableAttributes(unchangedRequestObject, editableAttributes);

    const { errors, isValid } = validateCustomerUpdate(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    // check if the email is changed
    if (req.body.email !== req.user.email) {
      // Implemented using async await to avoid promise not being resolved on time
      try {
        const customerExist = await Customer.findOne({ where: { email: req.body.email } });
        if (customerExist) {
          return res.status(400).json({
            error: {
              status: 400,
              code: 'USR_04',
              message: 'The email already exists.',
              field: 'email'
            }
          });
        }
      } catch (err) { console.log(err); }
    }

    if (req.body.email === req.user.email) { delete unchangedRequestObject.email; }
    Customer.update(unchangedRequestObject, { where: { customer_id: customerId } })
      .then((updatedCustomer) => {
        if (updatedCustomer) {
          // sequelize returns data upon update only with postrest
          // using returning=true, for mysql, we need to use a seperate find
          Customer.findOne({ where: { customer_id: customerId }, attributes: { exclude: ['password'] } })
            // Customer.findByPk(customerId, { attributes: { exclude: ['password'] } })
            .then(customer => res.json({ customer }))
            .catch(err => res.status(400).json(err));
        }
      })
      .catch(err => console.log(err));
  }

  /**
   * @description Update the address of a customer
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @returns {object} An object containing the user data and token
   */
  static UpdateCustomerAddress(req, res) {
    const customerId = req.user.customer_id;
    const editableAttributes = ['address_1', 'address_2', 'city', 'region', 'postal_code', 'country', 'shipping_region_id'];

    // Spread the request body to remove reference upon change
    const unchangedRequestObject = { ...req.body };

    // Remove attributes in the object that should not be editable based on the route
    filterEditableAttributes(unchangedRequestObject, editableAttributes);
    const { errors, isValid } = validateCustomerAddressUpdate(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Customer.update(unchangedRequestObject, { where: { customer_id: customerId } })
      .then((updatedCustomer) => {
        if (updatedCustomer) {
          // sequelize returns data upon update only with postrest
          // using returning=true, for mysql, we need to use a seperate find
          Customer.findOne({ where: { customer_id: customerId }, attributes: { exclude: ['password'] } })
            // Customer.findByPk(customerId, { attributes: { exclude: ['password'] } })
            .then(customer => res.json({ customer }))
            .catch(err => res.status(400).json(err));
        }
      })
      .catch(err => console.log(err));
  }

  /**
   * @description Update the credit card of a customer
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @returns {object} An object containing the user data and token
   */
  static UpdatCustomerCreditCard(req, res) {
    const customerId = req.user.customer_id;

    const { errors, isValid } = validateCustomerCreditCard(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Customer.update({ credit_card: req.body.credit_card }, { where: { customer_id: customerId } })
      .then((updatedCustomer) => {
        if (updatedCustomer) {
        // sequelize returns data upon update only with postrest
        // using returning=true, for mysql, we need to use a seperate find
          Customer.findOne({ where: { customer_id: customerId }, attributes: { exclude: ['password'] } })
          // Customer.findByPk(customerId, { attributes: { exclude: ['password'] } })
            .then(customer => res.json({ customer }))
            .catch(err => res.status(400).json(err));
        }
      })
      .catch(err => console.log(err));
  }

  static nuu(req, res) {
   return res.json({ message: 'Happening'})
        }
}
