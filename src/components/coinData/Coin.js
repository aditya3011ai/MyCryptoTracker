import React from "react";
import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../App";
import axios from "axios";
import "./coin.css";
import Typography from "@mui/material/Typography";
import { LinearProgress } from "@mui/material";
import ReactHtmlParser from "react-html-parser";
import Chart from "./Chart";
import { Container } from "@mui/material";
import "./coin.css";

const Coin = () => {
  const { id } = useParams();
  const { currency } = useContext(AppContext);
  const [coin, setcoin] = useState("");

  useEffect(() => {
    // eslint-disable-next-line
    fetchCoin();
    // eslint-disable-next-line
  }, [currency]);

  const fetchCoin = () => {
    axios.get(`https://api.coingecko.com/api/v3/coins/${id}`).then((res) => {
      setcoin(res.data);
    });
  };
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <>
      {!coin ? (
        <LinearProgress
          style={{ backgroundColor: "#F5B001" }}
          color="inherit"
        />
      ) : (
        <Container
          maxWidth="false"
          sx={{
            display: "flex",
            backgroundColor: "#14161a",
            flexDirection: "row",
          }}
          className="container"
        >
          <div
            className="coinData"
            style={{
              width: "30%",
              borderWidth: "0 2px 0 0",
              borderStyle: "solid",
              marginTop: "2rem",
              textAlign: "center",
              padding: "1rem",
            }}
          >
            <img
              src={coin?.image?.large}
              alt={coin?.name}
              className="coinImg"
              height={200}
            />

            <Typography
              variant="h3"
              component="h2"
              style={{
                fontFamily: "Montserrat",
                fontWeight: "700",
                margin: "1rem 0",
              }}
            >
              {coin?.name}
            </Typography>
            <Typography
              variant="p"
              component="p"
              sx={{
                textAlign: "justify",
                fontWeight: "400",
                padding: "0 20px 15px 20px",
              }}
              className="description"
            >
              {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
            </Typography>
            <div
              style={{
                textAlign: "left",
                padding: "10px 25px 25px 25px",
              }}
              className="headings"
            >
              <Typography
                variant="h6"
                component="h6"
                sx={{
                  fontWeight: "600",
                  fontFamily: "Montserrat",
                  marginBottom: "1rem",
                  marginRight: "10px",
                  fontSize: { md: "20px", sm: "16px" },
                }}
              >
                Rank : {coin?.market_cap_rank}
              </Typography>
              <Typography
                variant="h6"
                component="h6"
                sx={{
                  fontWeight: "700",
                  fontFamily: "Montserrat",
                  marginBottom: "1rem",
                  marginRight: "10px",
                  fontSize: { md: "20px", sm: "16px" },
                }}
              >
                Current Price : {currency === "inr" ? "₹ " : "$ "}
                {currency === "usd"
                  ? numberWithCommas(
                      coin?.market_data?.current_price?.usd.toFixed(2)
                    )
                  : numberWithCommas(
                      coin?.market_data?.current_price?.inr.toFixed(2)
                    )}
              </Typography>
              <Typography
                variant="h6"
                component="h6"
                sx={{
                  fontWeight: "600",
                  fontFamily: "Montserrat",
                  marginBottom: "1rem",
                  marginRight: "10px",
                  fontSize: { md: "20px", sm: "16px" },
                }}
              >
                Market Cap : {currency === "inr" ? "₹ " : "$ "}
                {numberWithCommas(
                  coin?.market_data?.market_cap?.usd
                    .toFixed(2)
                    .toString()
                    .slice(0, -6)
                )}
                M
              </Typography>
            </div>
          </div>

          <div
            style={{
              width: "70%",
              margin: "auto",
              padding: "20px",
            }}
            className="chart"
          >
            <Chart coin={coin} />
          </div>
        </Container>
      )}
    </>
  );
};

export default Coin;
