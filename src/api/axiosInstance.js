// src/api/axiosInstance.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // adapte selon ton environnement
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;