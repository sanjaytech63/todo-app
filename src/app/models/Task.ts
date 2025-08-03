import mongoose, { Schema, Document } from 'mongoose';

export type TaskStatus = 'pending' | 'in-progress' | 'completed';

export interface ITask extends Document {
  title: string;
  description?: string;
  category?: string;
  status: TaskStatus;
}

const TaskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: String,
  category: String,
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending',
  },
}, { timestamps: true });

export default mongoose.models.Task || mongoose.model<ITask>('Task', TaskSchema);
