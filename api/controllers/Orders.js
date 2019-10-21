import { isEmpty } from 'lodash';
import db, { ShoppingCart, Orders } from '../models';
import validateOrder from '../validators/Order';

/**
 * Orders controller class
 */
export default class OrdersController {
  /**
   * @description Remove a product from the cart
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @returns {object} no data
   */
  static createOrder(req, res) {
    const { errors, isValid } = validateOrder(req.body, res);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Done: The todo has been done
    // TODO: Before you create an order ensure that the shopping cart has that cart id, else it would throw an error.
    // error message should say the shopping cart doesn't have a cart id with what was supplied.
    ShoppingCart.findOne({ where: { cart_id: req.body.cart_id } })
      .then((cartContainsCartId) => {
        if (!cartContainsCartId) {
          return res.status(404).json({
            error: {
              status: 404,
              code: 'SHP_03',
              message: 'The cart id was not found',
              field: 'cart_id'
            }
          });
        }
        db.sequelize.query('CALL shopping_cart_create_order(:inCartId, :inCustomerId, :inShippingId, :inTaxId)', {
          replacements: {
            inCartId: req.body.cart_id,
            inCustomerId: req.user.customer_id,
            inShippingId: req.body.shipping_id,
            inTaxId: req.body.tax_id
          }
        })
          .then(orderId => res.status(200).json(orderId));
      })
      .catch((err) => { console.log(err); });
  }

  /**
   * @description Get the order details by Id
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @returns {object} an object of the order details
   */
  static async getOrderById(req, res) {
    const theOrder = await Orders.findByPk(req.params.order_id);
    if (!theOrder) {
      return res.status(404).json({
        error: {
          status: 400,
          code: 'ORD_03',
          message: 'The order was not found',
          field: 'order_id'
        }
      });
    }
    const customerId = theOrder.customer_id;
    if (customerId !== req.user.customer_id) {
      return res.status(400).json({
        error: {
          status: 400,
          code: 'ORD_02',
          message: 'You are Unauthorized to access this order',
          field: 'order_id'
        }
      });
    }

    const orderDetails = await db.sequelize.query('CALL orders_get_order_details(:inOrderId)', {
      replacements: { inOrderId: req.params.order_id }
    });
    return res.status(200).json(orderDetails[0]);
  }

  /**
   * @description Get all orders of a particular customer
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @returns {object} an array of object(s) containing the customer objects
   */
  static async getOrdersByCustomer(req, res) {
    const customersOrders = await Orders.findAll({ where: { customer_id: req.user.customer_id } });
    return res.json(customersOrders);
  }

  /**
   * @description Get short detail of the order
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @returns {object} an object containing the order detail
   */
  static async getShortOrderDetail(req, res) {
    const shorOrderDetail = await db.sequelize.query('CALL orders_get_order_short_details(:inOrderId)', {
      replacements: {
        inOrderId: req.params.order_id,
      }
    });
    if (isEmpty(shorOrderDetail)) {
      return res.status(404).json({
        error: {
          status: 400,
          code: 'ORD_03',
          message: 'The order was not found',
          field: 'order_id'
        }
      });
    }
    return res.json(shorOrderDetail);
  }
}
