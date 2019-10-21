import express from 'express';

import ShippingRegion from '../controllers/shipping-regions';

const router = express.Router();

// customers
router.get('/regions', ShippingRegion.get);
router.get('/regions/:shipping_region_id', ShippingRegion.getById);

export default router;
