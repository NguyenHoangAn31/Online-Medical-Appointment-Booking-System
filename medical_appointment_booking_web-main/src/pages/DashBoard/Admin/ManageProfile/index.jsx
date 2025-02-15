import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Input, Tabs } from 'antd';
import {
  AppstoreAddOutlined,
  FacebookFilled,
  HeartTwoTone,
  TwitterSquareFilled,
  UserOutlined,
  YoutubeFilled
} from "@ant-design/icons";
import getUserData from '../../../../route/CheckRouters/token/Token';
import { findUserById, updateUser } from '../../../../services/API/userService';
import Spinner from '../../../../components/Spinner';
import { AlertContext } from '../../../../components/Layouts/DashBoard';


function ProfileAdmin() {
  const {openNotificationWithIcon} = useContext(AlertContext);
  const {currentUser} = useContext(AlertContext);


  const [user, setUser] = useState({});

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    setUser(await findUserById(currentUser.user.id));
  };

  const onInputChange = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      await updateUser(user.id, user);
        openNotificationWithIcon('success', 'Update Profile Successfully', '')

    }
    catch (error) {
      openNotificationWithIcon('error', 'Error Update Profile', '')
    }
}


  return (
    <>
      {Object.keys(user).length == 0 ? <Spinner /> :
        <div className="profile">
          <Card className='infor'
            bordered={false}
          >
            <div className="photo text-center">
              <img src="/images/dashboard/default_user.jpg" alt="" width='175' height='175' />
              <p className='d-block m-0'>{user.fullName}</p>
              <p>Account {user.roles[0]}</p>
              <div className="icon_infor d-flex justify-content-center gap-5">
                <div><UserOutlined /> 254</div>
                <div><AppstoreAddOutlined /> 54</div>
              </div>
            </div>
            <hr />
            <div className='item'>
              <p>Email</p>
              <p>{user.email}</p>
            </div>
            <div className='item'>
              <p>Phone</p>
              <p>{user.phone}</p>
            </div>
            <div className='item'>
              <p>Address</p>
              <p>VietNam</p>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.266658368394!2d106.67948697465559!3d10.790877089358775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528d4a7c599b3%3A0xbb9cf97bc8275352!2zMzkxQSDEkC4gTmFtIEvhu7MgS2jhu59pIE5naMSpYSwgUGjGsOG7nW5nIDE0LCBRdeG6rW4gMywgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oIDcwMDAwMCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1715930324632!5m2!1svi!2s" width="300" height="150" style={{ border: 0, marginTop: '15px' }}  loading="lazy" ></iframe>
            </div>
            <div className="item">
              <p>Social Profile</p>
              <div className="button_social">
                <Button className='bg-primary border-0' icon={<FacebookFilled />}></Button>
                <Button className='bg-danger border-0' icon={<YoutubeFilled />}></Button>
              </div>

            </div>
          </Card>

          <Tabs className='tab' defaultActiveKey="1" items={[
            {
              key: '1',
              label: 'Time Line',
              children: <div className="row"><div className="col-sm-12"><div><div className="steamline position-relative border-start ms-4 mt-0"><div className="sl-item my-3 pb-3 border-bottom"><div className="sl-left float-start text-center rounded-circle text-white ms-n3 me-3 bg-success"><img src="/images/dashboard/profile/user2-Bc3p90fV.jpg" width="40" alt="user" className="rounded-circle" /></div><div className="sl-right ps-4"><div><a href="/" className="text-dark fs-4 text-decoration-none fw-bold">John Doe</a><span className="ms-2 text-muted">5 minutes ago</span><p className="text-muted">assign a new task<a href="/"> Design weblayout</a></p><div className="ms-1 row"><div className="mb-3 col-md-6 col-lg-3"><img src="/images/dashboard/profile/bg1-CJWqHP7o.jpg" className="img-fluid rounded" alt="" /></div><div className="mb-3 col-md-6 col-lg-3"><img src="/images/dashboard/profile/bg2-idfj9ptf.jpg" className="img-fluid rounded" alt="" /></div><div className="mb-3 col-md-6 col-lg-3"><img src="/images/dashboard/profile/bg3-DQmVx8UV.jpg" className="img-fluid rounded" alt="" /></div><div className="mb-3 col-md-6 col-lg-3"><img src="/images/dashboard/profile/bg4-CZIlON52.jpg" className="img-fluid rounded" alt="" /></div></div><div className="desc ms-3"><a href="/" className="text-decoration-none text-dark me-2">2 comment</a><a href="/" className="text-decoration-none text-dark me-2"><HeartTwoTone twoToneColor="#eb2f96" /> 5 Love</a></div></div></div></div><div className="sl-item my-3 pb-3 border-bottom"><div className="sl-left float-start text-center rounded-circle text-white ms-n3 me-3 bg-success"><img src="/images/dashboard/profile/user3-LjelyQZu.jpg" width="40" alt="user" className="rounded-circle" /></div><div className="sl-right ps-4"><div><a href="/" className="text-dark fs-4 text-decoration-none fw-bold">Elizabeth</a><span className="ms-2 text-muted">5 minutes ago</span><div className="mt-3 ms-1 row"><div className="col-12 col-md-3"><img src="/images/dashboard/profile/bg1-CJWqHP7o.jpg" alt="user" className="img-fluid rounded" /></div><div className="col-12 col-md-9"><p> Hi , I wanted to discuss our new business idea about the online booking system for clinics. Do you have a moment?</p><a href="/" className="btn btn-success">View Detail</a></div></div><div className="desc ms-3 mt-3"><a href="/" className="text-decoration-none text-dark me-2">2 comment</a><a href="/" className="text-decoration-none text-dark me-2"><HeartTwoTone twoToneColor="#eb2f96" /> 5 Love</a></div></div></div></div><div className="sl-item my-3 pb-3 border-bottom"><div className="sl-left float-start text-center rounded-circle text-white ms-n3 me-3 bg-success"><img src="/images/dashboard/profile/user4-CwbtKSXY.jpg" width="40" alt="user" className="rounded-circle" /></div><div className="sl-right ps-4"><div><a href="/" className="text-dark fs-4 text-decoration-none fw-bold">Alexander</a><span className="ms-2 text-muted">5 minutes ago</span><p className="mt-2 ms-3">Absolutely, Alexander. I think it's a fantastic idea. With so many people looking for easier ways to book their medical appointments, this could be very successful. What are your initial thoughts on how we should start?</p></div><div className="desc ms-3 mt-3"><a href="/" className="text-decoration-none text-dark me-2">2 comment</a><a href="/" className="text-decoration-none text-dark me-2"><HeartTwoTone twoToneColor="#eb2f96" /> 5 Love</a></div></div></div><div className="sl-item my-3 pb-3 border-bottom"><div className="sl-left float-start text-center rounded-circle text-white ms-n3 me-3 bg-success"><img src="/images/dashboard/profile/user1-Co5pG0mJ.jpg" width="40" alt="user" className="rounded-circle" /></div><div className="sl-right ps-4"><div><a href="/" className="text-dark fs-4 text-decoration-none fw-bold">Victoria</a><span className="ms-2 text-muted">5 minutes ago</span><div className="mt-2 ms-3"> I'm thinking we should begin with some market research to understand our potential customers and their needs. We need to find out what features they'd find most useful. What do you think?</div></div></div></div></div></div></div></div>
            },
            {
              key: '2',
              label: 'Profile',
              children: <div className="row"><div className="col-sm-12"><div className="p-4"><div className="row"><div className="border-end col-6 col-md-3"><strong>Full Name</strong><br /><Input value={user.fullName} onChange={(e) => onInputChange('fullName', e.target.value)} required /></div><div className="border-end col-6 col-md-3"><strong>Mobile</strong><br /><Input value={user.phone} onChange={(e) => onInputChange('phone', e.target.value)} required /></div><div className="border-end col-6 col-md-3"><strong>Email</strong><br /><Input value={user.email} onChange={(e) => onInputChange('email', e.target.value)} required /></div><div className="border-end col-6 col-md-3"><strong>Location</strong><br /><p className="text-muted">VietNam</p></div></div><p className="mt-4">Alexander Smith is our booking systems manager, who ensures that every medical booking process runs smoothly and efficiently. With more than 10 years of experience in the field of medical information systems management, Alexander brings professionalism and dedication to every aspect of his work.</p><p>He is always focused on improving the patient experience and ensuring that all their needs are met in a timely manner. With his excellent leadership skills and deep understanding of technology, Alexander has helped optimize our booking system, making the appointment process easier and more convenient for everyone.</p><Button className='float-end' type="primary" onClick={handleUpdate}>Update</Button><h4 className="font-medium mt-4" style={{clear:'both'}}>Skill Set</h4><hr /><h5 className="mt-4">Wordpress <span className="float-end">80%</span></h5><div className="progress"><div className="progress-bar" role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100" style={{ width: "10%" }}></div></div><h5 className="mt-4">HTML 5 <span className="float-end">90%</span></h5><div className="progress"><div className="progress-bar bg-success" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{ width: "25%" }}></div></div><h5 className="mt-4">jQuery <span className="float-end">50%</span></h5><div className="progress"><div className="progress-bar bg-info" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style={{ width: "50%" }}></div></div><h5 className="mt-4">Photoshop <span className="float-end">70%</span></h5><div className="progress"><div className="progress-bar bg-warning" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: "75%" }}></div></div></div></div></div>,
            }
          ]} />
        </div>}





    </>
  )
}

export default ProfileAdmin