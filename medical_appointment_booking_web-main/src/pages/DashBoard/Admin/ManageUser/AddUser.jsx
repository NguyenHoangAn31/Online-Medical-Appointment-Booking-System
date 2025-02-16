import React, { useContext, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import {
  Button,
  Form,
  Input,
  Select,
  Space,
  TimePicker,
  Upload,
} from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import { LeftOutlined, PlusOutlined } from '@ant-design/icons';
import { addNews } from '../../../../services/API/news';
import { AlertContext } from '../../../../components/Layouts/DashBoard';
import getUserData from '../../../../route/CheckRouters/token/Token';
import { createUser } from '../../../../services/API/userService';
import AOS from "aos";
import "aos/dist/aos.css";

const layout = {
  labelCol: {
    span: 4,
  },
  // wrapperCol: {
  //   span: 20,
  // },
};

function AddUser() {
  const { currentUser } = useContext(AlertContext);

  const navigate = useNavigate();

  // thông báo
  const { openNotificationWithIcon } = useContext(AlertContext);
  // state cho user
  const [user, setUser] = useState({ status: 1, provider: 'phone', keyCode: null });

  const [form] = Form.useForm();


  // cập nhật thay đổi giá trị cho user
  const onInputChangeForUser = (name, value) => {
    setUser({ ...user, [name]: value });
  };


  // reset field
  const onReset = () => {
    form.resetFields();
  };

  // xử lý submit
  const handleFormSubmit = async () => {
    try {
      await createUser(user);
      openNotificationWithIcon('success', 'Add New User Successfully', '')
      navigate("/dashboard/admin/manage-user");

    }
    catch (error) {
      console.log(error)
      openNotificationWithIcon('error', 'Error Creating New User', '')

    }
  };

  useEffect(() => {
    AOS.init({
      duration: 2000
    });
  }, []);

  return (
    <>

      {/* <Link to={`/dashboard/admin/manage-slot`}><LeftOutlined /> Back To Slot</Link> */}
      <div className='d-lg-flex mt-4 mb-5'>
        <div data-aos="fade-down" style={{ width: '50%' }}>
          <div>
            <h1 className='text-primary'>Register New Account</h1>
            <hr className='w-75' />
            <p>Welcome to the Doctor and Admiin account registration system. Please fill in the information below to create a new account.</p>
          </div>
          <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={handleFormSubmit}
            style={{
              // maxWidth: 600,
              marginTop: '45px'
            }}
          >

            <Form.Item label="Phone" style={{ marginBottom: 30 }}
              rules={[
                {
                  required: true,
                  message: 'Phone number is required',
                },
                {
                  pattern: /^[0-9]{10,}$/,
                  message: 'Phone number must be at least 11 digits and contain only numbers',
                },
              ]}
              name="phone">
              <Input onChange={(e) => onInputChangeForUser('phone', e.target.value)} />
            </Form.Item>


            <Form.Item label="Email" style={{ marginBottom: 30 }}
              rules={[
                {
                  required: true,
                  message: 'Email is required',
                },
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
              ]}
              name="email">
              <Input onChange={(e) => onInputChangeForUser('email', e.target.value)} />
            </Form.Item>


            <Form.Item label="Name" style={{ marginBottom: 30 }} rules={[
              {
                required: true,
              },
            ]} name="name">
              <Input onChange={(e) => onInputChangeForUser('fullName', e.target.value)} />
            </Form.Item>

            <Form.Item label="Role" style={{ marginBottom: 30 }} name="role" rules={[
              {
                required: true,
              }]}>
              <Select placeholder="Select Role" onChange={(e) => onInputChangeForUser('roleId', e)}>
                {/* <Select.Option value="1">User</Select.Option> */}
                <Select.Option value="2">Doctor</Select.Option>
                <Select.Option value="3">Admin</Select.Option>
              </Select>
            </Form.Item>


            <Form.Item className='text-end'>
              <Space>
                <Button htmlType="button" onClick={onReset}>
                  Reset
                </Button>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>

              </Space>
            </Form.Item>
          </Form>
        </div>

        <div data-aos="fade-left" style={{ width: '50%' }}>
          <img src='/images/dashboard/user_create.jpg' alt="" className='w-100' />

        </div>
      </div>

    </>
  )
}

export default AddUser