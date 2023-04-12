import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  productId: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
  image: { type: String, default: "no-image.png" },
  createdAt: { type: Date, required: true, default: Date.now() },
  updatedAt: { type: Date, required: true, default: Date.now() },
});

interface Product extends mongoose.Document {
  productId: number;
  name: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
  image: string;
}

export default mongoose.model<Product>("Product", ProductSchema);
