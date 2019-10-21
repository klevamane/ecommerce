import express from 'express';

import Tax from '../controllers/Tax';

const router = express.Router();

// customers
router.get('', Tax.get);
router.get('/:tax_id', Tax.getById);

export default router;
