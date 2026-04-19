import mongoose, { Schema, model, models } from 'mongoose';

const SettingsSchema = new Schema({
  resumeUrl: { type: String, default: "" },
}, { timestamps: true });

export default models.Settings || model('Settings', SettingsSchema);