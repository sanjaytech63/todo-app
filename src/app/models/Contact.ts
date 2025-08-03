import { Schema, Document, models, model } from 'mongoose';

export interface IContact extends Document {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
    },
  },
  { timestamps: true }
);

const Contact = models.Contact || model<IContact>('Contact', ContactSchema);

export default Contact;
