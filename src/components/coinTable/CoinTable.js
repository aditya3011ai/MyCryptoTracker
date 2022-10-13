import React from "react";
import Axios from "axios";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../App";
import {
  Container,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
} from "@mui/material";
import { LinearProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";


const CoinTable = () => {
  const { currency } = useContext(AppContext);
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setpage] = useState(1);
  const navigate = useNavigate();
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const fetchData = () => {
    Axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    ).then((res) => {
      setCoins(res.data);
    });
  };

  useEffect(
    () =>
      // eslint-disable-next-line
      fetchData(),
    // eslint-disable-next-line
    [currency]
  );

  
  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <div style={{ backgroundColor: "#14161A" }}>
      <Container sx={{ textAlign: "center" }} className="coinTable">
        <Typography
          variant="h4"
          component="h2"
          sx={{
            padding: "20px",
            fontFamily: "Montserrat",
          }}
        >
          Cryptocurrency Pricies
        </Typography>
        <TextField
          id="outlined-basic"
          label="Seach"
          variant="outlined"
          sx={{ width: "100%", mb: "10px" }}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        {!coins ? (
          <LinearProgress
            style={{ backgroundColor: "#F5B001", marginTop: "10px" }}
            color="inherit"
          />
        ) : (
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead style={{ background: "#F5B001" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                        align: head === "Coin" ? "" : "right",
                      }}
                      key={head}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => (
                    <TableRow
                      className="row"
                      key={row.name}
                      onClick={() => navigate(`/coin/${row.id}`)}
                      sx={{
                        "&:hover": {
                          cursor: "pointer",
                          backgroundColor: "rgb(25, 25, 25)",
                        },
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          display: "flex",
                          gap: 15,
                        }}
                      >
                        <img
                          src={row?.image}
                          alt={row.name}
                          height="50"
                          style={{ marginBottom: 10, marginLeft: 10 }}
                        />
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <span
                            style={{
                              textTransform: "uppercase",
                              fontSize: 22,
                            }}
                          >
                            {row.symbol}
                          </span>
                          <span style={{ color: "darkgrey" }}>{row.name}</span>
                        </div>
                      </TableCell>
                      <TableCell align="right" style={{ textAlign: "left" }}>
                        {currency === "inr" ? "₹" : "$"}
                        {numberWithCommas(row.current_price.toFixed(2))}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          color:
                            row.price_change_percentage_24h > 0 > 0
                              ? "rgb(14, 203, 129)"
                              : "red",
                          fontWeight: 500,
                          textAlign: "left",
                        }}
                      >
                        {row.price_change_percentage_24h > 0 && "+"}
                        {row.price_change_percentage_24h.toFixed(2)}%
                      </TableCell>
                      <TableCell align="right" style={{ textAlign: "left" }}>
                        {currency === "inr" ? "₹" : "$"}
                        {numberWithCommas(
                          row.market_cap.toString().slice(0, -6)
                        )}
                        M
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <Pagination
          sx={{
            margin: "20px",
            display: "flex",
            width: "100%",
            justifyContent: "center",
          }}
          count={parseInt((handleSearch()?.length / 10).toFixed(0))}
          onChange={(_, value) => {
            setpage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </div>
  );
};

export default CoinTable;
