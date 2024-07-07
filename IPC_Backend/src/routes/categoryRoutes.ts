import { Router } from 'express';
import { categoryController } from '@controllers';
import authentication from '../middleware/authentication';
import RoleAuthorize from '../middleware/roleAuthorize';

const router = Router();

router.post('/', authentication.authorizeUser, new RoleAuthorize(['Admin']).authorizeUser, categoryController.createCategory);
router.get('/', authentication.authorizeUser, categoryController.getAllCategories);
router.get('/:id', authentication.authorizeUser, categoryController.getCategoryById);
router.put('/:id', authentication.authorizeUser, new RoleAuthorize(['Admin']).authorizeUser, categoryController.updateCategory);
router.delete('/:id', authentication.authorizeUser, new RoleAuthorize(['Admin']).authorizeUser, categoryController.deleteCategory);

export default router;
