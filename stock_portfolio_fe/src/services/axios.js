import Axios from "axios";
let baseURL = "https://frozen-eyrie-54800.herokuapp.com/";
let axios = Axios.create({ baseURL });
export default axios;
