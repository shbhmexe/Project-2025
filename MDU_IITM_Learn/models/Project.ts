import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProject extends Document {
    title: string;
    description: string;
    techStack: string[];
    githubLink?: string;
    demoLink?: string;
    author: string;
    isApproved: boolean;
}

const ProjectSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        techStack: { type: [String], default: [] },
        githubLink: { type: String },
        demoLink: { type: String },
        author: { type: String, required: true },
        isApproved: { type: Boolean, default: true },
    },
    { timestamps: true }
);

const Project: Model<IProject> =
    mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
