import shortId from 'shortid';
import { uniqueId } from 'lodash';
import db, { ShoppingCart } from '../models';
import validateShoppingCart from '../validators/ShoppingCart';
import validateCartId from '../validators/validateCartId';
import validateId from '../validators/validate-param-id';

/**
 * Shopping Cart class
 */
export default class ShoppingCartController {
  /**
   * @description Get the cart Id
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @returns {object} an object containing the cart Id
   */
  static generateUniqueId(req, res) {
    return res.json({
      cartId: shortId.generate() + uniqueId('sa')
    });
  }

  /**
   * @description Add product to the shopping cart
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @returns {object} an object containing the cart item
   */
  static addProductInCart(req, res) {
    const { errors, isValid } = validateShoppingCart(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    db.sequelize.query('CALL xcustom_shopping_cart_add_product(:inCartId, :inProductId, :inAttributes)',
      { replacements: { inCartId: req.body.cart_id, inProductId: req.body.product_id, inAttributes: req.body.attributes } })
      .then((cartItem) => {
        db.sequelize.query('CALL xcustom_shopping_cart_get_products(:inCartId)',
          { replacements: { inCartId: req.body.cart_id } })
          .then(productsInCart => res.json(productsInCart));
      });
  }

  /**
   * @description Empty the cart
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @returns {object} null
   */
  static emptyCart(req, res) {
    const { errors, isValid } = validateCartId(req.params);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const error = {
      status: 404,
      message: 'cart id does not exist',
      code: 'SHP_02a',
      field: 'cart_id'
    };
    // check if cart Id exist first
    ShoppingCart.findOne({ where: { cart_id: req.params.cart_id } })
      .then((thecart) => {
        if (thecart) {
          db.sequelize.query('CALL shopping_cart_empty(:inCartId)', { replacements: { inCartId: req.params.cart_id } })
            .then(() => res.status(200).json({}));
        } else { // Decided to make use of else block due to multiple headers set in on request
          return res.status(404).json(error);
        }
      })
      .catch(err => res.status(400).json(error));
  }

  /**
   * @description Move Item to the cart
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @returns {object} null
   */
  static moveItemToCart(req, res) {
    const { errors, isValid } = validateId(req.params);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    db.sequelize.query('CALL shopping_cart_move_product_to_cart(:inCartId)', { replacements: { inCartId: req.params.cart_id } })
      .then(() => res.status(200).json({}))
      .catch(err => console.log(err));
  }

  /**
   * @description Get total amount ot items in the cart
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @returns {object} an object with total unt as the only key
   */
  static getTotalAmountInCart(req, res) {
    const { errors, isValid } = validateCartId(req.params);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    db.sequelize.query('CALL shopping_cart_get_total_amount(:inCartId)', { replacements: { inCartId: req.params.cart_id } })
      .then(totalAmount => res.status(200).json({ total_amount: totalAmount }))
      .catch(err => console.log(err));
  }

  /**
   * @description Save an item for later
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @returns {object} null
   */
  static saveItemForLater(req, res) {
    const { errors, isValid } = validateId(req.params.item_id, 'SHP_03');
    if (!isValid) {
      return res.status(400).json(errors);
    }
    db.sequelize.query('CALL shopping_cart_save_product_for_later(:inItemId)', { replacements: { inItemId: req.params.item_id } })
      .then(() => res.status(200).json())
      .catch(err => console.log(err));
  }

  /**
   * @description Get the products saved for later
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @returns {object} null
   */
  static getItemsSavedForLater(req, res) {
    const { errors, isValid } = validateCartId(req.params);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    db.sequelize.query('CALL shopping_cart_get_saved_products(:inCartId)', { replacements: { inCartId: req.params.cart_id } })
      .then(item => res.status(200).json(item))
      .catch(err => console.log(err));
  }

  /**
   * @description Remove a product from the cart
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @returns {object} no data
   */
  static removeItemFromCart(req, res) {
    const { errors, isValid } = validateId(req.params.item_id, 'SHP_03');
    if (!isValid) {
      return res.status(400).json(errors);
    }

    db.sequelize.query('CALL shopping_cart_remove_product(:inItemId)', { replacements: { inItemId: req.params.item_id } })
      .then(() => res.status(200).json())
      .catch(err => console.log(err));
  }
}
