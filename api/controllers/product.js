import { Product } from '../models';
import validateId from '../validators/validate-param-id';
import validateProductPagination from '../validators/product/validate-product-pagination';
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
    let { page = 1, limit = 1, description_length = 20 } = req.query;
    
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
}
