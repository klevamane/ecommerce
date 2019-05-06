import express from 'express';
import passport from 'passport';

import Customer from '../controllers/customer';

const router = express.Router();

// customer
router.get('', passport.authenticate('jwt', { session: false }), Customer.getCustomerById);
router.put('', passport.authenticate('jwt', { session: false }), Customer.updateCustomerDetails);

export default router;
