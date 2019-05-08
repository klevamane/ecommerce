import { Category, Product_Category, Product, Department } from '../models';
import validateCategory from '../validators/category/validate-category';
import validateId from '../validators/validate-param-id';
import { filterEditableAttributes } from '../helpers/functions';

import validateCategoryQuery from '../validators/category/validate-category-query';


/**
 * Class representing the categories
 */
export default class CategoryController {
  /**
   * @description Get all categories
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @returns {object} an array of objects containing categories
   */
  static GetAllCategories(req, res) {
    // limit:10 - fetch 10 instance / rows
    // offset:10 skip 10

    let { page = 1, limit = 3 } = req.query;
    let { sort = 'name', order = 'DESC ' } = req.query;

    const { errors, isValid } = validateCategoryQuery(req.query);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    if (sort !== 'category_id' && sort !== 'name') {
      sort = 'category_id';
    }

    if (order !== 'ASC' && order !== 'DESC') {
      order = 'ASC';
    }

    // Get the keys passed
    const validQueryKeys = ['page', 'order', 'limit'];

    filterEditableAttributes(req.query, validQueryKeys);

    limit = parseInt(limit, 10);
    page = parseInt(page, 10);
    const offset = (page - 1) * limit;

    Category.findAll(
      {
        limit,
        offset,
        order: [

          [sort, order]
        ]
      }
    )
      .then(categories => res.json(categories))
      .catch(err => console.log(err));
  }

  /**
   * @description Get all categories
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @returns {object} an array of objects containing categories
   */
  static GetCategoryById(req, res) {
    const { errors, isValid } = validateCategory(req.params);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Category.findByPk(req.params.category_id)
      .then((category) => {
        if (!category) {
          return res.status(400).json({
            error: {
              status: 400,
              code: 'CAT_01',
              message: 'The category was not found.',
              field: 'category_id'
            }
          });
        }
        return res.json(category);
      })
      .catch(err => console.log(err));
  }

  /**
   * @description Get the list of categories of a product by its ID
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @returns {object} an array of objects containing the list of categories of a product
   */
  static GetCategoriesFromProductId(req, res) {
    const { errors, isValid } = validateId(req.params.product_id, 'CAT_01');
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Category.findAll({
      include: [
        {
          model: Product,
          as: 'products',
          where: { product_id: req.params.product_id },
          attributes: []
        }
      ],
      attributes: ['category_id', 'department_id', 'name']
      // attributes for category
    })
      .then(categories => res.json(categories))
      .catch(err => console.log(err));
  }

  /**
   * @description Get the list of categories of a department by its ID
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @returns {object} an array of objects containing the list of categories of a department
   */
  static GetCategoriesFromDepartmentId(req, res) {
    const { errors, isValid } = validateId(req.params.department_id, 'CAT_01');
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Category.findAll({
      where: { department_id: req.params.department_id }
    })
      .then(categories => res.json(categories))
      .catch(err => console.log(err));
  }
}
