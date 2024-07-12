import http from "./config";

const workers = {
  create: (data) => http.post("/worker", data),
  get: () => http.get("/workers", { params: { page: 1, limit: 10 } }),
  delete: (id) => http.delete(`/worker/${id}`),
  update: (data) => http.put("/worker", data),
};
export default workers;
