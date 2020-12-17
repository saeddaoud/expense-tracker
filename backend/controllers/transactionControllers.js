import Transaction from '../models/transactionModel.js';

//@desc         Get all transactions
//@route        GET /api/v1/transactions
//@access       Private
export const getTransactions = async (req, res, next) => {
  await Transaction.find({ user: req.user._id })
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
