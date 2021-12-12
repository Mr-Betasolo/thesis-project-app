import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const signupUser = (newUser) => API.post("/register", newUser);
export const loginUser = (userData) => API.post("/login", userData);
