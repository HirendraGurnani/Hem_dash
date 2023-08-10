import React, { Component } from "react";
import axios from "axios";
import "../assets/css/dashboard.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

var baseURL = "http://endurable-dog-lion.glitch.me/posts";

class DashboardComponent extends Component {
  constructor(props) {
    super(props);
    this.calendarRef = React.createRef();

    //Managing Present date
    const d = new Date();
    const month = (d.getMonth()).toString().padStart(2, "0");
    const year = d.getFullYear();
    const pres_month = `${year}-${month}`;

    //States
    this.state = {
      employee: null,
      index: 1,
      selectedMonth: pres_month,
      attendance: null,
      presentCount: 0,
      absentCount: 0,
      halfDayCount: 0,
      salary: 0,
      salary_acc_present: 0,
      salary_acc_absent: 0,
      salary_acc_halfDay: 0,
    };
  }

  handleInputChange = (event) => {
    this.setState({ index: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(baseURL)
      .then((res) => {
        const { data } = res;
        const employee = data[this.state.index];
        const attendance = employee.attendance;

        const presentCount = attendance.filter(
          (entry) => entry.status === "present"
        ).length;
        const absentCount = attendance.filter(
          (entry) => entry.status === "absent"
        ).length;
        const halfDayCount = attendance.filter(
          (entry) => entry.status === "half_day"
        ).length;

        //Salary Calculation
        const salary = employee.salary;
        let salary_per_hour = salary / 234;
        let salary_per_day = salary_per_hour * 9;
        let salary_acc_present = (salary_per_day * presentCount).toFixed(0);
        let salary_acc_absent =
          salary -
          salary_acc_present -
          (salary_per_day * halfDayCount).toFixed(0);
        let salary_acc_halfDay = ((salary_per_day / 2) * halfDayCount).toFixed(
          0
        );
        //state manipulation
        this.setState({
          employee: employee,
          attendance: attendance,
          presentCount: presentCount,
          absentCount: absentCount,
          halfDayCount: halfDayCount,
          salary: salary,
          salary_acc_present: salary_acc_present,
          salary_acc_absent: salary_acc_absent,
          salary_acc_halfDay: salary_acc_halfDay,
        });
      })
      .catch((error) => console.log(error));
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
    //destructuring state
    const {
      employee,
      halfDayCount,
      presentCount,
      absentCount,
      salary,
      salary_acc_present,
      salary_acc_absent,
      salary_acc_halfDay,
    } = this.state;

    if (!employee) return null;

    //conditional rendering
    let dashboard_comp;

    if (employee.id === 0) {
      dashboard_comp = (
        <div>
          <form onSubmit={this.handleSubmit}>
            <input
              type="number"
              value={this.state.index}
              onChange={this.handleInputChange}
            />
            <button type="submit">Submit</button>
          </form>
          <span className="dashboard" style={{ color: "red" }}>
            Type a value to see the details of employees
          </span>
        </div>
      );
    } else {
      dashboard_comp = (
        <div className="dashboard">
          <div className="card">
            <Card
              sx={{
                maxWidth: 290,
                height: 660,
                borderRadius: "15px",
                borderTopRightRadius: "0px",
                borderBottomRightRadius: "0px",
                mt: -3.7,
                ml: -3.7,
              }}
            >
              <CardMedia
                component="img"
                height="250"
                width="350"
                image={employee.photo}
                alt={employee.name}
              />
              <CardContent
                sx={{
                  backgroundColor: "#0e4d63",
                  fontFamily: "Signika Negative",
                  color: "#ffffff",
                  width: 350,
                  height: 370,
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
                mt: 0,
              }}
            >
              <form onSubmit={this.handleSubmit}>
                <input
                  type="number"
                  value={this.state.index}
                  onChange={this.handleInputChange}
                />
                <button type="submit">Submit</button>
              </form>
              <CardContent
                className="calendar_display"
                sx={{
                  fontFamily: "Signika Negative",
                }}
              >
                <div style={{ marginTop: 0 }}>
                  <input
                    type="month"
                    value={this.state.selectedMonth}
                    onInput={this.handleMonthChange}
                  />
                  <br />
                  <FullCalendar
                    ref={this.calendarRef}
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                  />
                </div>
              </CardContent>
            </Card>
            <Card
              sx={{
                maxWidth: 350,
                height: 660,
                borderRadius: "15px",
                borderTopLeftRadius: "0px",
                borderBottomLeftRadius: "0px",
                mt: -3.7,
                mr: -3.75,
              }}
            >
              <CardContent
                sx={{
                  backgroundColor: "#0e4d63",
                  fontFamily: "Signika Negative",
                  color: "#ffffff",
                  height: 620,
                  width: 350,
                }}
              >
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{ mt: 3.5 }}
                >
                  <div>
                    <sup>No. of Days Present</sup>
                    <br />
                    {presentCount}
                  </div>
                </Typography>
                <hr />
                <Typography gutterBottom variant="h6" component="div">
                  <div>
                    <sup>Half-Days Taken</sup>
                    <br />
                    {halfDayCount}
                  </div>
                </Typography>
                <hr />
                <Typography gutterBottom variant="h6" component="div">
                  <div>
                    <sup>Leaves Taken</sup>
                    <br />
                    {absentCount}
                  </div>
                </Typography>
                <hr />
                <Typography gutterBottom variant="h6" component="div">
                  <div>
                    <sup>Total Salary</sup>
                    <br />
                    Rs. {salary} /-
                  </div>
                </Typography>
                <hr />
                <Typography gutterBottom variant="h6" component="div">
                  <div>
                    <sup>Salary Paid For Presence</sup>
                    <br />
                    Rs. {salary_acc_present} /-
                  </div>
                </Typography>
                <hr />
                <Typography gutterBottom variant="h6" component="div">
                  <div>
                    <sup>Salary Not Paid For Absence</sup>
                    <br />
                    Rs. {salary_acc_absent} /-
                  </div>
                </Typography>
                <hr />
                <Typography gutterBottom variant="h6" component="div">
                  <div>
                    <sup>Salary Paid For Half-Day</sup>
                    <br />
                    Rs. {salary_acc_halfDay} /-
                  </div>
                </Typography>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }

    //returning the component

    return <div>{dashboard_comp}</div>;
  }
}

export default DashboardComponent;
