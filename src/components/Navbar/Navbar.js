import React from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import { FormControl} from "@mui/material";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Container } from "@mui/system";
import { useContext } from "react";
import { AppContext } from './../../App';

const Navbar = () => {
  const { setCurrency } = useContext(AppContext);

  const changeCuurency = (e)=>{
    setCurrency(e.target.value);
  }
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#14161A", boxShadow: "0 2px 0 0 2px #14161A" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component="a"
            href="/"
            sx={{
              ml: "2rem",
              display: "inline-block",
              fontWeight: 700,
              my: "1rem",
              fontSize: "20px",
              color: "gold",
              fontFamily: "Montserrat",
              textDecoration: "none",
              flex: "1",
              cursor: "pointer",
            }}
          >
            Crypto Tracker
          </Typography>

          <FormControl
            sx={{ minWidth: 90, margin: "5px 1.5vw 5px 0" }}
            variant="outlined"
          >
            <Select autoWidth defaultValue={"usd"} onChange={changeCuurency}>
              <MenuItem value={"usd"}> USD</MenuItem>
              <MenuItem value={"inr"}>INR</MenuItem>
            </Select>
          </FormControl>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
// https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&ids=bitcoin 
export default Navbar;
