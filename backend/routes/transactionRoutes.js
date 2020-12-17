import express from 'express';
import {
  addTransaction,
  deleteTransaction,
  getTransaction,
  getTransactions,
  updateTransaction,
} from '../controllers/transactionControllers.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addTransaction).get(protect, getTransactions);
router
  .route('/:id')
  .get(protect, getTransaction)
  .delete(protect, deleteTransaction)
  .put(protect, updateTransaction);

export default router;
