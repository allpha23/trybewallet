const getExchangeRates = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  return response.ok ? Promise.resolve(data) : Promise.reject(data);
};

export default getExchangeRates;
