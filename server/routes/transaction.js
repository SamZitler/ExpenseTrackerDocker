import Router from "express";
import Transaction from "../models/transaction.js";
import bodyParser from "body-parser";
import * as TransactionController from '../controller/TransactionController.js';

const router = Router();



router.get('/', TransactionController.index);

router.post("/", TransactionController.create);

router.delete('/:id', TransactionController.destroy)

router.patch('/:id', TransactionController.update)

export default router;