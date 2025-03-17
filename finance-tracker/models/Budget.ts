import mongoose, { Schema, Document } from 'mongoose';

export interface IBudget extends Document {
  category: string;
  amount: number;
  period: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const BudgetSchema: Schema = new Schema(
  {
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    period: { type: String, required: true, enum: ['Weekly', 'Monthly', 'Quarterly', 'Yearly'] },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

// Ensure only one budget per category per user
BudgetSchema.index({ category: 1, userId: 1 }, { unique: true });

export default mongoose.models.Budget || mongoose.model<IBudget>('Budget', BudgetSchema); 