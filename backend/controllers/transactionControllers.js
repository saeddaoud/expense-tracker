import { toDate } from 'date-fns';
import Transaction from '../models/transactionModel.js';

//@desc         Get all transactions
//@route        GET /api/v1/transactions
//@access       Private
export const getTransactions = async (req, res, next) => {
  let startDate, endDate;
  // Check if the user provides a query with the month and/or year
  let { year, month } = req.query; //month is expected to be between 0 and 11
  // year = Number(year);
  // month = Number(month);

  if (year && !month) {
    // If only year is provided, return all queries from the start of that year until the end of it
    startDate = new Date(year, 0, 1);
    endDate = new Date(Number(year) + 1, 0, 1);
  } else if (year && month) {
    // If month and year are provided, return all documents from the start and the end of that month
    startDate = new Date(year, month, 1);
    endDate =
      month == 11
        ? new Date(Number(year) + 1, 0, 1)
        : new Date(year, Number(month) + 1, 1);
  } else {
    // If no month and year is provided, return the documnets created in the current month (The default)
    const todayDate = new Date();
    const currentMonth = todayDate.getMonth();
    const currentYear = todayDate.getFullYear();
    startDate = new Date(currentYear, currentMonth, 1);
    endDate = new Date(currentYear, Number(currentMonth) + 1, 1);
  }
  // ex: if query include year=2020, then return all documents created between Jan 1st, 2020 12:00 am (inclusive) and Jan 1st, 2020 12:00 am (exclusive)
  // if ex: if query include year=2020 and month=11 (for Dec.), then return all documents created between Dec 1st, 2020 12:00 am (inclusive) and Jan 1st, 2021 12:00 am (exclusive)
  await Transaction.find({
    $and: [
      { user: req.user._id },
      { createdAt: { $gte: startDate, $lt: endDate } },
    ],
  })
    .populate('user', 'name')
    .exec((err, transactions) => {
      if (err) {
        next(err);
      } else {
        res.json(transactions);
      }
    });
};

//@desc         Get transaction by Id
//@route        GET /api/v1/transactions/:id
//@access       Private
export const getTransaction = async (req, res, next) => {
  await Transaction.findById(req.params.id, (err, transaction) => {
    if (err) {
      next(err);
    } else if (transaction.user.toString() !== req.user._id.toString()) {
      res.status(401);
      next(new Error('User not authorized for this action'));
    } else if (!transaction) {
      res.status(404);
      next(new Error('Transaction not found'));
    } else {
      res.json(transaction);
    }
  });
};

//@desc         Update transaction
//@route        PUT /api/v1/transactions/:id
//@access       Private
export const updateTransaction = async (req, res, next) => {
  await Transaction.findById(req.params.id, async (err1, foundTransaction) => {
    if (err1) {
      next(err1);
    } else if (!foundTransaction) {
      res.status(404);
      next(new Error('Transaction not found'));
    } else if (foundTransaction.user.toString() !== req.user._id.toString()) {
      res.status(401);
      next(new Error('User not authorized for this action'));
    } else {
      await Transaction.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true },
        (err2, updatedTransaction) => {
          if (err2) {
            next(err2);
          } else {
            res.json(updatedTransaction);
          }
        }
      );
    }
  });
};

//@desc         Delete transaction
//@route        DELETE /api/v1/transactions/:id
//@access       Private
export const deleteTransaction = async (req, res, next) => {
  await Transaction.findById(req.params.id, async (err1, foundTransaction) => {
    if (err1) {
      next(err1);
    } else if (!foundTransaction) {
      res.status(400);
      next(new Error('No transaction found'));
    } else if (foundTransaction.user.toString() !== req.user._id.toString()) {
      res.status(401);
      next(new Error('User not authorized for this action'));
    } else {
      await Transaction.findByIdAndRemove(
        req.params.id,
        (err2, transaction) => {
          if (err2) {
            next(err2);
          } else {
            res.json({ message: 'Transaction deleted' });
          }
        }
      );
    }
  });
};

//@desc         Add a transaction
//@route        POST /api/v1/transactions
//@access       Private
export const addTransaction = async (req, res, next) => {
  await Transaction.create(
    { user: req.user._id, ...req.body },
    (err, createdTransaction) => {
      if (err) {
        next(err);
      } else {
        res.json(createdTransaction);
      }
    }
  );
};
