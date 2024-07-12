// service/products.js

import http from "./config";

const productsApi = {
  create: (data) => http.post("/product", data),
  get: () => http.get("/products", { params: { page: 1, limit: 10 } }),
  delete: (id) => http.delete(`/product/${id}`),
  get_product: (id) => http.get(`/product/${id}`),
};

export const get_product = productsApi.get_product; // Export get_product function separately

export default productsApi;
