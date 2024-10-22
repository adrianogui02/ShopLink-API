import { Router } from "express";
import productRouter from "../resources/products/router"

const router = Router()

router.use('/products',productRouter);

export default router;