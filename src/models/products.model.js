//Modelo concetado con Firebase Firestore para trabajar con datos de productos
import { db } from "../data/firebase.data.js";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const productsCollection = collection(db, "products");

export async function getProductById(id) {
  const productDoc = await getDoc(doc(productsCollection, id));
  if (productDoc.exists()) {
    return productDoc.data();
  } else {
    return null;
  }
}

export async function getAllProducts() {
  const querySnapshot = await getDocs(productsCollection);
  const products = [];
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });
  return products;
}

export async function saveProduct(product) {
  const docRef = await addDoc(productsCollection, product);
  return docRef;
}

export async function updateProduct(id, productData) {
  const productDoc = doc(productsCollection, id);
  await updateDoc(productDoc, productData);
}

export async function deleteProduct(id) {
  const product = await getProductById(id);

  if (!product) {
    return false;
  }

  await deleteDoc(doc(productsCollection, id));

  return true;
}

/* Modelo para trabajr con datos JSON de productos */

// import fs from "fs";
// import path from "path";

// const __dirname = import.meta.dirname;
// const dataPath = path.join(__dirname, "../data/productos.json");

// //Metodo para buscar un producto por su ID
// export function getProductById(id) {
//   const products = this.getAllProducts();
//   return products.find((product) => product.id === parseInt(id));
// }

// //Metodo para obtener todos los productos
// export function getAllProducts() {
//   const data = fs.readFileSync(dataPath, "utf-8");
//   const products = JSON.parse(data);
//   return products;
// }

// //Metodo para guardar un nuevo producto
// export function saveProduct(name, price) {
//   const products = this.getAllProducts();
//   products.push({ id: products.length + 1, name, price });
//   fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
// }

// //Metodo para eliminar un producto por su ID
// export function deleteProduct(id) {
//   const products = this.getAllProducts();
//   const updatedProducts = products.filter(
//     (product) => product.id !== parseInt(id),
//   );
//   fs.writeFileSync(dataPath, JSON.stringify(updatedProducts, null, 2));
//   return updatedProducts;
// }

// //Metodo para actualizar un producto por su ID
// export function updateProduct(id, name, price) {
//   const products = this.getAllProducts();
//   const productIndex = products.findIndex(
//     (product) => product.id === parseInt(id),
//   );
//   if (productIndex !== -1) {
//     products[productIndex] = { ...products[productIndex], name, price };
//     fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
//   }
// }
