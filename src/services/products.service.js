import * as productService from "../models/products.model.js";

export const getAllProductsService = () => {
  return productService.getAllProducts();
};

export const getProductServiceById = async (id) => {
  return productService.getProductById(id);
};

export const createProductService = async (productData) => {
  const docRef = await productService.saveProduct(productData);

  return {
    id: docRef.id,
    ...productData,
  };
};

export const updateProductService = async (id, productData) => {
  await productService.updateProduct(id, productData);
  return await productService.getProductById(id);
};

export const deleteProductService = async (id) => {
  return productService.deleteProduct(id);
};
