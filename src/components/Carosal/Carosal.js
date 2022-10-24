import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "./../../App";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const Carosal = () => {
  const { currency } = useContext(AppContext);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line
    fetchTrendinCoins();
    // eslint-disable-next-line
  }, [currency]);

  let symbol;

  if (currency === "inr") {
    symbol = "₹";
  } else {
    symbol = "$";
  }

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const fetchTrendinCoins = () => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
      )
      .then((res) => {
        setTrending(res.data);
      });
  };
  const items = trending.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;
    return (
      <Link
        to={`/coin/${coin.id}`}
        className="coinContainer"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
          textTransform: "uppercase",
          color: "white",
        }}
      >
        <img
          src={coin?.image}
          alt={coin?.name}
          height={80}
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.name}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });
  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };
  return (
    !items.length ? (
    <CircularProgress style={{ color: "gold" , marginTop:'1rem'}} size={200} thickness={1} />
  ) : 
   ( <AliceCarousel
      mouseTracking
      infinite
      autoPlayInterval={1000}
      animationDuration={1500}
      disableButtonsControls
      disableDotsControls
      responsive={responsive}
      autoPlay
      items={items}
    />)
  );
  
};

export default Carosal;
