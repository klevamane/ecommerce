import express from 'express';

import Customer from '../controllers/customer';

const router = express.Router();

// customers
router.post('', Customer.registerCustomer);
router.post('/login', Customer.CustomerLogin);


export default router;
