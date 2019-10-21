import express from 'express';

import Attributes from '../controllers/attributes';

const router = express.Router();

// customers
router.get('', Attributes.getAllAttributes);
router.get('/:attribute_id', Attributes.getAttributeById);
router.get('/values/:attribute_id', Attributes.getAttributeValuesById);
router.get('/inProduct/:product_id', Attributes.getAttributesInProduct);


export default router;
