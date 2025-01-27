import React, { useContext, useEffect, useState } from 'react'
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
import { addDepartment } from '../../../../services/API/departmentService';
import { AlertContext } from '../../../../components/Layouts/DashBoard';
import AOS from "aos";
import "aos/dist/aos.css";



const layout = {
  labelCol: {
    span: 4,
  },
  // wrapperCol: {
  //   span: 16,
  // },
};
// const tailLayout = {
//   wrapperCol: {
//     offset: 8,
//     span: 16,
//   },
// };
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
function AddDepartment() {

  const navigate = useNavigate();

  // thông báo
  const { openNotificationWithIcon } = useContext(AlertContext);
  // state cho department
  const [department, setDepartment] = useState({
    name: '',
    status: 'false',
    url: ''
  });
  // state cho icon
  const [icon, setIcon] = useState('');

  const [form] = Form.useForm();


  // cập nhật thay đổi giá trị cho departmnet
  const onInputChangeForDepartment = (name, value) => {
    console.log(icon)

    setDepartment({ ...department, [name]: value });
  };

  useEffect(() => {
    AOS.init({
      duration: 2000
    });
  }, []);

  // cập nhật thay đổi giá trị cho icon
  const onInputChangeForIcon = (value) => {
    console.log(value)
    setIcon(value);
  }
  // reset field
  const onReset = () => {
    form.resetFields();
  };

  // xử lý submit
  const handleFormSubmit = async () => {
    try {
      const formData = new FormData()
      formData.append('icon', icon)
      formData.append('department', JSON.stringify((department)))
      await addDepartment(formData);
      openNotificationWithIcon('success', 'Add New Department Successfully', '')
      navigate("/dashboard/admin/manage-department");

    }
    catch (error) {
      console.log(error)
      openNotificationWithIcon('error', 'Error Creating New Department', '')

    }
  };
  return (
    <>

      {/* <Link to={`/dashboard/admin/manage-slot`}><LeftOutlined /> Back To Slot</Link> */}

      <div className='d-lg-flex mb-5'>
        <div data-aos="fade-down" style={{ flexGrow: 1, marginTop: 50, width: '50%' }}>
          <div style={{}}>
            <h1 className='text-primary'>Create New Department</h1>
            <hr className='w-75' />
            Welcome to the Department registration system. Please fill in the information below to create a new Department.

          </div>
          <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={handleFormSubmit}
            style={{
              maxWidth: 600,
              marginTop: '45px'
            }}
          >

            <Form.Item label="Name"
              rules={[
                { required: true, message: 'Please enter name' },
                { max: 50, message: 'Name cannot exceed 50 characters' },
              ]}
              name="name">
              <Input onChange={(e) => onInputChangeForDepartment('name', e.target.value)} />
            </Form.Item>


            <Form.Item label="Icon" valuePropName="fileList" getValueFromEvent={normFile} rules={[
              {
                required: true,
              },
            ]} name="icon">
              <Upload beforeUpload={() => false} listType="picture-card" maxCount={1} onChange={(e) => onInputChangeForIcon(e.file)}>
                <button
                  style={{
                    border: 0,
                    background: 'none',
                  }}
                  type="button"
                >
                  <PlusOutlined />
                  <div
                    style={{
                      marginTop: 8,
                    }}
                  >
                    Upload
                  </div>
                </button>
              </Upload>
            </Form.Item>



            <Form.Item className='text-end' >
              <Space>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button htmlType="button" onClick={onReset}>
                  Reset
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
        <div data-aos="fade-left" style={{ width: "50%" }}>
          <img src='/images/dashboard/department_create.jpg' alt="" className='w-100' />
        </div>
      </div>

    </>
  )
}

export default AddDepartment