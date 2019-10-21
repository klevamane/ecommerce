import express from 'express';
import passport from 'passport';

import Product from '../controllers/product';

const router = express.Router();

// customers
router.get('', Product.GetAllProducts);
router.get('/inCategory/:category_id', Product.getProductsInACategory);
router.get('/inDepartment/:department_id', Product.getProductsInDepartmentById);
router.get('/:product_id', Product.GetProductById);
router.get('/:product_id/details', Product.getProductDetails);
router.get('/:product_id/reviews', Product.getProductReviews);
router.post('/:product_id/reviews', passport.authenticate('jwt', { session: false }), Product.PostProductReview);
// router.put('/creditcard', passport.authenticate('jwt', { session: false }), Customer.UpdatCustomerCreditCard);

export default router;
