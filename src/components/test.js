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


class Test extends Component {
  constructor(props) {
    super(props);
    this.calendarRef = React.createRef();
    
    //Managing Present date
    const d = new Date();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    const pres_month = `${year}-${month}`

    //States
    this.state = {
      employee: null,
      index: 1,
      img: { visibility: "hidden" },
      selectedMonth: pres_month,
      events: [],
    };
  }

  remove

  // Replace 'className' with the actual class name of the elements you want to target




  handleInputChange = (event) => {
    this.setState({ index: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    axios.get(baseURL).then((res) => {
      const { data } = res;
      this.setState({ employee: data[this.state.index] });
    });
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

    if (employee.id === 0 || employee.id > 4) {
      dash_form = (
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
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
            type="text"
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
                maxWidth: 250,
                borderRadius: "12px",
                mt: 0,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
            >
              <CardMedia
                component="img"
                height="240"
                width="200"
                image={employee.photo}
                alt={employee.name}
              />
              <CardContent
                sx={{
                  backgroundColor: "#c9b518",
                  fontFamily: "Signika Negative",
                }}
              >
                <Typography gutterBottom variant="h5" component="div">
                  <div>
                    <sup>Name</sup>
                    <br />

                    {employee.name}
                  </div>
                </Typography>
                <hr />
                <Typography gutterBottom variant="h5" component="div">
                  <div>
                    <sup>Employee ID</sup>
                    <br />

                    {employee.emp_id}
                  </div>
                </Typography>
                <hr />
                <Typography
                  className="cont-font"
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  <div>
                    <sup>Contact Number</sup>
                    <br />

                    {employee.cont_number}
                  </div>
                </Typography>
                <hr />
                <Typography
                  className="cont-font"
                  gutterBottom
                  variant="h5"
                  component="div"
                >
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
                width: 920,
                borderRadius: "12px",
                mt: 0,
                backgroundColor: "#c9b518",
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              }}
            >
              <CardContent
                sx={{
                  backgroundColor: "#c9b518",
                  fontFamily: "Signika Negative",
                }}
              >
                <div>
                  <input
                    type="month"
                    value={this.state.selectedMonth}
                    onInput={this.handleMonthChange}
                  />
                  <div className="calendar">
                    <FullCalendar
                      ref={this.calendarRef}
                      plugins={[dayGridPlugin]}
                      initialView="dayGridMonth"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
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

export default Test;
