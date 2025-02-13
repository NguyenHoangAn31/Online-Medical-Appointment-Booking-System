import React, { useContext, useEffect, useRef, useState } from 'react';
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Popconfirm, Rate, Space, Spin, Switch, Table, Tag } from 'antd';
import Highlighter from 'react-highlight-words';
import { Link } from 'react-router-dom';
import { getAllDoctorWithStatus } from '../../../../services/API/doctorService';
import Spinner from '../../../../components/Spinner';
import { AlertContext } from '../../../../components/Layouts/DashBoard';
import getUserData from '../../../../route/CheckRouters/token/Token';
import { formatDate } from '../../../../ultils/formatDate';
import { changeStatus } from '../../../../services/API/changeStatus';

const ManageDoctor = () => {
  // thông báo
  const { openNotificationWithIcon } = useContext(AlertContext);
  // useState cho mảng dữ liệu doctor
  const [doctors, setDoctors] = useState([]);
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



  // tải dữ liệu và gán vào doctors thông qua hàm setDoctors
  const loadDoctors = async () => {
    const fetchedDoctors = await getAllDoctorWithStatus();
    // thêm key vào mỗi doctor
    const doctorWithKeys = fetchedDoctors.map((doctor, index) => ({
      ...doctor,
      key: index.toString(),
    }));
    setDoctors(doctorWithKeys);
  };
  // thực hiện load dữ liệu 1 lần 
  useEffect(() => {
    loadDoctors();
  }, []);

  const handlechangeStatus = async (id, status) => {
    try {
      var convertStatus = status ? 1 : 0;
      await changeStatus('doctor', id, convertStatus);
      openNotificationWithIcon('success', 'Change Status Doctor Successfully', '')
      loadDoctors();
    } catch (error) {
      openNotificationWithIcon('error', 'Something Went Wrong', '')
      console.log(error)
    }
  };



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

      render: (_, { status, id }) => {
        return (
          <>
            {status ? <Switch
              defaultChecked
              onChange={() => handlechangeStatus(id, status)}
            /> : <Switch
              onChange={() => handlechangeStatus(id, status)}
            />}
          </>
        );
      }
      // render: (_, { status }) => {
      //   let color = status ? 'green' : 'volcano';
      //   let title = status ? 'Active' : 'Not Active'
      //   return (
      //     <Tag color={color} key={title}>
      //       {title ? title.toUpperCase() : ''}
      //     </Tag>
      //   );
      // },
    },

    {
      title: 'Action',
      width: '15%',
      dataIndex: 'operation',
      render: (_, record) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Link style={{ marginRight: '16px' }}
            to={`/dashboard/admin/manage-doctor/detail?id=${record.id}`}>
            <Button type="primary" icon={<EyeOutlined />} >
              Information
            </Button>
          </Link>

          <Link style={{ marginRight: '16px', }}
            to={`/dashboard/admin/manage-doctor/edit?id=${record.id}`} >
            <Button type="primary" icon={<EditOutlined />} style={{ backgroundColor: 'orange' }}>
              Edit
            </Button>
          </Link>

        </div>
      ),
    },
  ];
  return (
    <>
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
      </Space>

      {doctors.length != 0 ? <Table style={{ userSelect: 'none' }} columns={columns} dataSource={doctors} onChange={handleChange} /> : <Spinner />}
    </>
  )
};




export default ManageDoctor;