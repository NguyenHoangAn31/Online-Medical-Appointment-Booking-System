import React, { useContext, useState } from 'react';
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


import dynamic from 'next/dynamic';
// const Editor = dynamic(() => import('../../Admin/ManageNews/CKEditor'), { ssr:false})

const layout = {
  labelCol: {
    span: 4,
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
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
function AddNews() {
  // const {currentUser} = useContext(AlertContext);
  
  const { currentUser } = useContext(AlertContext);
  console.log("id of currentUser : ", currentUser.user.id);

  const navigate = useNavigate();

  // thông báo
  const {openNotificationWithIcon} = useContext(AlertContext);
  // state cho news
  const [news, setNews] = useState({
    title: '',
    content: '',
    url: '',
    status: '1',
    // user_id: getUserData.user_id
    user_id: currentUser.user.id
  });
  // state cho image
  const [image, setImage] = useState('');

  const [form] = Form.useForm();


  // cập nhật thay đổi giá trị cho departmnet
  const onInputChangeForNews = (name, value) => {

    setNews({ ...news, [name]: value });
    console.log(news)

  };

  // cập nhật thay đổi giá trị cho icon
  const onInputChangeForImage = (value) => {
    console.log(value)
    setImage(value);
  }
  // reset field
  const onReset = () => {
    form.resetFields();
  };

  // xử lý submit
  const handleFormSubmit = async () => {
    try {
      const formData = new FormData()
      formData.append('image', image)
      formData.append('news', JSON.stringify((news)))
      await addNews(formData);
      openNotificationWithIcon('success', 'Add New News Successfully', '')
      navigate("/dashboard/admin/manage-news");

    }
    catch (error) {
      console.log(error)
      openNotificationWithIcon('error', 'Error Creating New News', '')

    }
  };
  return (
    <>

      {/* <Link to={`/dashboard/admin/manage-slot`}><LeftOutlined /> Back To Slot</Link> */}
      <h2>Add New News</h2>

      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={handleFormSubmit}
        style={{
          maxWidth: 2400,
          marginTop: '45px'
        }}
      >

        <Form.Item label="URL" rules={[
          {
            required: true,
          },
        ]} name="url">
          <Input onChange={(e) => onInputChangeForNews('url', e.target.value)} />
        </Form.Item>

        <Form.Item label="Title" rules={[
          {
            required: true,
          },
        ]} name="title">
          <Input onChange={(e) => onInputChangeForNews('title', e.target.value)} />
        </Form.Item>


        <Form.Item label="Content" style={{margin:'50px 0'}} >

          <ReactQuill theme="snow" onChange={(e) => onInputChangeForNews('content', e)} />
          {/* <Editor/> */}
        </Form.Item>
        



        <Form.Item label="Image" valuePropName="fileList" getValueFromEvent={normFile} rules={[
          {
            required: true,
          },
        ]} name="image">
          <Upload beforeUpload={() => false} listType="picture-card" maxCount={1} onChange={(e) => onInputChangeForImage(e.file)}>
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



        <Form.Item {...tailLayout}>
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
    </>
  )
}

export default AddNews