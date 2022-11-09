import axios from "axios";

const instance = axios.create({
  baseURL: "https://money-manager-backend-balaji.herokuapp.com",
});

export default instance;
