import mongoose from 'mongoose';
import QueryBuilder from '../builder/QueryBuilder';
import { productsSearchableFields } from './product.constant';
import { Product } from './product.model';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';

// const createProductIntoDB = async (payload: TProduct) => {
//   const result = await Product.create(payload);
//   return result;
// };

const createProductIntoDB = async (payload: TProduct) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const newProduct = await Product.create([payload], { session });
    if (!newProduct.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create products!");
    }

    await session.commitTransaction();
    await session.endSession();

    return newProduct;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getAllProductFromDB = async (query: Record<string, unknown>) => {
    const productQuery = new QueryBuilder(
      Product.find(),
      query,
    )
      .search(productsSearchableFields)
      .filter()
      .sort()
      .paginate()
      .fields();
  
    const result = await productQuery.modelQuery;
    return result;
  };

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

const updateProductIntoDB = async (id: string, payload: Partial<TProduct>) => {
  const result = await Product.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteProductFromDB = async (id: string) => {
  const result = await Product.findByIdAndDelete({ _id: id });
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
};