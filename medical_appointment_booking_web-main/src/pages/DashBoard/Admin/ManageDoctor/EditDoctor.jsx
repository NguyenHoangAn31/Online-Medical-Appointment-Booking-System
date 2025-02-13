import React, { useContext, useEffect, useState } from 'react'
import {
  Button,
  Form,
  Input,
  Select,
  Space,
} from 'antd';
import { json, useLocation, useNavigate } from 'react-router-dom';
import { detailDoctor, updateDoctor } from '../../../../services/API/doctorService';
import { getAllDepartment } from '../../../../services/API/departmentService';
import { AlertContext } from '../../../../components/Layouts/DashBoard';
import Spinner from '../../../../components/Spinner';


const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};


function EditDoctor() {
  const navigate = useNavigate();

  // thông báo
  const {openNotificationWithIcon} = useContext(AlertContext);
  // lấy id từ url
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  // khởi tạo đối tượng doctor và department
  const [doctor, setDoctor] = useState({});
  const [department, setDepartment] = useState([]);


  useEffect(() => {
    loadDoctorAndDepartment();
  }, []);

  const loadDoctorAndDepartment = async () => {
    setDoctor(await detailDoctor(id));
    setDepartment(await getAllDepartment());

  };



  // cập nhật thay đổi giá trị cho doctor
  const onInputChangeForDoctor = (name, value) => {

    setDoctor({ ...doctor, [name]: name=='department'?JSON.parse(value):value});
    console.log(doctor)
  };



  // hàm submit 
  const handleFormSubmit = async () => {
    try {

      await updateDoctor(id,doctor.price,doctor.department.id);
      openNotificationWithIcon('success', 'Editing Doctor Successfully', '')
      navigate("/dashboard/admin/manage-doctor");
    }
    catch (error) {
      console.log(error)
      openNotificationWithIcon('error', 'Error Editing Doctor', '')
    }
  };

  return (
    <>
      {Object.keys(doctor).length == 0 ? <Spinner /> : <> <h2>Edit Doctor - {doctor.status != null ?
        doctor.status == 0 ? <span style={{ color: 'red' }}>Not Active</span> : <span style={{ color: 'rgb(82, 196, 26)' }}>Active</span>
        : <></>
      }</h2>

        <Form
          {...layout}
          name="control-hooks"
          onFinish={handleFormSubmit}
          style={{
            maxWidth: 600,
            marginTop: '45px'
          }}
        >



          <Form.Item label="Price">
            <Input value={doctor.price} onChange={(e) => onInputChangeForDoctor('price', e.target.value)} required />
          </Form.Item>



          <Form.Item label="Select Department" name="department">
            <Select placeholder="Select Department" onChange={(e) => onInputChangeForDoctor('department', e)} >
              {department.map((value, index) => {
                return (
                  <Select.Option value={JSON.stringify(value)}>{value.name}</Select.Option>
                )
              })}
            </Select>
          </Form.Item>



          <Form.Item {...tailLayout}>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Form></>}

    </>
  )
}

export default EditDoctor