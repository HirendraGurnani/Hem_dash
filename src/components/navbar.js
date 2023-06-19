import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import hematite from '../assets/imgs/logo/hemtatite.png'
import iexcel from '../assets/imgs/logo/iexcel.png'
import "../assets/css/navbar.css";

function Navbar() {
  return (
    <>
      <AppBar position="static" sx={{ height: 150, backgroundColor: '#ffffff' }}>
        <Container maxWidth="xl">
          <div className="App header">
            <img className="nav_img" src={hematite} alt="Hematite" />
            &emsp;
            <h1 className="title">
              Hematite & iExcel <br />
              Employee Dashboard
            </h1>
            &emsp;
            <img className="nav_img" src={iexcel} alt="Hematite" />
          </div>
        </Container>
      </AppBar>
    </>
  );
}
export default Navbar;
