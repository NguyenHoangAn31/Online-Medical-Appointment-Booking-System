import React, { useContext, useEffect, useRef, useState } from 'react';
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Popconfirm, Space, Spin, Switch, Table, Tag } from 'antd';
import Highlighter from 'react-highlight-words';
import { getAllDepartment, deleteDepartment } from '../../../../services/API/departmentService';
import { changeStatus } from '../../../../services/API/changeStatus';
import { Link } from 'react-router-dom';
import Spinner from '../../../../components/Spinner';
import { AlertContext } from '../../../../components/Layouts/DashBoard';
import { getAllAppointment } from '../../../../services/API/appointmentService';
import paypal from "../../../../assets/images/payment/paypal.png";
import momo from "../../../../assets/images/payment/momo.png";
import vnpay from "../../../../assets/images/payment/vnpay.png";


const ManageAppointment = () => {
  // thông báo
  const { openNotificationWithIcon } = useContext(AlertContext);
  // useState cho mảng dữ liệu departments
  const [appointments, setAppointments] = useState([]);
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



  const loadAppointments = async () => {
    const fetchedAppointments = await getAllAppointment();
    let appointmensWithKeys = fetchedAppointments.map((appointment, index) => ({
      ...appointment,
      key: index.toString(),
      image: appointment.patientDto.image,
      fullName: appointment.patientDto.fullName,
    }));
    appointmensWithKeys = appointmensWithKeys.reverse();
    setAppointments(appointmensWithKeys);


  };
  useEffect(() => {
    loadAppointments();
  }, []);



  console.log(appointments)


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
      width: '4%',
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
      width: '4.5%',
      render: (_, { image }) => {
        return (
          image ? <img src={"https://medical-appointment-booking-api-production.up.railway.app/images/patients/" + image} alt="" style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} /> : null);
      },

    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
      width: '8%',
      filteredValue: filteredInfo.fullName || null,
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
      sortOrder: sortedInfo.columnKey === 'fullName' ? sortedInfo.order : null,
      ellipsis: true,
      // search
      ...getColumnSearchProps('fullName'),
    },
    {
      title: 'Appointment Date',
      dataIndex: 'appointmentDate',
      key: 'appointmentDate',
      width: '8%',
      filteredValue: filteredInfo.appointmentDate || null,
      sorter: (a, b) => a.appointmentDate.localeCompare(b.appointmentDate),
      sortOrder: sortedInfo.columnKey === 'appointmentDate' ? sortedInfo.order : null,
      ellipsis: true,
      // search
      ...getColumnSearchProps('appointmentDate'),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: '7%',
      // sort 
      filteredValue: filteredInfo.price || null,
      sorter: (a, b) => a.price - b.price,
      sortOrder: sortedInfo.columnKey === 'price' ? sortedInfo.order : null,
      ellipsis: true,
      // search
      ...getColumnSearchProps('price'),

    },
    {
      title: 'Payment Method',
      dataIndex: 'payment',
      key: 'payment',
      width: '8%',
      filteredValue: filteredInfo.payment || null,
      sorter: (a, b) => a.payment.localeCompare(b.payment),
      sortOrder: sortedInfo.columnKey === 'payment' ? sortedInfo.order : null,
      ellipsis: true,
      // search
      ...getColumnSearchProps('payment'),
      render: (_, { payment }) => {
        var image;
        if (payment == 'paypal') {
          image = paypal

        } else if (payment == 'vnpay') {
          image = vnpay
        }
        return (
          payment ? <img src={image} alt="" style={{ width: '40px' }} /> : null);
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '6%',
      filters: [
        {
          text: 'completed',
          value: 'completed',
        },
        {
          text: 'waiting',
          value: 'waiting',
        },
        {
          text: 'cancelled',
          value: 'cancelled',
        }
      ],
      filteredValue: filteredInfo.status || null,
      onFilter: (value, record) => record.status == value,
      filterSearch: true,

      render: (_, { status }) => {
        let color;
        if (status == 'completed') {
          color = 'green'
        }
        else if (status == 'waiting') {
          color = 'warning'
        }
        else {
          color = 'red'
        }
        return (
          <Tag color={color} key={status}>
            {status ? status.toUpperCase() : ''}
          </Tag>
        );
      },
    },

    {
      title: 'Action',
      width: '6%',
      dataIndex: 'operation',
      render: (_, record) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Link style={{ marginRight: '16px' }}
            to={`/dashboard/admin/manage-appointment/detail?id=${record.id}`}>
            <Button type="primary" icon={<EyeOutlined />} >
              Detail
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
        }}
      >
        <Space>
          <Button onClick={clearFilters}>Clear filters and search</Button>
          <Button onClick={clearAll}>Clear All</Button>
        </Space>

      </Space>


      {appointments.length == 0 ? <Spinner /> : <Table style={{ userSelect: 'none', minWidth: 1138 }} columns={columns} dataSource={appointments} onChange={handleChange} />}
    </>
  )
};




export default ManageAppointment;


