import React, { useContext, useEffect, useRef, useState } from 'react';
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Popconfirm, Space, Spin, Switch, Table, Tag } from 'antd';
import Highlighter from 'react-highlight-words';
import { getAllNews, deleteNews } from '../../../../services/API/news';
import { changeStatus } from '../../../../services/API/changeStatus';
import { Link } from 'react-router-dom';
import Spinner from '../../../../components/Spinner';
import { AlertContext } from '../../../../components/Layouts/DashBoard';
import getUserData from '../../../../route/CheckRouters/token/Token';

const ManageNews = () => {
  const { currentUser } = useContext(AlertContext);
  // thông báo
  const { openNotificationWithIcon } = useContext(AlertContext);
  // useState cho mảng dữ liệu news
  const [news, setNews] = useState([]);
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



  // tải dữ liệu và gán vào news thông qua hàm setnews
  const loadNews = async () => {
    const fetchedNews = await getAllNews();
    // thêm key vào mỗi news
    const newsWithKeys = fetchedNews.map((news, index) => ({
      ...news,
      key: index.toString(),
    }));
    setNews(newsWithKeys);
  };

  // thực hiện load dữ liệu 1 lần 
  useEffect(() => {
    loadNews();
  }, []);
  // xóa record và reload lại và gọi lại hàm reload dữ liệu
  const delete_News = async (id) => {
    try {
      await deleteNews(id);
      loadNews();
      openNotificationWithIcon('success', 'Deletete News Successfully', '')
    } catch (error) {
      Alert('warning', 'This News Is Active', '')
      console.log(error)
    }

  };

  // thay đổi trạng thái
  const handlechangeStatus = async (id, status) => {
    try {
      await changeStatus('news', id, status);
      openNotificationWithIcon('success', 'Change Status Feedback Successfully', '')
      loadNews();
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
      width: '10.666%',
      // sort 
      filteredValue: filteredInfo.id || null,
      sorter: (a, b) => a.id - b.id,
      sortOrder: sortedInfo.columnKey === 'id' ? sortedInfo.order : null,
      ellipsis: true,
      // search
      ...getColumnSearchProps('id'),

    },
    {
      title: 'Creator',
      dataIndex: 'creator_email',
      key: 'creator_email',
      width: '18.666%',
      filteredValue: filteredInfo.creator_email || null,
      sorter: (a, b) => a.creator_email.localeCompare(b.creator_email),
      sortOrder: sortedInfo.columnKey === 'creator_email' ? sortedInfo.order : null,
      ellipsis: true,
      // search
      ...getColumnSearchProps('creator_email'),

    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      width: '13.666%',
      render: (_, { image }) => {
        return (
          image ? <img src={"https://medical-appointment-booking-api-production.up.railway.app/images/news/" + image} width="75" alt="" /> : null);
      },

    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
      width: '16.666%',
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
      width: '10.666%',
      filters: [
        {
          text: 'Show',
          value: 1,
        },
        {
          text: 'Hide',
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
    },

    {
      title: 'Action',
      dataIndex: 'operation',
      render: (_, record) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Link style={{ marginRight: '16px' }}
            to={`/dashboard/admin/manage-news/detail?id=${record.id}`}>
            <Button type="primary" icon={<EyeOutlined />} >
              View
            </Button>
          </Link>


          <Link style={{ marginRight: '16px' }}
            to={`/dashboard/admin/manage-news/edit?id=${record.id}`}>
            <Button type="primary" icon={<EditOutlined />} style={{ backgroundColor: 'orange' }}>
              Edit
            </Button>
          </Link>
          {news.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => delete_News(record.id)}>
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

        <Link to="/dashboard/admin/manage-news/create">
          <Button type="primary" icon={<PlusOutlined />} style={{ backgroundColor: '#52c41a' }}>
            Add New News
          </Button>
        </Link>
      </Space>

      {news.length != 0 ? <Table style={{ userSelect: 'none' }} columns={columns} dataSource={news} onChange={handleChange} /> : <Spinner />}
    </>
  )
};




export default ManageNews;