import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
  amount: number;
  date: Date;
  description: string;
  category: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const TransactionSchema: Schema = new Schema(
  {
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', TransactionSchema); 