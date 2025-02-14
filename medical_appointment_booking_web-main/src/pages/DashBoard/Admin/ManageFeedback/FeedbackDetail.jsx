import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { deleteFeedback, detailFeedback } from '../../../../services/API/feedbackService';
import { changeStatus } from '../../../../services/API/changeStatus';
import { Badge, Dropdown, Rate, Space } from 'antd';
import Spinner from '../../../../components/Spinner';
import { DownOutlined } from '@ant-design/icons';
import { AlertContext } from '../../../../components/Layouts/DashBoard';
import { formatDate, formatDateFromJs } from '../../../../ultils/formatDate';

function FeedbackDetail() {
  const { openNotificationWithIcon } = useContext(AlertContext);

  // lấy id và rate từ query
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const rate = queryParams.get("rate");

  // gọi hàm loadDetailFeedback 1 lần
  useEffect(() => {
    loadDetailFeedback();
  }, []);


  // xét giá trị cho detailFeedback
  const loadDetailFeedback = async () => {
    setDetailFeedback(await detailFeedback(id));
  };

  // khởi tạo đối tượng detailFeedback
  const [detail, setDetailFeedback] = useState({});

  function calculateRatingPercentage(myrate) {
    const count = detail.feedbackDtoList.reduce((total, feedback) => {
      return feedback.rate === myrate ? total + 1 : total;
    }, 0);
    const totalFeedbacks = detail.feedbackDtoList.length;
    const percentage = (count / totalFeedbacks) * 100;
    return percentage.toFixed(2);
  }


  const handlechangeStatus = async (id, status) => {
    try {
      status = status ? 1 : 0
      await changeStatus('feedback', id, status);
      loadDetailFeedback();
      openNotificationWithIcon('success', 'Change Status Feedback Successfully', '')
    } catch (error) {
      openNotificationWithIcon('warning', 'Something Went Wrong', '')
      console.log(error)
    }
  };


  const handleDelete = async (id) => {
    try {
      await deleteFeedback(id);
      loadDetailFeedback();
      openNotificationWithIcon('success', 'Deletete Feedback Successfully', '')
    } catch (error) {
      Alert('warning', 'Something went Wrong', '')
      console.log(error)
    }

  };

  console.log(detail)

  return (

    <>
      {Object.keys(detail).length == 0 ? <Spinner /> : <div className='feedback_detail'>

        <div className='doctor d-md-flex justify-content-around align-item-center  gap-5'>
          <div className='image text-center' style={{ maxWidth: 350, margin: 'auto' }}>
            <img className='d-block pb-5 m-auto w-100' src={"https://medical-appointment-booking-api-production.up.railway.app/images/doctors/" + detail.image} alt="" />

            <Rate className="fs-3 mb-2" count={5} disabled defaultValue={Number(rate)} allowHalf />
            <p>Department : {detail.department['name']}</p>
          </div>
          <div className='information' style={{ width: '450px', maxWidth: '100%' }}>
            <h1 className='mb-5'>{detail.title + ' ' + detail.fullName}</h1>
            <p>Address : {detail.address}</p>
            <p>Birthday : {formatDate(detail.birthday)}</p>
            <p>work history : </p>
            {/* <section className='qualifications'>
              <p>qualifications : </p>
              {detail.doctor.qualifications.map((value,index)=>{
                <span>{value.universityName}</span>
              })}
            </section> */}
            <section className='mt-4 workings'>
              <ul className="timeline">
                {detail.workings.map((value, index) => {
                  return (
                    <li className="timeline-item mb-5">
                      <h6 className="fw-bold">{value.company}</h6>
                      <p className="text-muted mb-2 fw-bold">{formatDate(value.startWork)} - {formatDate(value.endWork)}</p>
                      <p className="text-muted">
                        {value.address}
                      </p>
                    </li>
                  )
                })}
              </ul>
            </section>
          </div>
        </div>
        <div className="rating_user mb-5 pb-5">
          <p>{rate} average based on {detail.feedbackDtoList ? detail.feedbackDtoList.length : null} reviews.</p>
          <hr style={{ border: '3px', solid: '#f1f1f1' }} />

          <div className="row">
            <div className="side">
              <div>5 star</div>
            </div>
            <div className="middle">
              <div className="bar-container">
                <div className="bar-5" style={{ width: calculateRatingPercentage(5) + '%' }}></div>
              </div>
            </div>
            <div className="side right">
              <div>{detail.feedbackDtoList.filter(feedback => feedback.rate === 5).length}</div>
            </div>
            <div className="side">
              <div>4 star</div>
            </div>
            <div className="middle">
              <div className="bar-container">
                <div className="bar-4" style={{ width: calculateRatingPercentage(4) + '%' }}></div>
              </div>
            </div>
            <div className="side right">
              <div>{detail.feedbackDtoList.filter(feedback => feedback.rate === 4).length}</div>
            </div>
            <div className="side">
              <div>3 star</div>
            </div>
            <div className="middle">
              <div className="bar-container">
                <div className="bar-3" style={{ width: calculateRatingPercentage(3) + '%' }}></div>
              </div>
            </div>
            <div className="side right">
              <div>{detail.feedbackDtoList.filter(feedback => feedback.rate === 3).length}</div>
            </div>
            <div className="side">
              <div>2 star</div>
            </div>
            <div className="middle">
              <div className="bar-container">
                <div className="bar-2" style={{ width: calculateRatingPercentage(2) + '%' }}></div>
              </div>
            </div>
            <div className="side right">
              <div>{detail.feedbackDtoList.filter(feedback => feedback.rate === 2).length}</div>
            </div>
            <div className="side">
              <div>1 star</div>
            </div>
            <div className="middle">
              <div className="bar-container">
                <div className="bar-1" style={{ width: calculateRatingPercentage(1) + '%' }}></div>
              </div>
            </div>
            <div className="side right">
              <div>{detail.feedbackDtoList.filter(feedback => feedback.rate === 1).length}</div>
            </div>
          </div>
        </div>
        <div className="feedback">
          {detail.feedbackDtoList.map((value, index) => {
            return (
              <Badge.Ribbon
                key={value.id}  // Thêm key tại đây
                text={value.status ? "Show" : "Hide"}
                color={value.status ? "null" : "red"}
              >
                <div className="card_patient mb-5  d-flex gap-3">
                  <div className="image_patient" style={{ width: 75 }}>
                    <img className="rounded-circle object-fit-cover"
                      src={"https://medical-appointment-booking-api-production.up.railway.app/images/patients/" + value.patient.image}
                      alt=""
                      width='75'
                      height='75'
                    />
                  </div>
                  <div className="comment_patient">
                    <p className='mb-2'>{value.patient.fullName} ({formatDateFromJs(value.createdAt)})</p>
                    <Rate className="fs-6 mb-1" count={5} disabled defaultValue={value.rate} />
                    <p className='pt-2'>{value.comment}</p>
                  </div>
                  <div className="option">
                    <Dropdown
                      placement="bottomRight"
                      menu={{
                        items: [
                          {
                            label: (
                              <span onClick={() => handlechangeStatus(value.id, value.status)}>
                                {value.status ? "Hide Comment" : "Show Comment"}
                              </span>
                            ),
                            key: '0',
                          },
                          // {
                          //   label: (
                          //     <span onClick={() => handleDelete(value.id)}>
                          //       Delete Comment
                          //     </span>
                          //   ),
                          //   key: '1',
                          // }
                        ]
                      }}
                    >
                      <span onClick={(e) => e.preventDefault()} style={{ display: 'inline-block', width: 20 }}>
                        <Space>
                          . . .
                        </Space>
                      </span>
                    </Dropdown>
                  </div>
                </div>
              </Badge.Ribbon>
            )
          })}

        </div>
      </div>}

    </>
  )
}

export default FeedbackDetail