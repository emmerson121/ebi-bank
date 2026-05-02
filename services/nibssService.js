const getTransactionStatus = async (transactionId) => {
  return axios.get(
    `${BASE_URL}/api/transaction/${transactionId}`,
    { headers: getHeaders() }
  );
};

module.exports = {
  loginFintech,
  createAccount,
  nameEnquiry,
  getBalance,
  transfer,
  getTransactionStatus
};