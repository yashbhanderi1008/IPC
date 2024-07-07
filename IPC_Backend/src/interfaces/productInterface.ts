import { Types } from "mongoose";

export interface ProductInterface extends Document {
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    category: Types.ObjectId;
  }
  