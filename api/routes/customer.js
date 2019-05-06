import express from 'express';
import passport from 'passport';

import Customer from '../controllers/customer';

const router = express.Router();

// customers
router.post('', Customer.registerCustomer);
router.post('/login', Customer.CustomerLogin);
router.put('/address', passport.authenticate('jwt', { session: false }), Customer.UpdateCustomerAddress);
router.put('/creditcard', passport.authenticate('jwt', { session: false }), Customer.UpdatCustomerCreditCard);

export default router;
