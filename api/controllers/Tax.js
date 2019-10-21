import { get } from 'http';
import db, { Tax } from '../models';
import validateId from '../validators/validate-param-id';

/**
 * Tax Controller class
 */
export default class TaxController {
  /**
   * @description Get all taxes
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @returns {object} Returns an array of object of taxes
   */
  static get(req, res) {
    Tax.findAll()
      .then(taxes => res.json(taxes))
      .catch(err => console.log(err));
  }

  /**
   * @description Get a tax detail
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @returns {object} Returns an object of a tax
   */
  static getById(req, res) {
    const { errors, isValid } = validateId(req.params.tax_id);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Tax.findByPk(req.params.tax_id)
      .then((tax) => {
        if (!tax) {
          return res.status(400).json({
            error: {
              status: 400,
              code: 'TAX_05',
              message: 'The tax id does not exist.',
              field: 'tax_id'
            }
          });
        }
        return res.json(tax);
      });
  }
}
