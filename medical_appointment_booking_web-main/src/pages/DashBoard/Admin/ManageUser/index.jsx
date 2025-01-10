import React, { useContext, useEffect, useRef, useState } from 'react';
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Modal, Popconfirm, Rate, Space, Spin, Switch, Table, Tag } from 'antd';
import Highlighter from 'react-highlight-words';
import { Link } from 'react-router-dom';
import Spinner from '../../../../components/Spinner';
import { AlertContext } from '../../../../components/Layouts/DashBoard';
import { formatDate } from '../../../../ultils/formatDate';
import { getAllUser } from '../../../../services/API/userService';

const ManageUser = () => {

  // // modal
  // const [open, setOpen] = useState(false);
  // const showModal = () => {
  //   setOpen(true);
  // };
  // const handleOk = () => {
  //   setOpen(false);

  // };
  // const handleCancel = () => {
  //   setOpen(false);
  // };
  // const onFinish = (values) => {
  //   console.log('Success:', values);
  // };
  // const onFinishFailed = (errorInfo) => {
  //   console.log('Failed:', errorInfo);
  // };


  // thông báo
  const { openNotificationWithIcon } = useContext(AlertContext);
  // useState cho mảng dữ liệu users
  const [users, setUsers] = useState([]);
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


  // tải dữ liệu và gán vào users thông qua hàm setUsers
  const loadUsers = async () => {
    const fetchedUsers = await getAllUser();
    // thêm key vào mỗi user
    const userWithKeys = fetchedUsers.map((user, index) => ({
      ...user,
      key: index.toString(),
    }));
    setUsers(userWithKeys);
  };
  // thực hiện load dữ liệu 1 lần 
  useEffect(() => {
    loadUsers();
  }, []);




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
      width: '5%',
      // sort 
      filteredValue: filteredInfo.id || null,
      sorter: (a, b) => a.id - b.id,
      sortOrder: sortedInfo.columnKey === 'id' ? sortedInfo.order : null,
      ellipsis: true,
      // search
      ...getColumnSearchProps('id'),

    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '15%',
      filteredValue: filteredInfo.email || null,
      sorter: (a, b) => a.email.localeCompare(b.email),
      sortOrder: sortedInfo.columnKey === 'email' ? sortedInfo.order : null,
      ellipsis: true,
      // search
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Name',
      dataIndex: 'fullName',
      key: 'fullName',
      width: '10%',
      filteredValue: filteredInfo.fullName || null,
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
      sortOrder: sortedInfo.columnKey === 'fullName' ? sortedInfo.order : null,
      ellipsis: true,
      // search
      ...getColumnSearchProps('fullName'),
    },
    {
      title: 'Role',
      dataIndex: 'roles',
      key: 'roles',
      width: '8%',
      filters: [
        {
          text: 'User',
          value: 'USER',
        },
        {
          text: 'Doctor',
          value: 'DOCTOR',
        },
        {
          text: 'Admin',
          value: 'ADMIN',
        },
      ],
      filteredValue: filteredInfo.roles || null,
      onFilter: (value, record) => record.roles[0] == value,
    },
    {
      title: 'Provider',
      dataIndex: 'provider',
      key: 'provider',
      width: '8%',
      filters: [
        {
          text: 'Gmail',
          value: 'gmail',
        },
        {
          text: 'Phone',
          value: 'phone',
        },
      ],
      filteredValue: filteredInfo.provider || null,
      onFilter: (value, record) => record.provider == value,

    },
    {
      title: 'Action',
      width: '10%',
      dataIndex: 'operation',
      render: (_, record) => {
        let redirectUrl;
        const role = record.roles[0];
        if (role === 'ADMIN') {
          redirectUrl = `/dashboard/admin/manage-user/admindetail?id=${record.id}`;
        } else if (role === 'DOCTOR') {
          redirectUrl = `/dashboard/admin/manage-user/doctordetail?id=${record.id}`;
        } else if (role === 'USER') {
          redirectUrl = `/dashboard/admin/manage-user/patientdetail?id=${record.id}`;
        }

        return (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Link style={{ marginRight: '16px' }} to={redirectUrl}>
              <Button type="primary" icon={<EyeOutlined />} >
                Information
              </Button>
            </Link>
          </div>
        );
      }

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

        <div className='d-flex gap-3'>
          <>
            <Link to="/dashboard/admin/manage-user/create">
              <Button type="primary" icon={<PlusOutlined />} style={{ backgroundColor: '#52c41a' }}>
                Add New Account
              </Button>
            </Link>

            {/* <Button onClick={showModal} icon={<PlusOutlined />}>
              Add New Doctor
            </Button>

            <Modal
              open={open}
              title="Email Information"
              onOk={handleOk}
              onCancel={handleCancel}
              footer={[
                <Form
                  name="basic"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: 'Please input Email!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Space>
                    <Button key="back" onClick={handleCancel}>
                      Cancel
                    </Button>

                    <Button type="primary" htmlType="submit">
                      Send
                    </Button>
                  </Space>
                </Form>
              ]}
            >
            </Modal> */}

          </>
        </div>
      </Space>
      {users.length != 0 ? <Table style={{ userSelect: 'none' , minWidth:1138}} columns={columns} dataSource={users} onChange={handleChange} /> : <Spinner />}
    </>
  )
};




export default ManageUser;