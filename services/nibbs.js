const axios = require("axios");

const BASE_URL = "https://nibssbyphoenix.onrender.com";

let token = null;

// 🔐 LOGIN FINTECH (VERY IMPORTANT)
const loginFintech = async () => {
  const res = await axios.post(`${BASE_URL}/api/auth/token`, {
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET
  });

  token = res.data.token;
};

// 🔁 ENSURE TOKEN IS AVAILABLE
const getHeaders = async () => {
  if (!token) {
    await loginFintech();
  }

  return {
    Authorization: `Bearer ${token}`
  };
};


// 🏦 CREATE ACCOUNT (THIS IS WHAT YOU NEED)
const createAccount = async (data) => {
  const headers = await getHeaders();

  return axios.post(`${BASE_URL}/api/account/create`, data, {
    headers
  });
};

module.exports = {
  createAccount
};