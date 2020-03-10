import axios from "./axios";
let portfolioEndpointBase = "portfolio";
let ordersEndpointBase = "orders";
let iexBaseUrl = "https://cloud.iexapis.com/stable/";
let stockEndpoint = "stock/";
let alphaVantageBaseUrl = "https://www.alphavantage.co/";
//API FD7D5GD73EQ6KN0K
//iex pk_86254871c3e5498384d11dfc38f9ce7f

const getTickerPrice = ticker => {
  return axios.get(
    `query?function=GLOBAL_QUOTE&symbol=${ticker}&interval=5min&apikey=U9UH7D48INMOZM6X`,
    {
      baseURL: alphaVantageBaseUrl
    }
  );
};

const postOrder = (ticker, amount, price, token) => {
  return axios.post(`${ordersEndpointBase}/?token=${token}`, {
    ticker,
    amount,
    price
  });
};

const getAssets = token => {
  return axios
    .get(`${portfolioEndpointBase}/assets/?token=${token}`)
    .then(res => res.data);
};

const getAssetsLatestInfo = assets => {
  let assetsCSV = assets.join(",");
  return axios
    .get(
      `${stockEndpoint}market/batch?symbols=${assetsCSV}&types=quote&range=5m&token=pk_86254871c3e5498384d11dfc38f9ce7f`,
      { baseURL: iexBaseUrl }
    )
    .then(res => res.data);
};

const getBalance = token => {
  return axios
    .get(`${portfolioEndpointBase}/balance/?token=${token}`)
    .then(res => res.data);
};

export {
  getTickerPrice,
  postOrder,
  getAssets,
  getAssetsLatestInfo,
  getBalance
};
