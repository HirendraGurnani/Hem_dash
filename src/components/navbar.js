import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
// import hematite from '../assets/imgs/logo/hemtatite.png'
// import iexcel from '../assets/imgs/logo/iexcel.png'
import "../assets/css/navbar.css";

function Navbar() {
  return (
    <>
      <AppBar position="static" sx={{ height: 80, backgroundColor: "#ffffff" }}>
        <Container maxWidth="xl">
          <div className="App header">
            <h1 className="title">Employee Dashboard</h1>
          </div>
        </Container>
      </AppBar>
    </>
  );
}
export default Navbar;
