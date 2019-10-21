
import Sequelize from 'sequelize';
import db, {
  Product, Category, Department, Review, Customer,
} from '../models';


import validateId from '../validators/validate-param-id';
import validateProductPagination from '../validators/product/validate-product-pagination';
import validateProductReview from '../validators/product/validate-product-rating';

const paginateProduct = (requestQuery) => {
  let { page = 1, limit = 20, description_length = 20 } = requestQuery;
  limit = parseInt(limit, 10);
  page = parseInt(page, 10);
  const offset = (page - 1) * limit;
  return {
    limit, description_length, offset
  };
};
/**
 * Controller class to implement Product http methods
 */
export default class ProductController {
  /**
   * @description Get the list of categories of a department by its ID
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @returns {object} an array of objects containing the list of categories of a department
   */
  static GetAllProducts(req, res) {
    let productsList;
    let { page = 1, limit = 20, description_length = 20 } = req.query;

    const { errors, isValid } = validateProductPagination(req.query);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    limit = parseInt(limit, 10);
    page = parseInt(page, 10);
    const offset = (page - 1) * limit;
    Product.findAll({
      limit,
      offset,
    })
      .then((products) => {
        if (products) {
          // do something here
          productsList = products.map((product) => {
            product.description = product.description.substring(0, description_length);
            return product;
          });
          return res.status(200).json(productsList);
        }

        return res.status(200).json(products);
      })
      .catch(err => console.log(err));
  }

  /**
   * @description Get the the details of a product by its Id
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @returns {object} an objects containing the detail the product
   */
  static GetProductById(req, res) {
    Product.findByPk(req.prams.product_key)
      .then((product) => {
        if (!product) {
          return res.status(404).json(
            {
              error: {
                status: 400,
                code: 'PRO_01',
                message: 'The product was not found.',
                field: 'category_id'
              }
            }
          );
        }
      })
      .catch(err => console.log(err));
  }

  /**
   * @description Get the the list of products in a category
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @returns {object} an array of object(s) containing the list of products in a particular category
   */
  static getProductsInACategory(req, res) {
    const { limit, description_length, offset } = paginateProduct(req.query);
    const { errors, isValid } = validateProductPagination(req.query);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    let productsList;

    Product.findAll({
      include: [{
        model: Category,
        as: 'categories',
        where: { category_id: req.params.category_id },
        attributes: []
      }],
      limit,
      offset,
    })
      .then((products) => {
        if (products) {
          // do something here
          productsList = products.map((product) => {
            product.description = product.description.substring(0, description_length);
            return product;
          });
          return res.status(200).json(productsList);
        }

        return res.status(200).json(products);
      })
      .catch(err => console.log(err));
  }

  /**
   * @description Get the the list of products in a category
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @returns {object} an array of object(s) containing the list of products in a particular category
   */
  static getProductsInDepartmentById(req, res) {
    const { limit, description_length, offset } = paginateProduct(req.query);
    const { errors, isValid } = validateProductPagination(req.query);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    let productsList;

    Product.findAll({
      include: [{
        model: Category,
        as: 'categories',
        where: { department_id: req.params.department_id },
        attributes: []
      }],
      limit,
      offset,
    })
      .then((products) => {
        if (products) {
          // do something here
          productsList = products.map((product) => {
            product.description = product.description.substring(0, description_length);
            return product;
          });
          return res.status(200).json(productsList);
        }

        return res.status(200).json(products);
      })
      .catch(err => console.log(err));
  }

  /**
   * @description Get the details of a product by passing the id as a parameter
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @returns {object} an object containing the details of a particular product
   */
  static getProductDetails(req, res) {
    const { errors, isValid } = validateId(req.params.product_id, 'PRO_01');
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Product.findByPk(req.params.product_id, { attributes: { exclude: ['thumbnail', 'display'] } })
      .then((product) => {
        if (product) {
          return res.json(product);
        }
        return res.status(404).json({
          error: {
            status: 404,
            code: 'PRO_01',
            message: 'The product was not found.',
            field: 'product_id'
          }
        });
      });
  }

  /**
   * @description Get the location of a product by passing the id as a parameter
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @returns {object} an object containing the location of a particular product
   */
  static getProductReviews(req, res) {
    const productId = 1;
    db.sequelize.query('SELECT Review.review, Review.rating, Review.created_on, Customer.name AS name FROM review AS Review LEFT OUTER JOIN customer AS Customer ON Review.customer_id = Customer.customer_id WHERE Review.product_id = ?', { replacements: [productId], type: Sequelize.QueryTypes.SELECT }) // use replacements as parameter binder
      .then(reviews => res.json(reviews))
      .catch(err => console.log(err));
  }

  /**
   * @description Add a product review
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @returns {object} an object containing the of new product review
   */
  static PostProductReview(req, res) {
    const { errors, isValid } = validateProductReview(req.body, req.params.product_id);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newReview = {
      product_id: req.params.product_id,
      review: req.body.review,
      rating: req.body.rating,
      customer_id: req.user.customer_id,
      created_on: Date.now()
    };
    Review.create(newReview)
      .then(review => res.json([]))
      .catch(err => console.log(err));
  }
}
