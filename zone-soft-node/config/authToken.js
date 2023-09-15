let authToken = "initialValue";

module.exports = {
  getAuthToken: () => authToken,
  setAuthToken: (value) => (authToken = value),
};
