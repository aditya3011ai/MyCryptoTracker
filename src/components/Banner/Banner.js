import React from "react";
import "react-alice-carousel/lib/alice-carousel.css";
import "./banner.css";
import Typography from "@mui/material/Typography";
import Carosal from "../Carosal/Carosal";

const Banner = () => {
  return (
    <div className="background" >
      <div
        style={{
          height: "400px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h2"
          component="h2"
          sx={{
            fontFamily: "Montserrat",
            fontWeight: "700",
            textAlign: "center",
          }}
          mt={3}
        >
          Crypto Tracker
        </Typography>
        <Typography
          variant="p"
          component="p"
          sx={{ fontFamily: "Montserrat", fontWeight: "400", color: "#D8D8D8" }}
          mt={2}
        >
          Keep tack of your favorite Crypto Currency
        </Typography>
        
        <Carosal />
      </div>
    </div>
  );
};

export default Banner;
