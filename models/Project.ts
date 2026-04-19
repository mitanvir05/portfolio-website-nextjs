import mongoose, { Schema, model, models } from 'mongoose';

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  techStack: [{ type: String }],
  liveLink: { type: String },
  githubLink: { type: String }, 
  frontendLink: { type: String },
  backendLink: { type: String },
  imageUrls: [{ type: String }], // <-- CHANGED THIS TO AN ARRAY
  featured: { type: Boolean, default: false },
}, { timestamps: true });

export default models.Project || model('Project', ProjectSchema);