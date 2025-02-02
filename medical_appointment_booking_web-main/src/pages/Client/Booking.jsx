// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useContext } from 'react'
import { MdSearch, MdOutlineStarPurple500, MdCalendarMonth, MdOutlinePhoneInTalk, MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { BiCommentDots, BiSolidVideo } from "react-icons/bi";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css';
import 'bootstrap-datepicker';
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import $ from 'jquery';
import { startOfWeek, addDays, format } from 'date-fns';
import getUserData from '../../route/CheckRouters/token/Token'
import Payment from '../../components/Card/Payment';
import { formatDateFromJs } from '../../ultils/formatDate';
import { UserContext } from '../../components/Layouts/Client';
import Swal from 'sweetalert2';

const Booking = () => {
  const slots = [
    {
      "id": 1,
      "startTime": "08:00",
    },
    {
      "id": 2,
      "startTime": "08:30",
    },
    {
      "id": 3,
      "startTime": "09:00",
    },
    {
      "id": 4,
      "startTime": "09:30",
    },
    {
      "id": 5,
      "startTime": "10:00",
    },
    {
      "id": 6,
      "startTime": "10:30",
    },
    {
      "id": 7,
      "startTime": "11:00",
    },
    {
      "id": 8,
      "startTime": "11:30",
    },
    {
      "id": 9,
      "startTime": "13:00",
    },
    {
      "id": 10,
      "startTime": "13:30",
    },
    {
      "id": 11,
      "startTime": "14:00",
    },
    {
      "id": 12,
      "startTime": "14:30",
    },
    {
      "id": 13,
      "startTime": "15:00",
    },
    {
      "id": 14,
      "startTime": "15:30",
    },
    {
      "id": 15,
      "startTime": "16:00",
    },
    {
      "id": 16,
      "startTime": "16:30",
    },
    {
      "id": 17,
      "startTime": "18:00",
    },
    {
      "id": 18,
      "startTime": "18:30",
    },
    {
      "id": 19,
      "startTime": "19:00",
    },
    {
      "id": 20,
      "startTime": "19:30",
    },
    {
      "id": 21,
      "startTime": "20:00",
    },
    {
      "id": 22,
      "startTime": "20:30",
    },
    {
      "id": 23,
      "startTime": "21:00",
    },
    {
      "id": 24,
      "startTime": "21:30",
    }
  ]
  const { currentUser } = useContext(UserContext);
  const currentDate = new Date();
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getMonthName = (monthNumber) => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    // monthNumber - 1 vì mảng bắt đầu từ 0, trong khi tháng bắt đầu từ 1
    return monthNames[monthNumber - 1];
  }
  // Lấy tên của tháng hiện tại
  const currentMonthI = months[currentDate.getMonth()];
  // Lấy năm hiện tại
  const currentYearI = currentDate.getFullYear();
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [activeDoctorIndex, setActiveDoctorIndex] = useState(0);
  const [activeHourIndex, setActiveHourIndex] = useState('');
  const [services, setServices] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [doctor, setDoctor] = useState([]);
  const [day, setDay] = useState(`${currentMonthI}, ${currentYearI}`);
  const [days, setDays] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const [doctorId, setDoctorId] = useState();
  const [patientId, setPatientId] = useState();
  const [patient, setPatient] = useState();
  const [doctorForSearch, setDoctorForSearch] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [scheduledoctorId, setScheduledoctorId] = useState('');
  const [slotName, setSlotName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  // Khởi tạo state cho ngày

  const [daySelected, setDaySelected] = useState('');
  const loadDepartments = async () => {
    const fetchedDepartments = await axios.get('https://medical-appointment-booking-api-production.up.railway.app/api/department/all');
    setServices(fetchedDepartments.data);
  };


  const loadDoctors = async () => {
    const fetchedDoctors = await axios.get('https://medical-appointment-booking-api-production.up.railway.app/api/doctor/all');
    setDoctors(fetchedDoctors.data);
    setDoctorForSearch(fetchedDoctors.data);
    const id = fetchedDoctors.data[0].id;
    try {
      const fetchedDoctor = await axios.get('https://medical-appointment-booking-api-production.up.railway.app/api/doctor/' + id);
      setDoctor(fetchedDoctor.data)
    } catch (error) { /* empty */ }
  };



  const loadDayDefaults = () => {
    const ngayHienTai = new Date(); // Ngày hiện tại
    ngayHienTai.setDate(ngayHienTai.getDate());

    const ngayDauTuan = startOfWeek(ngayHienTai); // Ngày đầu tiên của tuần hiện tại
    const daysOfWeekNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const cacNgayTrongTuan = [];
    let activeDayIndex = -1;
    for (let i = 0; i < 14; i++) {
      const ngay = addDays(ngayDauTuan, i);
      const ngayOfMonth = ngay.getDate(); // Lấy ngày trong tháng
      const thang = ngay.getMonth() + 1; // Tháng tính từ 0, nên cần cộng thêm 1
      const nam = ngay.getFullYear(); // Năm
      // Thứ, 0 là Chủ Nhật, 1 là Thứ Hai, ..., 6 là Thứ Bảy
      const tenThu = daysOfWeekNames[ngay.getDay()];
      cacNgayTrongTuan.push({ ngayOfMonth, thang, nam, tenThu, i });
      if (ngay.toDateString() === ngayHienTai.toDateString()) {
        activeDayIndex = i;
      }
    }
    setActiveDayIndex(activeDayIndex);
    setDays(cacNgayTrongTuan);

  }

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.floor(days.length / 7) - 1));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };
  const startIndex = currentPage * 7;
  const endIndex = startIndex + 7;
  const visibleDays = days.slice(startIndex, endIndex);


  // thực hiện load dữ liệu 1 lần 
  useEffect(() => {
    $('#datepicker').datepicker({
      format: "MM, yyyy", // Định dạng hiển thị chỉ có tháng và năm
      startView: "months", // Bắt đầu hiển thị từ view tháng
      minViewMode: "months", // Chế độ hiển thị tối thiểu là tháng
      autoclose: true // Tự động đóng khi chọn xong
    });
    loadDoctors();
    loadDepartments();
    loadDayDefaults();
    fetchApi();
  }, []);


  const fetchApi = async () => {
    try {
      if (getUserData() != null) {
        const result = await axios.get(`https://medical-appointment-booking-api-production.up.railway.app/api/patient/${getUserData().user.id}`);
        setPatient(result.data);
        setPatientId(result.data.id);
      }
    } catch (error) { /* empty */ }
  }

  const handleSearch = async (event) => {
    const term = event.target.value;
    if (term.trim() !== '') {
      const filtered = doctors.filter(doctor =>
        doctor.fullName.toLowerCase().includes(term.toLowerCase())
      );
      setDoctorForSearch(filtered);
    } else {
      setDoctorForSearch(doctors);
    }
  };


  // Hàm tìm department của bác sỹ khám bệnh
  const handleServiceClick = async (index) => {
    setActiveDoctorIndex(0);
    setSchedules([]);
    setActiveHourIndex('');
    setDoctorId(null)
    setSlotName('')
    setActiveIndex(index);
    try {
      const fetchedDoctorDepartment = await axios.get('https://medical-appointment-booking-api-production.up.railway.app/api/doctor/related-doctor/' + index);
      setDoctorForSearch(fetchedDoctorDepartment.data)
    } catch (error) { /* empty */ }
  }

  function stripTime(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }





  function parseTimeString(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
  }

  const formatDate = (index) => {
    return format(Date(index), 'dd MMMM, yyyy')
  }




  const handleDoctorClick = async (index) => {
    var defaultDate = new Date();
    if (daySelected == '') {
      setDaySelected(formatDateFromJs(defaultDate))
    }
    setDoctorId(index);
    setSlotName('')
    setActiveDoctorIndex(index);
    setActiveHourIndex('');
    try {
      const fetchedDoctor = await axios.get('https://medical-appointment-booking-api-production.up.railway.app/api/doctor/' + index);
      setDoctor(fetchedDoctor.data)
      const fetchedSlotByDoctorAndDay = await axios.get(`https://medical-appointment-booking-api-production.up.railway.app/api/schedules/doctor/${index}/day/${daySelected == '' ? formatDateFromJs(defaultDate) : daySelected}`);
      if (fetchedSlotByDoctorAndDay.status === 200) {
        setSchedules(fetchedSlotByDoctorAndDay.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setSchedules([]);
      } else {
        console.error('An error occurred:', error);
      }
    }
  }

  const handleDayClick = async (index, day01) => {
    setDay(`${getMonthName(day01.thang)}, ${day01.nam}`)
    if (doctorId == null) {
      Swal.fire({
        title: 'Error!',
        text: 'Please choose a doctor!',
        icon: 'warning',
        confirmButtonText: 'Ok'
      });
      return;
    }
    setActiveDayIndex(index);
    const dayvalue = `${day01.nam}-${String(day01.thang).padStart(2, '0')}-${String(day01.ngayOfMonth).padStart(2, '0')}`;
    setDaySelected(dayvalue);
    const data = {
      doctorId: doctorId,
      day: dayvalue
    }
    try {
      const fetchedSlotByDoctorAndDay = await axios.get(`https://medical-appointment-booking-api-production.up.railway.app/api/schedules/doctor/${data.doctorId}/day/${data.day}`);
      if (fetchedSlotByDoctorAndDay.status === 200) {
        setSchedules(fetchedSlotByDoctorAndDay.data)
      } else if (fetchedSlotByDoctorAndDay.status === 404) {
        setSchedules([])
      } else {
        // eslint-disable-next-line no-undef
        console.error('An error occurred:', error);
      }

    } catch (error) {
      if (error.response && error.response.status === 404) {
        setSchedules([]);
      } else {
        console.error('An error occurred:', error);
      }
    }
    setSlotName('')
    setActiveHourIndex('');
  }

  const isSlotAvailable = (slot) => {
    const foundSlot = schedules.find(slots => slots.startTime === slot);
    // lấy thời gian hiện tại
    const now = new Date();
    const currentTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes());

    if (foundSlot) {
      const slotTime = parseTimeString(foundSlot.startTime);
      if (foundSlot.status === 1 && (slotTime > currentTime || (stripTime(now) < stripTime(new Date(daySelected) || stripTime(now) > stripTime(new Date(daySelected)))))) {
        // if(foundSlot.status === 1){
        return { status: 'true', scheduledoctorId: foundSlot.scheduledoctorId };
      } else if (foundSlot.status === 0) {
        return { status: 'booked' };
      } else {
        return { status: 'false' };
      }
    } else {
      return { status: 'false' };
    }
  };




  const handleSlotClick = async (slot_Name, slot_Id, scheduledoctor_Id, dayCurrent, patientId) => {
    const hourCurrent = new Date().getHours();
    const dateCurrent = new Date().getDate();
    const monthCurrent = new Date().getMonth() + 1;
    const yearCurrent = new Date().getFullYear();
    const [yearsStr, monthsStr, daysStr] = dayCurrent.split('-');
    const [hoursStr] = slot_Name.split(':');
    const dayInt = parseInt(daysStr, 10);
    const monthInt = parseInt(monthsStr, 10);
    const yearInt = parseInt(yearsStr, 10);
    const hoursInt = parseInt(hoursStr, 10);
    const currentDate = new Date(yearCurrent, monthCurrent - 1, dateCurrent, hourCurrent);
    const selectedDate = new Date(yearInt, monthInt - 1, dayInt, hoursInt);
    if (patientId == undefined) {
      Swal.fire({
        text: 'Please login before booking a doctor!',
        icon: 'info',
        confirmButtonText: 'Ok'
      });
    }
    else if (selectedDate - currentDate > (2 * 60 * 60 * 1000)) {
      try {
        const response = await axios.get(`https://medical-appointment-booking-api-production.up.railway.app/api/appointment/check-schedule-for-patient/${doctorId}/${patientId}/${dayCurrent}`);
        if (response.data) {
          Swal.fire({
            text: 'You have booked this doctor today. Please choose another doctor!',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
          return;
        } else {
          try {
            const result01 = await axios.get(`https://medical-appointment-booking-api-production.up.railway.app/api/appointment/check-schedule-for-patient-clinic/check/${patient.id}/${daySelected}/${slot_Name}`);
            if (result01.data) {
              Swal.fire({
                text: `You have another schedule at ${slot_Name}. Please book another time!`,
                icon: 'error',
                confirmButtonText: 'Ok'
              });
              return;

            } else {
              setActiveHourIndex(slot_Id);
              setSlotName(slot_Name);
              setScheduledoctorId(scheduledoctor_Id);
            }
          } catch (error) { /* empty */ }
        }

      } catch (error) { /* empty */ }
    } else {
      Swal.fire({
        text: 'Please book an appointment two hours in advance!',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }

  }


  const handleSubmitBook = () => {
    if (!currentUser) {
      Swal.fire({
        text: 'Please log in to use this function to book an appointment!',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return;
    }
    else if (!doctorId) {
      Swal.fire({
        text: 'Please choose a doctor ',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return;
    }
    else if (slotName == '') {
      Swal.fire({
        text: 'Please choose a slot',
        icon: 'info',
        confirmButtonText: 'Ok'
      });
      return;
    }
    const data = {
      doctorId: doctorId,
      doctorTitle: doctor.title,
      doctorName: doctor.fullName,
      departmentName: doctor.department.name,
      partientId: patient.id,
      partientName: patient.fullName,
      image: patient.image,
      scheduledoctorId: scheduledoctorId,
      clinicHours: slotName,
      price: doctor.price,
      medicalExaminationDay: daySelected,
      payment: '',
      status: 'waiting',
    }
    setModalData(data);
    setIsModalOpen(true);

  }

  // eslint-disable-next-line react/prop-types
  const RatingStar = ({ rating }) => {
    const fullStar = '★';
    const emptyStar = '☆';

    const stars = Array(5)
      .fill(emptyStar)
      .map((star, index) => index < rating ? fullStar : emptyStar);

    return (
      <div>
        {stars.join(' ')}
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: doctorForSearch.length > 3,
    slidesToShow: 2,
    slidesToScroll: 2
  };


  return (
    <section className='container'>
      <div className="row">
        <div className="col-md-7 col-12">
          <div className="col-md-12">
            <div className="row">
              <div className="col-12">
                <h3 className='booking_title'>Making appointment</h3>
              </div>
              <div className="col-12">
                <div className="booking__catagory">
                  <h4 className='title'>Choose category</h4>
                  <div className='services'>
                    {services.map((item) => (
                      <div key={item.id} className={`service__item ${activeIndex === item.id ? 'active' : ''}`} onClick={() => handleServiceClick(item.id)}>
                        <img src={"https://medical-appointment-booking-api-production.up.railway.app/images/department/" + item.icon} alt="" className='service__item-img' />
                        <div className='service__item-name'>{item.name}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-12">
                  <div className='booking__search'>
                    <MdSearch className='booking__search-icon' />
                    <input type="text" placeholder='Search doctor' className='booking__search-input'
                      name='searchName'
                      onChange={handleSearch} />
                  </div>
                </div>
                <div className="col-12">
                  <div className="booking__list">
                    <div className="title">Choose doctor</div>
                    <div className="card__body">
                      <Slider {...settings}>
                        {doctorForSearch.map((item) => (
                          <div className={`card__doctor ${activeDoctorIndex === item.id ? 'active' : ''}`} key={item.id} onClick={() => handleDoctorClick(item.id)}>
                            <div className='doctr_image'>
                              <img src={"https://medical-appointment-booking-api-production.up.railway.app/images/doctors/" + item.image} alt="" className='img-fluid' />
                            </div>
                            <div className='doctr_info'>
                              <div>
                                <div className='name'>{item.title} {item.fullName}</div>
                                <div className='department'>{item.department?.name}</div>
                              </div>
                              <div className='icon'><MdOutlineStarPurple500 className='icon_item' /> {item.rate}</div>
                            </div>
                          </div>
                        )
                        )}
                      </Slider>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="booking__date">
                    <div className='header_date'>
                      <div className="title">Choose date and time</div>
                      <div className="date_choose_input">
                        <div className="input__group">
                          <input type="text" className="input_date" id="datepicker"
                            value={day} onChange={(e) =>
                              setDay(e.target.value)} />
                          <span className="input_group-text">
                            <MdCalendarMonth />
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className='body_day align-items-center'>
                      <button onClick={handlePreviousPage} disabled={currentPage === 0}>
                        <MdArrowBackIos />
                      </button>
                      {visibleDays.map((day, i) => {
                        // Tính ngày hiện tại
                        const currentDate = new Date().getDate();
                        const currentMonth = new Date().getMonth() + 1; // Lấy tháng hiện tại (tháng bắt đầu từ 0 nên cộng thêm 1)
                        const currentYear = new Date().getFullYear();
                        const dayYear = day.nam; // Thay thế bằng trường dữ liệu thích hợp nếu có
                        const dayMonth = day.thang; // Thay thế bằng trường dữ liệu thích hợp nếu có
                        const dayDate = day.ngayOfMonth;

                        const isDisabled01 = (dayYear < currentYear) ||
                          (dayYear === currentYear && dayMonth < currentMonth) ||
                          (dayYear === currentYear && dayMonth === currentMonth && dayDate < currentDate);
                        return (
                          <div
                            key={i}
                            className={`day_item ${activeDayIndex === day.i ? 'active' : ''}`}
                            onClick={isDisabled01 ? null : () => handleDayClick(day.i, day)}
                            style={{ opacity: isDisabled01 ? 0.5 : 1, cursor: isDisabled01 ? 'not-allowed' : 'pointer' }}
                          >
                            <span className='day-title'>{day.tenThu}</span>
                            <span className='day-number'>{day.ngayOfMonth}</span>
                          </div>
                        );
                      })}
                      <button onClick={handleNextPage} disabled={endIndex >= days.length}>
                        <MdArrowForwardIos />
                      </button>
                    </div>
                    <div className="body_date">
                      {slots.map((slot, index) => {
                        const currentHour = new Date().getHours(); // giờ hiện tại
                        const currentMinute = new Date().getMinutes(); // Phút hiện tại;
                        const [hourStr, minuteStr] = slot.startTime.split(':');
                        const hour01 = parseInt(hourStr, 10); // Chuyển đổi giờ từ chuỗi sang số nguyên
                        const minute01 = parseInt(minuteStr, 10);
                        const isLessThanCurrentTime = (hour01 < currentHour) || (hour01 === currentHour && minute01 < currentMinute);
                        const matchedSchedule = isSlotAvailable(slot.startTime);
                        let slotClass = 'hour_item';

                        if (matchedSchedule.status === 'true') {
                          slotClass += ' selectable';
                        } else if (matchedSchedule.status === 'false' || matchedSchedule.status === 'booked') {
                          slotClass += ' disabled';
                        } else if (isLessThanCurrentTime) {
                          slotClass += ' disabled';
                        }
                        return (
                          <div
                            key={index}
                            className={`${slotClass} ${activeHourIndex === slot.id ? 'active' : ''} position-relative`}
                            onClick={() => matchedSchedule.status === 'true' && handleSlotClick(slot.startTime, slot.id, matchedSchedule.scheduledoctorId, daySelected, patientId)}
                            data-id={matchedSchedule === true ? matchedSchedule.id : null}
                          >
                            <div>{slot.startTime}</div>

                            {matchedSchedule.status === 'booked' && (
                              <span className="badge position-absolute" style={{ top: '1px', left: '-14px', rotate: '-39deg', background: 'red' }}>Booked</span>
                            )}
                          </div>
                        );
                      })}

                    </div>
                    <div className="footer_date">
                      <div className="date_view">
                        <div className='date_view_day'><span>{formatDate(daySelected)}</span> | <span className='hour'>{slotName}</span></div>
                        <div className='btn__booking-appointment' onClick={handleSubmitBook} data-bs-toggle="modal" data-bs-target="#exampleModal">
                          Book
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-5 col-12">
          <div className='doctor__profile'>
            <div className='info__card'>
              <img src={`https://medical-appointment-booking-api-production.up.railway.app/images/doctors/${doctor.image}`} alt="" className='img__doctor' />
              <div className="doctor_info">
                <div className='name'>{doctor.title} {doctor.fullName}</div>
                <div className='department'>{doctor.department?.name}</div>
              </div>
              <div className='doctor_contact'>
                <div className='contact_icon'>
                  <BiCommentDots />
                </div>
                <div className='contact_icon'>
                  <MdOutlinePhoneInTalk />
                </div>
                <div className='contact_icon'>
                  <BiSolidVideo />
                </div>
              </div>
            </div>
            <div className="biography">
              <div className="title">Biography</div>
              {doctor.biography && doctor.biography ? (
                <div className="content">
                  {doctor.biography} <a href="#">Read more</a>
                </div>
              ) : (
                <p>Thông tin đang cập nhật</p>
              )}
            </div>
            <div className="feedback">
              <div className="title">Feedback</div>
              {doctor.feedbackDtoList && doctor.feedbackDtoList ? (
                doctor.feedbackDtoList.slice(0, 2).map((item) => (
                  <div className="feedback_content" key={item.id}>
                    <div className='feedback__title'>
                      <img src={`https://medical-appointment-booking-api-production.up.railway.app/images/patients/${item.patient.image}`} alt="" className='img-fluid' />
                      <div className='name__rate'>
                        <div className='name'>{item.patient.fullName}</div>
                        <div className='rate'>
                          <RatingStar rating={item.rate} className='icon' />
                          <div>({item.rate})</div>
                        </div>
                      </div>
                    </div>
                    <div className='feedback__content'>
                      <p>{item.comment}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>Thông tin đang cập nhật</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <Payment setActiveHourIndex={setActiveHourIndex} setSlotName={setSlotName} setSchedules={setSchedules} data={modalData} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </section>
  )
}

export default Booking