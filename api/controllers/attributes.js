import Sequelize from 'sequelize';
import db, {
  Attribute, AttributeValue, ProductAttribute, Product
} from '../models';
import validateId from '../validators/validate-param-id';

/**
 * Attributes class
 */
export default class AttributesController {
  /**
   * @description gets all attributes
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @returns {object} an object containing the of new product review
   */
  static getAllAttributes(req, res) {
    Attribute.findAll()
      .then(attributes => res.json(attributes));
  }

  /**
   * @description Get the details of an attribute by Id
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @returns {object} an object containing the details of a particular attribute.
   */
  static getAttributeById(req, res) {
    const { errors, isValid } = validateId(req.params.attribute_id, 'ATT_02');
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Attribute.findByPk(req.params.attribute_id)
      .then((attribute) => {
        if (!attribute) {
          return res.status(400).json({
            code: 'ATT_02',
            message: 'The attribute was not found.',
            field: 'attribute_id'
          });
        }
        return res.status(200).json(attribute);
      })
      .catch(err => console.log(err));
  }

  /**
   * @description Get the value details of an attribute
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @returns {object} an object containing the details of a particular attribute.
   */
  static getAttributeValuesById(req, res) {
    const { errors, isValid } = validateId(req.params.attribute_id, 'ATT_02');
    if (!isValid) {
      return res.status(400).json(errors);
    }
    AttributeValue.findOne({
      where: { attribute_id: req.params.attribute_id }, attributes: { exclude: ['attribute_id'] }
    })
      .then((attributeValue) => {
        if (!attributeValue) {
          return res.status(400).json({
            error: {
              status: 400,
              code: 'ATT_02',
              message: 'The attribute value was not found.',
              field: 'attribute_id'
            }
          });
        }
        return res.json(attributeValue);
      });
  }

  /**
   * @description Get the attributes in a product
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @returns {object} Returns an array of Values of Attribute Objects

   */
  static getAttributesInProduct(req, res) {
    const { errors, isValid } = validateId(req.params.product_id, 'ATT_01');
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const productId = parseInt(req.params.product_id, 10);
    db.sequelize.query("SELECT `AttributeValue`.`attribute_value_id`, `AttributeValue`.`value` as `attribute_value`, `Attribute`.`name` AS `attribute_name` FROM `attribute_value` AS `AttributeValue` INNER JOIN ( `product_attribute` AS `products->ProductAttribute` INNER JOIN `product` AS `products` ON `products`.`product_id` = `products->ProductAttribute`.`product_id`) ON `AttributeValue`.`attribute_value_id` = `products->ProductAttribute`.`attribute_value_id` AND `products`.`product_id` = '?' LEFT OUTER JOIN `attribute` AS `Attribute` ON `AttributeValue`.`attribute_id` = `Attribute`.`attribute_id`", { replacements: [productId], type: Sequelize.QueryTypes.SELECT })
      .then(attributes => res.json(attributes))
      .catch(err => console.log(err));
  }
}
