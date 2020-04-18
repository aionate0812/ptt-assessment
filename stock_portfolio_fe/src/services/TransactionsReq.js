import axios from "./axios";
let portfolioEndpointBase = "portfolio";

const getAllAssets = (token) => {
  return axios
    .get(`${portfolioEndpointBase}/assets/all/?token=${token}`)
    .then((res) => res.data);
};

export { getAllAssets };
