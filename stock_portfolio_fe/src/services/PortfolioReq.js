import axios from "./axios";
let portfolioEndpointBase = "portfolio";
let iexBaseUrl = "https://cloud.iexapis.com/stable/";
let stockEndpoint = "stock/";
let alphaVantageBaseUrl = "https://www.alphavantage.co/";
//API FD7D5GD73EQ6KN0K
//iex pk_86254871c3e5498384d11dfc38f9ce7f

const getTickerPrice = ticker => {
  return axios.get(
    `query?function=GLOBAL_QUOTE&symbol=${ticker}&interval=5min&apikey=FD7D5GD73EQ6KN0K`,
    {
      baseURL: alphaVantageBaseUrl
    }
  );
};

const postOrder = (ticker, amount, price, token) => {
  return axios.post(`${portfolioEndpointBase}/orders/?token=${token}`, {
    ticker,
    amount,
    price
  });
};

export { getTickerPrice, postOrder };
