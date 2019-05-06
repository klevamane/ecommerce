import express from 'express';

import Department from '../controllers/department';

const router = express.Router();

router.get('', Department.getDepartments);
router.get('/:department_id', Department.getDepartmentById);

export default router;
