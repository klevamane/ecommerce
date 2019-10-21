import express from 'express';
import passport from 'passport';

import Orders from '../controllers/Orders';

const router = express.Router();

// customers
router.post('', passport.authenticate('jwt', { session: false }), Orders.createOrder);
router.get('/inCustomer', passport.authenticate('jwt', { session: false }), Orders.getOrdersByCustomer);
router.get('/:order_id', passport.authenticate('jwt', { session: false }), Orders.getOrderById);
router.get('/shortDetail/:order_id', passport.authenticate('jwt', { session: false }), Orders.getShortOrderDetail);

export default router;
