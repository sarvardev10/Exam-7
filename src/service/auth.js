import http from "./config";
const auth = {
  sign_in: (data) => http.post("/login", data),
  
};
export default auth;
