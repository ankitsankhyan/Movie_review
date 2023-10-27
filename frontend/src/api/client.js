import axios from "axios";
// will help in hosting
const client = axios.create({
  baseURL: "http://localhost:8000/api",
});

export default client;
