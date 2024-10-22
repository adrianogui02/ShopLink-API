import { Router } from 'express';
import * as productsController from './controller';
import { validateBody } from '../../middlewares/validation';
import { productCreateSchema, productUpdateSchema } from './schema';

const router = Router();

router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);
router.post('/', validateBody(productCreateSchema), productsController.createProduct);
router.put('/:id', validateBody(productUpdateSchema), productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);

export default router;
