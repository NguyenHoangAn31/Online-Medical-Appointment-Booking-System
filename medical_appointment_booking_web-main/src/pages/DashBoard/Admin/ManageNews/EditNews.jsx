import React, { useContext, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  Button,
  Form,
  Image,
  Input,
  Select,
  Space,
  TimePicker,
  Upload,
} from 'antd';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { LeftOutlined, PlusOutlined, SoundTwoTone } from '@ant-design/icons';
import { findNewsByIdForUpdate } from '../../../../services/API/news';
import { updateNews } from '../../../../services/API/news';
import { AlertContext } from '../../../../components/Layouts/DashBoard';
import getUserData from '../../../../route/CheckRouters/token/Token';
import Spinner from '../../../../components/Spinner';


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

function EditNews() {
  const navigate = useNavigate();

  // thông báo
  const { openNotificationWithIcon } = useContext(AlertContext);
  // lấy id từ url
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  // khởi tạo đối tượng news
  const [news, setNews] = useState({});
  // state cho image
  const [image, setImage] = useState(null);


  // gọi hàm loadNews 1 lần
  useEffect(() => {
    loadNews();
  }, []);

  // xét giá trị cho news
  const loadNews = async () => {
    // setNews(await findNewsByIdForUpdate(id));
    const newsData = await findNewsByIdForUpdate(id);
    setNews(newsData);

  };

  // cập nhật thay đổi giá trị cho news
  const onInputChangeForNews = (name, value) => {
    setNews({ ...news, [name]: value });
    console.log(news)
  };

  // cập nhật thay đổi giá trị cho image
  const onInputChangeForImage = (value) => {
    setImage(value);
  }

  // hàm submit 
  const handleFormSubmit = async () => {
    try {
      console.log(news)
      const formData = new FormData()
      formData.append('image', image)
      formData.append('news', JSON.stringify((news)))
      openNotificationWithIcon('success', 'Editing News Successfully', '')

      await updateNews(id, formData);
      console.log(formData.get('news'))
      navigate("/dashboard/admin/manage-news");
    }
    catch (error) {
      console.log(error)
      openNotificationWithIcon('error', 'Error Editing News', '')
    }

  };
  return (
    <>
      {Object.keys(news).length == 0 ? <Spinner /> : <><h2>Edit News - {news.status != null ?
        news.status == 0 ? <span style={{ color: 'red' }}>Not Active</span> : <span style={{ color: 'rgb(82, 196, 26)' }}>Active</span>
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

          <Form.Item label="URL">
            <Input value={news.url} onChange={(e) => onInputChangeForNews('url', e.target.value)} required />
          </Form.Item>

          <Form.Item label="Title" >
            <Input value={news.title} onChange={(e) => onInputChangeForNews('title', e.target.value)} required />
          </Form.Item>

          <Form.Item label="Content" style={{ margin: '50px 0' }}>
            <ReactQuill value={news.content} theme="snow" onChange={(e) => onInputChangeForNews('content', e)} />
            {/* <Editor  value={news.content} theme="snow" onChange={(e) => onInputChangeForNews('content', e)} /> */}

          </Form.Item>



          {/* <Form.Item label="Select Status" name="status">
            <Select placeholder="Select Status" onChange={(e) => onInputChangeForNews('status', e)} >
              <Select.Option value="1">Show</Select.Option>
              <Select.Option value="0">Hide</Select.Option>
            </Select>
          </Form.Item> */}

          {news.image ?
            <Form.Item label="Image">
              <Image
                width={200}
                src={"https://medical-appointment-booking-api-production.up.railway.app/images/news/" + news.image}
              /></Form.Item> : <></>
          }
          <Form.Item label="Select Image" valuePropName="fileList" getValueFromEvent={normFile}>
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
            </Space>
          </Form.Item>
        </Form></>}

    </>
  )
}

export default EditNews