import mongoose, { Schema, Document, Model } from "mongoose";

export interface INote extends Document {
    title: string;
    subject: string;
    unit?: string;
    link: string;
    author: string;
    authorEmail: string; // For ownership verification
    upvotes: number;
    isApproved: boolean;
}

const NoteSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        subject: { type: String, required: true },
        unit: { type: String },
        link: { type: String, required: true },
        author: { type: String, required: true },
        authorEmail: { type: String, required: true, index: true }, // Indexed for faster lookups
        upvotes: { type: Number, default: 0 },
        isApproved: { type: Boolean, default: true },
    },
    { timestamps: true }
);

const Note: Model<INote> =
    mongoose.models.Note || mongoose.model<INote>("Note", NoteSchema);

export default Note;
