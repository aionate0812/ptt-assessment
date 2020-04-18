import axios from "./axios";
let portfolioEndpointBase = "portfolio";
let ordersEndpointBase = "orders";
let alphaVantageBaseUrl = "https://www.alphavantage.co/";
let alphaVantageAPI = process.env.REACT_APP_ALPHA_VANTAGE_API;

const getTickerPrice = (ticker) => {
  return axios.get(
    `query?function=GLOBAL_QUOTE&symbol=${ticker}&interval=5min&apikey=${alphaVantageAPI}`,
    {
      baseURL: alphaVantageBaseUrl,
    }
  );
};

const postOrder = (ticker, amount, price, token) => {
  return axios.post(`${ordersEndpointBase}/?token=${token}`, {
    ticker,
    amount,
    price,
  });
};

const getAssets = (token) => {
  return axios
    .get(`${portfolioEndpointBase}/assets/?token=${token}`)
    .then((res) => res.data);
};

const getBalance = (token) => {
  return axios
    .get(`${portfolioEndpointBase}/balance/?token=${token}`)
    .then((res) => res.data);
};

export { getTickerPrice, postOrder, getAssets, getBalance };
