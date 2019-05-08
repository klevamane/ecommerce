import express from 'express';

import Category from '../controllers/category';

const router = express.Router();

// customers
router.get('', Category.GetAllCategories);
router.get('/:category_id', Category.GetCategoryById);
router.get('/inproduct/:product_id', Category.GetCategoriesFromProductId);
router.get('/indepartment/:department_id', Category.GetCategoriesFromDepartmentId);

export default router;
