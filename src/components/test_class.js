import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

class CalendarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMonth: '',
      events: []
    };
  }

  handleMonthChange = (e) => {
    const selectedMonth = e.target.value;
    this.setState({ selectedMonth }, this.updateCalendar);
  };

  updateCalendar = () => {
    const { selectedMonth } = this.state;
    const [year, month] = selectedMonth.split('-');
    const firstDay = new Date(parseInt(year), parseInt(month) - 1, 1);
    const lastDay = new Date(parseInt(year), parseInt(month), 0);
    const events = [];

    for (let day = 1; day <= lastDay.getDate(); day++) {
      events.push({
        title: `Day ${day}`,
        start: new Date(parseInt(year), parseInt(month) - 1, day)
      });
    }

    this.setState({ events });
  };

  render() {
    return (
      <div>
        <input
          type="month"
          value={this.state.selectedMonth}
          onInput={this.handleMonthChange}
        />
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={this.state.events}
        />
      </div>
    );
  }
}

export default CalendarComponent;
