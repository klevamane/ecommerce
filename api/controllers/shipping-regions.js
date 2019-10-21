import db, { ShippingRegion } from '../models';
import validateId from '../validators/validate-param-id';

/**
 * Shipping Region class
 */
export default class ShippingRegionController {
  /**
   * @description Get all shipping regions
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @returns {object} Returns an array of objects of shipping regions
   */
  static get(req, res) {
    ShippingRegion.findAll()
      .then(regions => res.json(regions))
      .catch(err => console.log(err));
  }

  /**
   * @description Get a shipping region
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @returns {object} Returns an object of a shipping region
   */
  static getById(req, res) {
    const { errors, isValid } = validateId(req.params.shipping_region_id);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    ShippingRegion.findByPk(req.params.shipping_region_id)
      .then((region) => {
        if (!region) {
          return res.status(404).json({
            error: {
              status: 400,
              code: 'ATT_02',
              message: 'The attribute value was not found.',
              field: 'attribute_id'
            }
          });
        }
        return res.json(region);
      })
      .catch(err => console.log(err));
  }
}
