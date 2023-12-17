import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
// import "../assets/css/navbar.css";

function Navbar() {
  return (
    <>
      <AppBar
        position="static"
        sx={{
          height: 80,
          backgroundColor: "transparent",
          boxShadow: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          fontSize: "25px",
          color: "#237ba1",
        }}
      >
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
