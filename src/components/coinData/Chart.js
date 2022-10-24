import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../App";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import "./coin.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import styled from "@emotion/styled";
import { Button } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const Chart = ({ coin }) => {
  const [chartdata, setchartdata] = useState([]);
  const [days, setdays] = useState(1);
  const { currency } = useContext(AppContext);
  const GoldenButton = styled(Button)({
    width: "10rem",
    margin: "5px",
    height: "50px",
    fontWeight: "600",
    border: "1px solid gold",
    borderRadius: "7px",
    minFontSize: "12px",
    "&:hover": {
      backgroundColor: "gold",
      color: "black",
    },
  });

  const fetchChartData = () => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=${currency}&days=${days}`
      )
      .then((res) => {
        setchartdata(res.data.prices);
      });
  };

  useEffect(
    () => {
      // eslint-disable-next-line
      fetchChartData();
    },
    // eslint-disable-next-line
    [currency, days]
  );
  return (
    <div>
      {!chartdata ? (
        <CircularProgress style={{ color: "gold" }} thickness={1} size={250} />
      ) : (
        <>
          <Line
            data={{
              labels: chartdata.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),

              datasets: [
                {
                  data: chartdata.map((coin) => coin[1]),
                  label: `Price in Past ${days} Days in ${currency}`,
                  borderColor: "gold",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
        </>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "2rem",
        }}
        className="buttons"
      >
        <GoldenButton
          sx={{
            backgroundColor: days === 1 ? "gold" : "",
            color: days === 1 ? "black" : "white",
          }}
          onClick={() => setdays(1)}
        >
          24 Hours
        </GoldenButton>
        <GoldenButton
          sx={{
            color: days === 30 ? "black" : "white",
            backgroundColor: days === 30 ? "gold" : "",
          }}
          onClick={() => setdays(30)}
        >
          1 Month
        </GoldenButton>
        <GoldenButton
          sx={{
            fontSize: "13px",
            backgroundColor: days === 90 ? "gold" : "",
            color: days === 90 ? "black" : "white",
          }}
          onClick={() => {
            setdays(90);
          }}
        >
          3 Months
        </GoldenButton>
        <GoldenButton
          sx={{
            backgroundColor: days === 365 ? "gold" : "",
            color: days === 365 ? "black" : "white",
          }}
          onClick={() => setdays(365)}
        >
          1 Year
        </GoldenButton>
        <GoldenButton
          sx={{
            backgroundColor: days === 1826 ? "gold" : "",
            color: days === 1826 ? "black" : "white",
          }}
          onClick={() => setdays(1826)}
        >
          5 Years
        </GoldenButton>
      </div>
    </div>
  );
};

export default Chart;
