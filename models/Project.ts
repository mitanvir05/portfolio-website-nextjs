import mongoose, { Schema, model, models } from 'mongoose';

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  techStack: [{ type: String }],
  liveLink: { type: String },
  githubLink: { type: String }, // <-- ADDED THIS BACK
  frontendLink: { type: String },
  backendLink: { type: String },
  imageUrl: { type: String },
  featured: { type: Boolean, default: false },
}, { timestamps: true });

export default models.Project || model('Project', ProjectSchema);