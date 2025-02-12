import React, { useContext, useEffect, useRef, useState } from 'react';
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Popconfirm, Space, Spin, Switch, Table, Tag } from 'antd';
import Highlighter from 'react-highlight-words';
import { getAllDepartment, deleteDepartment } from '../../../../services/API/departmentService';
import { changeStatus } from '../../../../services/API/changeStatus';
import { Link } from 'react-router-dom';
import Spinner from '../../../../components/Spinner';
import { AlertContext } from '../../../../components/Layouts/DashBoard';

const ManageDepartment = () => {
  // thông báo
  const { openNotificationWithIcon } = useContext(AlertContext);
  // useState cho mảng dữ liệu departments
  const [departments, setDepartments] = useState([]);
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



  // tải dữ liệu và gán vào departments thông qua hàm setDepartments
  const loadDepartments = async () => {
    const fetchedDepartments = await getAllDepartment();
    // thêm key vào mỗi department
    const departmentsWithKeys = fetchedDepartments.map((department, index) => ({
      ...department,
      key: index.toString(),
    }));
    setDepartments(departmentsWithKeys);
  };
  // thực hiện load dữ liệu 1 lần 
  useEffect(() => {
    loadDepartments();
  }, []);
  // xóa record và reload lại và gọi lại hàm reload dữ liệu
  const delete_Department = async (id) => {
    try {
      await deleteDepartment(id);
      loadDepartments();
      openNotificationWithIcon('success', 'Deletete Department Successfully', '')
    } catch (error) {
      Alert('warning', 'something Went Wrong', '')
      console.log(error)
    }
  };

  // thay đổi trạng thái
  const handlechangeStatus = async (id, status) => {
    try {
      await changeStatus('department', id, status);
      openNotificationWithIcon('success', 'Change Status Feedback Successfully', '')

      loadDepartments();
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
      width: '8%',
      // sort 
      filteredValue: filteredInfo.id || null,
      sorter: (a, b) => a.id - b.id,
      sortOrder: sortedInfo.columnKey === 'id' ? sortedInfo.order : null,
      ellipsis: true,
      // search
      ...getColumnSearchProps('id'),

    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '16%',
      filteredValue: filteredInfo.name || null,
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
      ellipsis: true,
      // search
      ...getColumnSearchProps('name'),

    },
    {
      title: 'Icon',
      dataIndex: 'icon',
      key: 'icon',
      width: '10%',
      render: (_, { icon }) => {
        return (
          icon ? <img src={"https://medical-appointment-booking-api-production.up.railway.app/images/department/" + icon} width="50" alt="" /> : null);
      },

    },
    {
      title: 'Url',
      dataIndex: 'url',
      key: 'url',
      width: '16%',
      filteredValue: filteredInfo.url || null,
      sorter: (a, b) => a.url.localeCompare(b.url),
      sortOrder: sortedInfo.columnKey === 'url' ? sortedInfo.order : null,
      ellipsis: true,
      // search
      ...getColumnSearchProps('url'),


    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '10%',
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
      width: '16%',
      dataIndex: 'operation',
      render: (_, record) => (
        <div style={{ display: 'flex' }}>
          <Link style={{ marginRight: '16px', color: 'blue' }}
            to={`/dashboard/admin/manage-department/edit?id=${record.id}&slug=${record.url}`}>
            <Button type="primary" icon={<EditOutlined />} style={{ backgroundColor: 'orange' }} >
              Edit
            </Button>
          </Link>
          {departments.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => delete_Department(record.id)}>
              <Button type="primary" disabled={record.status} danger icon={<DeleteOutlined />}>Delete</Button>
            </Popconfirm>
          ) : null}
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

        <Link to="/dashboard/admin/manage-department/create">
          <Button type="primary" icon={<PlusOutlined />} style={{ backgroundColor: '#52c41a' }}>
            Add New Department
          </Button>
        </Link>
      </Space>


      {departments.length != 0 ? <Table style={{ userSelect: 'none', minWidth: 1138 }} columns={columns} dataSource={departments} onChange={handleChange} /> : <Spinner />}
    </>
  )
};




export default ManageDepartment;