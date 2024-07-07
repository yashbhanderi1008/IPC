import { Router } from 'express';
import { productConroller } from '@controllers';
import authentication from '../middleware/authentication';
import RoleAuthorize from '../middleware/roleAuthorize';
import fileUpload from '../middleware/fileUpload';

const router = Router();

router.post('/', authentication.authorizeUser, new RoleAuthorize(['Admin']).authorizeUser, fileUpload.uploadFile, productConroller.createProduct);
router.get('/', authentication.authorizeUser, productConroller.getAllProducts);
router.get('/:id', authentication.authorizeUser, productConroller.getProductById);
router.put('/:id', authentication.authorizeUser, new RoleAuthorize(['Admin']).authorizeUser, fileUpload.uploadFile, productConroller.updateProduct);
router.delete('/:id', authentication.authorizeUser, new RoleAuthorize(['Admin']).authorizeUser, productConroller.deleteProduct);

export default router;
