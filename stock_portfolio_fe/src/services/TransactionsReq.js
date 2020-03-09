import axios from "./axios";
let portfolioEndpointBase = "portfolio";
let ordersEndpointBase = "orders";
let iexBaseUrl = "https://cloud.iexapis.com/stable/";
let stockEndpoint = "stock/";
let alphaVantageBaseUrl = "https://www.alphavantage.co/";
//API FD7D5GD73EQ6KN0K
//iex pk_86254871c3e5498384d11dfc38f9ce7f

const getAllAssets = token => {
  return axios
    .get(`${portfolioEndpointBase}/assets/all/?token=${token}`)
    .then(res => res.data);
};

export { getAllAssets };
