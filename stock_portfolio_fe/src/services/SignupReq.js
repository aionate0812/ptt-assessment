import axios from "./axios";
let usersEndpointBase = "users";

const insertUser = (username, email, token) => {
  return axios.post(usersEndpointBase, { username, email, token });
};

export { insertUser };
