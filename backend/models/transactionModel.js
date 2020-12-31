import mongoose from 'mongoose';

const { Schema } = mongoose;

const transactionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    title: {
      type: String,
      required: ['true', 'Please enter a title'],
    },
    amount: {
      type: Number,
      required: ['true', 'Please enter an amount'],
    },
    type: {
      type: String,
      required: ['true', 'Please select transaction type'],
    },
    // year: {
    //   type: String,
    //   require: true,
    // },
    // month: {
    //   type: String,
    //   require: true,
    // },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
