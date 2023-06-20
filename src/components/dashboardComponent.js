import React, { Component } from "react";
import axios from "axios";
import "../assets/css/dashboard.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

var baseURL = "http://localhost:4000/posts";

class DashboardComponent extends Component {
  constructor(props) {
    super(props);
    this.calendarRef = React.createRef();

    //Managing Present date
    const d = new Date();
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();
    const pres_month = `${year}-${month}`;


    //States
    this.state = {
      employee: null,
      index: 1,
      img: { visibility: "hidden" },
      selectedMonth: pres_month
    };
  }

  // Salary Calculation perhour


  handleInputChange = (event) => {
    this.setState({ index: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    axios.get(baseURL)
         .then((res) => {
                    const { data } = res;
                    this.setState({ employee: data[this.state.index] })}).catch(console.log("No such employee"));
  };

  componentDidMount() {
    this.handleSubmit({ preventDefault: () => {} });
  }

  handleMonthChange = (e) => {
    const selectedMonth = e.target.value;
    this.setState({ selectedMonth }, this.updateCalendar);
  };

  updateCalendar = () => {
    const { selectedMonth } = this.state;
    const [year, month] = selectedMonth.split("-");
    const calendarApi = this.calendarRef.current.getApi();

    if (calendarApi && year && month) {
      calendarApi.gotoDate(`${year}-${month}-01`);
    }
  };

  render() {
    const { employee } = this.state;
    if (!employee) return null;

    let dashboard_comp;
    let dash_form;

    if (employee.id === 0) {
      dash_form = (
        <form onSubmit={this.handleSubmit}>
          <input
            type="number"
            value={this.state.index}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
      );
      dashboard_comp = (
        <span className="dashboard" style={{ color: "red" }}>
          Type a value to see the details of employees
        </span>
      );
    } else {
      dash_form = (
        <form onSubmit={this.handleSubmit}>
          <input
            type="number"
            value={this.state.index}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
      );
      dashboard_comp = (
        <div className="dashboard">
          <div className="card">
            <Card
              sx={{
                maxWidth: 350,
                height: 660,
                borderRadius: "15px",
                borderTopRightRadius: "0px",
                borderBottomRightRadius: "0px",
                mt: -3.7,
                ml:-3.7
              }}
            >
              <CardMedia
                component="img"
                height="290"
                width="400"
                image={employee.photo}
                alt={employee.name}
              />
              <CardContent
                sx={{
                  backgroundColor: "#44b4e6",
                  fontFamily: "Signika Negative",
                  color: "#ffffff",
                }}
              >
                <Typography gutterBottom variant="h6" component="div">
                  <div>
                    <sup>Name</sup>
                    <br />

                    {employee.name}
                  </div>
                </Typography>
                <hr />
                <Typography gutterBottom variant="h6" component="div">
                  <div>
                    <sup>Employee ID</sup>
                    <br />

                    {employee.emp_id}
                  </div>
                </Typography>
                <hr />
                <Typography gutterBottom variant="h6" component="div">
                  <div>
                    <sup>Contact Number</sup>
                    <br />

                    {employee.cont_number}
                  </div>
                </Typography>
                <hr />
                <Typography gutterBottom variant="h6" component="div">
                  <div>
                    <sup>Designation</sup>
                    <br />

                    {employee.designation}
                  </div>
                </Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                width: 900,
                boxShadow: "none",
                mt:0
              }}
            >
              <CardContent
                className="calendar_display"
                sx={{
                  fontFamily: "Signika Negative",
                }}
              >
                <div style={{marginTop: -60}}>
                  <br />
                  <input
                    type="month"
                    value={this.state.selectedMonth}
                    onInput={this.handleMonthChange}
                  />
                  <FullCalendar
                    ref={this.calendarRef}
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                  />
                </div>
              </CardContent>
            <div className="salary_group">
              <div className="total_salary">
                <sup>
                  Total Salary
                  <br />
                </sup>
                  {employee.salary}
              </div>
              <div className="total_salary">
                <sup>
                  Salary based on presence
                  <br />
                </sup>
                  {employee.salary}
              </div>
            </div>
            </Card>
            <br />
          </div>
        </div>
      );
    }

    return (
      <div>
        {dash_form}
        {dashboard_comp}
      </div>
    );
  }
}

export default DashboardComponent;
