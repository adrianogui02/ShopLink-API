import { Router } from "express";
import productRouter from "../resources/products/router"
import authRouter from "../resources/users/router"

const router = Router()

router.use('/products', productRouter);
router.use('/auth', authRouter);

export default router;