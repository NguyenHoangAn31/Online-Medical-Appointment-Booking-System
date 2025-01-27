import React, { useContext, useEffect, useRef, useState } from 'react'
import {
  Button,
  Form,
  Image,
  Input,
  Select,
  Space,
  Table,
  Tag,
  TimePicker,
  Upload,
} from 'antd';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { DeleteOutlined, EditOutlined, EyeOutlined, LeftOutlined, PlusOutlined, SearchOutlined, SoundTwoTone } from '@ant-design/icons';
import { deleteDoctorFromDepartment, findDepartmentBySlug, getDoctorByDepartmentId } from '../../../../services/API/departmentService';
import { updateDepartment } from '../../../../services/API/departmentService';
import { AlertContext } from '../../../../components/Layouts/DashBoard';
import Spinner from '../../../../components/Spinner';
import { formatDate } from '../../../../ultils/formatDate';
import { addDoctorToDepartment, getDoctorNotDepartment } from '../../../../services/API/doctorService';


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

function EditDepartment() {
  const navigate = useNavigate();

  // thông báo
  const { openNotificationWithIcon } = useContext(AlertContext);
  // useState clear search , sort
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  // useState cho search
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  // xửa lý filetr and sort
  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const clearFilters = () => {
    setFilteredInfo({});
  };
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };
  // lấy id từ url
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const slug = queryParams.get("slug");
  const id = queryParams.get("id");

  // khởi tạo đối tượng department
  const [department, setDepartment] = useState({});
  const [doctors, setDoctors] = useState([]);
  const [doctorsNotDepartment, setDoctorsNotDepartment] = useState([]);
  const [doctorIdForAddDepartment, setdoctorIdForAddDepartment] = useState('');
  // state cho icon
  const [icon, setIcon] = useState(null);


  // gọi hàm loadDepartments 1 lần
  useEffect(() => {
    loadDepartment();
    loadDoctor();
    loadDoctorNotDepartment();
  }, []);

  // xét giá trị cho department
  const loadDepartment = async () => {
    setDepartment(await findDepartmentBySlug(slug));
  };
  const loadDoctor = async () => {
    const d = await getDoctorByDepartmentId(id);
    d.forEach(d => {
      d.key = d.id;
    })
    setDoctors(d)
  };
  const loadDoctorNotDepartment = async () => {
    const dnd = await getDoctorNotDepartment();
    dnd.forEach(d => {
      d.value = d.id;
      d.label = d.fullName
    })
    setDoctorsNotDepartment(dnd);
  };

  // cập nhật thay đổi giá trị cho departmnet
  const onInputChangeForDepartment = (name, value) => {
    setDepartment({ ...department, [name]: value });
    // console.log(department)
  };

  // cập nhật thay đổi giá trị cho icon
  const onInputChangeForIcon = (value) => {
    setIcon(value);
  }

  // hàm submit 
  const handleFormSubmit = async () => {
    try {
      const formData = new FormData()
      formData.append('icon', icon)
      formData.append('department', JSON.stringify((department)))
      await updateDepartment(department.id, formData);
      openNotificationWithIcon('success', 'Editing Department Successfully', '')
      navigate("/dashboard/admin/manage-department");
    }
    catch (error) {
      console.log(error)
      openNotificationWithIcon('error', 'Error Editing Department', '')
    }
  };

  const handleDeleteDoctorFromDepartment = async (doctorId) => {
    try {
      await deleteDoctorFromDepartment(doctorId);
      openNotificationWithIcon('success', 'Deleting Doctor Successfully', '')
      loadDoctor();
      loadDoctorNotDepartment();
    } catch (error) {
      console.log(error)
      openNotificationWithIcon('warning', 'Doctor Has A Work Schedule', '')

    }
  }

  const handleChangeDoctorSelect = (value) => {
    setdoctorIdForAddDepartment(value);
  };

  const handleAddDoctorToDepartment = async () => {
    if (doctorIdForAddDepartment != '') {
      try {
        await addDoctorToDepartment(id, doctorIdForAddDepartment);
        openNotificationWithIcon('success', 'Adding Doctor To Department Successfully', '')
        loadDoctor();
        setdoctorIdForAddDepartment('');
        loadDoctorNotDepartment();

      } catch (error) {
        console.log(error);
        openNotificationWithIcon('error', 'Error Adding Doctor To Department', '')
      }
    }

  }




  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });



  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      width: '10%',
      // sort 
      filteredValue: filteredInfo.id || null,
      sorter: (a, b) => a.id - b.id,
      sortOrder: sortedInfo.columnKey === 'id' ? sortedInfo.order : null,
      ellipsis: true,
      // search
      ...getColumnSearchProps('id'),

    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      width: '9%',
      render: (_, { image }) => {
        return (
          image ? <img src={"https://medical-appointment-booking-api-production.up.railway.app/images/doctors/" + image} width="50" alt="" /> : null);
      },

    },
    {
      title: 'Name',
      dataIndex: 'fullName',
      key: 'fullName',
      width: '15%',
      filteredValue: filteredInfo.fullName || null,
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
      sortOrder: sortedInfo.columnKey === 'fullName' ? sortedInfo.order : null,
      ellipsis: true,
      // search
      ...getColumnSearchProps('fullName'),

    },

    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      width: '10%',
      filteredValue: filteredInfo.gender || null,
      sortOrder: sortedInfo.columnKey === 'gender' ? sortedInfo.order : null,
      ellipsis: true,
      filters: [
        {
          text: 'Male',
          value: 'Male',
        },
        {
          text: 'Female',
          value: 'Female',
        },
      ],
      onFilter: (value, record) => record.gender == value,
      filterSearch: true,
    },
    {
      title: 'Birthday',
      dataIndex: 'birthday',
      key: 'birthday',
      width: '15%',
      // sort 
      filteredValue: filteredInfo.birthday || null,
      sorter: (a, b) => a.birthday.localeCompare(b.birthday),
      sortOrder: sortedInfo.columnKey === 'birthday' ? sortedInfo.order : null,
      ellipsis: true,
      // search
      ...getColumnSearchProps('birthday'),
      render: (_, { birthday }) => {
        return (
          <>
            {formatDate(birthday)}
          </>
        )
      }
    },

    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '11.666%',
      filters: [
        {
          text: 'Active',
          value: 1,
        },
        {
          text: 'Not Active',
          value: 0,
        },
      ],
      filteredValue: filteredInfo.status || null,
      onFilter: (value, record) => record.status == value,
      filterSearch: true,

      // render: (_, { status, id }) => {
      //   return (
      //     <>
      //       {status ? <Switch
      //         defaultChecked
      //         onChange={() => handlechangeStatus(id, status)}
      //       /> : <Switch
      //         onChange={() => handlechangeStatus(id, status)}
      //       />}
      //     </>
      //   );
      // }
      render: (_, { status }) => {
        let color = status ? 'green' : 'volcano';
        let title = status ? 'Active' : 'Not Active'
        return (
          <Tag color={color} key={title}>
            {title ? title.toUpperCase() : ''}
          </Tag>
        );
      },
    },

    {
      title: 'Action',
      width: '15%',
      dataIndex: 'operation',
      render: (_, record) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>


          <Button type="primary" onClick={() => { handleDeleteDoctorFromDepartment(record.id) }} danger icon={<DeleteOutlined />}>
            Delete
          </Button>

        </div>
      ),
    },
  ];

  console.log(department)

  return (
    <>
      {Object.keys(department).length == 0 ? <Spinner /> : <>

        <div className='d-lg-flex mb-5'>
          <div style={{ flexGrow: 1, marginTop: 35, width: '50%' }}>
            <h2>Edit Department - {department.status != null ?
              department.status == 0 ? <span style={{ color: 'red' }}>Not Active</span> : <span style={{ color: 'rgb(82, 196, 26)' }}>Active</span>
              : null
            }</h2>
            <hr className='w-75' />
            Welcome to the Department registration system. Please fill in the information below to create a new Department.

            <Form
              {...layout}
              name="control-hooks"
              onFinish={handleFormSubmit}
              style={{
                maxWidth: 600,
                marginTop: '45px'
              }}
            >

              <Form.Item
                label="Name"
                name="name"
                rules={[
                  { required: true, message: 'Please enter name' },
                  { max: 50, message: 'Name cannot exceed 50 characters' },
                ]}
                initialValue={department.name} // Sử dụng initialValue để hiển thị giá trị ban đầu
              >
                <Input onChange={(e) => onInputChangeForDepartment('name', e.target.value)} />
              </Form.Item>


              {/* <Form.Item label="Address">
                <Input value={department.url} onChange={(e) => onInputChangeForDepartment('url', e.target.value)} required />
              </Form.Item> */}



              {/* <Form.Item label="Select Status" name="status">
            <Select placeholder="Select Status" onChange={(e) => onInputChangeForDepartment('status', e)} >
              <Select.Option value="1">Active</Select.Option>
              <Select.Option value="0">Not Active</Select.Option>
            </Select>
          </Form.Item> */}

              {department.icon ?
                <Form.Item label="Icon">
                  <Image
                    width={100}
                    src={"https://medical-appointment-booking-api-production.up.railway.app/images/department/" + department.icon}
                  /></Form.Item> : <></>
              }
              <Form.Item label="Select Icon" valuePropName="fileList" getValueFromEvent={normFile}>
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

              <Form.Item className='text-end'>
                <Space>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </div>
          <div style={{ width: '50%' }}>
            <img src='/images/dashboard/department_create.jpg' alt="" className='w-100' />
          </div>
        </div>
        <h1 className='mb-5'>List doctor</h1>
        <Space
          style={{
            marginBottom: 16,
            width: '100%',
            justifyContent: 'space-between'
          }}
        >
          <Space>
            <Button onClick={clearFilters}>Clear filters and search</Button>
            <Button onClick={clearAll}>Clear All</Button>
          </Space>
          <Space>

            <Select
              placeholder="select doctor"
              style={{
                width: 220,
              }}
              options={doctorsNotDepartment}
              onChange={(value) => handleChangeDoctorSelect(value)}
              allowClear
              optionRender={(option) => (
                <Space>
                  <span role="img" aria-label={option.data.fullName}>
                    <img src={"https://medical-appointment-booking-api-production.up.railway.app/images/doctors/" + option.data.image} alt="" style={{ width: 30, height: 30, objectFit: 'cover', borderRadius: '50%', objectPosition: 'top' }} />
                    <span className='ms-3'>{option.data.fullName}</span>
                  </span>
                </Space>
              )}
            />
            <Button type="primary" icon={<PlusOutlined />} style={{ backgroundColor: '#52c41a' }} onClick={handleAddDoctorToDepartment}>
              Add
            </Button>
          </Space>

        </Space>
        <Table style={{ userSelect: 'none', minWidth: 1138 }} columns={columns} dataSource={doctors} onChange={handleChange} />

      </>}

    </>
  )
}

export default EditDepartment