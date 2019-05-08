import express from 'express';
import passport from 'passport';

import Product from '../controllers/product';

const router = express.Router();

// customers
router.get('', Product.GetAllProducts);
// router.put('/address', passport.authenticate('jwt', { session: false }), Prod.UpdateCustomerAddress);
// router.put('/creditcard', passport.authenticate('jwt', { session: false }), Customer.UpdatCustomerCreditCard);

export default router;
