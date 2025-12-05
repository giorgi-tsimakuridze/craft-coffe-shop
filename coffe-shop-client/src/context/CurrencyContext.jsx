import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState("GEL");
  const [exchangeRate, setExchangeRate] = useState(1);
  const [loadingRate, setLoadingRate] = useState(true);

  useEffect(() => {
    axios
      .get("https://api.exchangerate-api.com/v4/latest/USD")
      .then((res) => {
        setExchangeRate(res.data.rates.GEL);
        setLoadingRate(false);
      })
      .catch(() => {
        setExchangeRate(2.7);
        setLoadingRate(false);
      });
  }, []);

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === "GEL" ? "USD" : "GEL"));
  };

  const convertPrice = (priceInGEL) => {
    if (loadingRate) return "...";

    if (currency === "GEL") {
      return `${priceInGEL.toFixed(2)} ₾`;
    } else {
      const priceUSD = priceInGEL / exchangeRate;
      return `${priceUSD.toFixed(2)} $`;
    }
  };

  return (
    <CurrencyContext.Provider
      value={{ currency, toggleCurrency, convertPrice, loadingRate }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
