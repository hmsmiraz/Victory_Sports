import { model, Schema } from 'mongoose';

const productSchema = new Schema<TProduct>(
  {
    name: { type: String },
    description: { type: String },
    category: { type: String },
    brand: { type: String },
    quantity: { type: Number },
    price: { type: Number },
    image: { type: String },
  },
  {
    timestamps: true,
  },
);

export const Product = model<TProduct>('Product', productSchema);