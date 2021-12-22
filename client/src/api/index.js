import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8081/users" });

export const signupUser = (newUser) => API.post("/signup", newUser);
export const loginUser = (userData) => API.post("/login", userData);
