import {
  getAllProductsService,
  getProductServiceById,
  createProductService,
  updateProductService,
  deleteProductService,
} from "../services/products.service.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await getAllProductsService();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await getProductServiceById(id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el producto" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, code, price, description, category, stock } = req.body;

    // Validación de campos obligatorios
    if (!name || price === undefined) {
      return res.status(400).json({
        message: "Los campos 'name' y 'price' son obligatorios.",
      });
    }

    const productData = {
      name,
      code,
      price,
      description,
      category,
      stock,
    };

    Object.keys(productData).forEach((key) => {
      if (productData[key] === undefined) {
        productData[key] = "";
      }
    });

    const newProduct = await createProductService(productData);

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el producto",
    });
  }
};

//-------------Controller para modificar un producto

export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const productData = {
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      stock: req.body.stock,
    };

    Object.keys(productData).forEach((key) => {
      if (productData[key] === undefined) {
        delete productData[key];
      }
    });

    const updatedProduct = await updateProductService(id, productData);

    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el producto" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res
        .status(400)
        .json({ message: "ID de producto no proporcionado" });
    }
    const deleted = await deleteProductService(id);
    if (deleted) {
      res.status(200).json({ message: "Producto eliminado" });
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el producto" });
  }
};
