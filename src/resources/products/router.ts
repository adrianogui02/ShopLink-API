import { Router } from 'express';
import * as productsController from './controller';
import { validateBody } from '../../middlewares/validation';
import { productCreateSchema, productUpdateSchema } from './schema';
import { upload } from '../../middlewares/upload';
import { authenticate } from '../../middlewares/auth';
import { authorizeAdmin } from '../../middlewares/admin';

const router = Router();

// Acesso público
router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);
// As rotas exigem autenticação e autorização
router.post('/',authenticate,authorizeAdmin,upload.array('imagens', 5), productsController.createProduct);
router.put('/:id', authenticate,authorizeAdmin,validateBody(productUpdateSchema), productsController.updateProduct);
router.delete('/:id',authenticate,authorizeAdmin, productsController.deleteProduct);

export default router;

//validateBody(productCreateSchema)