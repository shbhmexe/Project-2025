import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  color: string;
  icon: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    color: { type: String, required: true },
    icon: { type: String, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema); 