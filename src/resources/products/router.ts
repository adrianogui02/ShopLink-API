import { Router } from 'express';
import * as productsController from './controller';
import { validateBody } from '../../middlewares/validation';
import { productCreateSchema, productUpdateSchema } from './schema';
import { upload } from '../../middlewares/upload';

const router = Router();

router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);
router.post('/',upload.array('imagens', 5), productsController.createProduct);
router.put('/:id', validateBody(productUpdateSchema), productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);

export default router;

//validateBody(productCreateSchema)