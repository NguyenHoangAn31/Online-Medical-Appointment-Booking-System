import React, { useEffect, useRef, useState } from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import { findAllWorkDay } from '../../../../services/API/scheduleService';
// import 'react-calendar/dist/Calendar.css';


function ManageSchedule() {
  const [value, setValue] = useState(new Date());
  const [workDay, setWorkDay] = useState([]);
  const [calendarRendered, setCalendarRendered] = useState(false);
  const navigate = useNavigate();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!isFirstRender.current) {
      setValue(new Date());
    } else {
      isFirstRender.current = false;
    }
  }, [calendarRendered]);


  useEffect(() => {
    const buttonList = document.querySelectorAll('.react-calendar__navigation>button');
    buttonList.forEach(button => {
      button.addEventListener('click', () => {
        setCalendarRendered(false);
      });
    });
    loadWorkDay();
  }, []);

  const loadWorkDay = async () => {
    setWorkDay(await findAllWorkDay())
  };


  const formattedDates = workDay.map(dateArr => {
    const dateString = dateArr[0];
    const dateObj = new Date(dateString);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return dateObj.toLocaleDateString('en-US', options);
  });


  useEffect(() => {
    const renderedDates = document.querySelectorAll('.react-calendar__month-view__days__day abbr');
    const today = new Date();

    renderedDates.forEach((dateElement) => {
      const dateValue = dateElement.getAttribute('aria-label');
      const buttonElement = dateElement.parentElement;

      if (dateValue) {
        const date = new Date(dateValue);
        if (date >= today) {
          buttonElement.style.color = 'white';
        }
      }
    });
  }, [value, workDay]);




  const handleChange = (newValue) => {
    setValue(newValue);
    const dateObj = new Date(newValue);
    const currentDate = new Date();
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    let status = '';
    const formattedDate = `${year}-${month}-${day}`;

    if (dateObj.toDateString() === currentDate.toDateString()) {
      status = 'incoming';
    } else if (dateObj < currentDate) {
      status = 'completed';
    } else {
      status = 'upcoming';
    }

    navigate(`/dashboard/admin/manage-schedule/detail?day=${formattedDate}&status=${status}`);
  };




  return (
    <div className='calendar' style={{ minWidth: 1138 }}>
      <Calendar onChange={handleChange} value={value} onActiveStartDateChange={() => setCalendarRendered(true)} />
    </div>

  );
}

export default ManageSchedule;
