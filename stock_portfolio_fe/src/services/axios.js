import Axios from "axios";
let baseURL = "http://localhost:8002/";
let axios = Axios.create({ baseURL });
export default axios;
