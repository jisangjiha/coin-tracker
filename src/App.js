import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [budget, setBudget] = useState(0);
  const [selectedCoin, setSelectedCoin] = useState([]);
  const selectCoin = (event) => {
    setSelectedCoin(event.target.value);
  };
  const clac = (event) => {
    setBudget(event.target.value);
  };
  const reset = () => {
    setBudget(0);
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div>
        <h1>The Coin {loading ? "" : `(${coins.length})`}</h1>
        {loading ? (
          <div>
            <strong>Loading...</strong>
          </div>
        ) : (
          <div>
            <select onChange={selectCoin} required>
              <option disabled defaultValue="">
                Select the Coin!
              </option>
              {coins.map((coin) => (
                <option key={coin.id} value={coin.quotes.USD.price}>
                  {coin.name} ({coin.symbol}): {coin.quotes.USD.price} USD
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      <div>
        <h3>How much do you have?</h3>
        <input
          id="budget"
          type="number"
          placeholder="input and enter"
          value={budget}
          onChange={clac}
        />
        USD
        <h3>You can buy this coin!</h3>
        <input
          id="budget"
          type="number"
          value={Math.round((budget / selectedCoin) * 1000) / 1000}
          disabled
        />
      </div>
      <button onClick={reset}>Reset</button>
    </>
  );
}

export default App;
