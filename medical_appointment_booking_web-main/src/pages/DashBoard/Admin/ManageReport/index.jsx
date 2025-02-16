import React, { useContext, useEffect, useRef, useState } from 'react';
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Popconfirm, Rate, Space, Spin, Switch, Table, Tag } from 'antd';
import Highlighter from 'react-highlight-words';
import { Link } from 'react-router-dom';
import { getAllDoctorWithStatus } from '../../../../services/API/doctorService';
import Spinner from '../../../../components/Spinner';
import { AlertContext } from '../../../../components/Layouts/DashBoard';
import getUserData from '../../../../route/CheckRouters/token/Token';
import { formatDate, formatDateFromJs } from '../../../../ultils/formatDate';
import { changeStatus } from '../../../../services/API/changeStatus';
import { getAllReport, getAllReportByDay } from '../../../../services/API/reportService';
import * as XLSX from 'xlsx';


const { RangePicker } = DatePicker;

const ManageReport = () => {
  // thông báo
  const { openNotificationWithIcon } = useContext(AlertContext);
  const [report, setReport] = useState([]);
  // useState clear search , sort
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  // useState cho search
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [displayDay, setDisplayDay] = useState(formatDate(formatDateFromJs(new Date())));

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

  useEffect(() => {
    loadReport();
  }, []);


  const loadReport = async (fetchrp) => {
    var fetchedReport = fetchrp ? fetchrp : await getAllReport();
    const reportWithKeys = fetchedReport.map((report, index) => ({
      ...report,
      key: (index + 1).toString(),
    }));
    const total = fetchedReport.reduce((total, item) => {

      return total + item.total;
    }, 0);
    setTotalPrice(total)
    setReport(reportWithKeys);
  };


  const onInputChange = async (value) => {
    if (value != null) {
      const formatWithLeadingZero = (number) => (number < 10 ? '0' + number : number);

      const startDateString = value[0].$y + "-" + formatWithLeadingZero(value[0].$M + 1) + "-" + formatWithLeadingZero(value[0].$D);
      const endDateString = value[1].$y + "-" + formatWithLeadingZero(value[1].$M + 1) + "-" + formatWithLeadingZero(value[1].$D);
      setStartDate(startDateString);
      setEndDate(endDateString);
    }
    else {
      setStartDate('')
      setEndDate('')
    }
  }

  const handleSearchByDate = async () => {
    try {
      if (startDate != '' || endDate != '') {
        loadReport(await getAllReportByDay(startDate, endDate));
        setDisplayDay(formatDate(startDate) + " - " + formatDate(endDate))
      }
      else {
        setDisplayDay(formatDate(formatDateFromJs(new Date())))
        loadReport();
      }
    } catch (error) {
      console.log(error)
    }
  }

  const downloadExcel = (data) => {

    const filteredData = data.map(item => {
      const { id, image, key, ...rest } = item;
      return rest;
    });

    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
    //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workbook, "DataSheet.xlsx");
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
      dataIndex: 'key',
      key: 'key',
      width: '4%',
      // sort 
      filteredValue: filteredInfo.key || null,
      sorter: (a, b) => a.key - b.key,
      sortOrder: sortedInfo.columnKey === 'key' ? sortedInfo.order : null,
      ellipsis: true,
      // search
      ...getColumnSearchProps('key'),
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      width: '5%',
      render: (_, { image }) => {
        return (
          image ? <img src={"https://medical-appointment-booking-api-production.up.railway.app/images/doctors/" + image} width="50" alt="" /> : null);
      },

    },
    {
      title: 'Name',
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
      title: 'Examination Price',
      dataIndex: 'price',
      key: 'price',
      width: '8%',
      // sort 
      filteredValue: filteredInfo.price || null,
      sorter: (a, b) => a.price - b.price,
      sortOrder: sortedInfo.columnKey === 'price' ? sortedInfo.order : null,
      ellipsis: true,
      // search
      ...getColumnSearchProps('price'),
    },

    {
      title: 'Booked',
      dataIndex: 'countBook',
      key: 'countBook',
      width: '6%',
      // sort 
      filteredValue: filteredInfo.countBook || null,
      sorter: (a, b) => a.countBook - b.countBook,
      sortOrder: sortedInfo.columnKey === 'countBook' ? sortedInfo.order : null,
      ellipsis: true,
      // search
      ...getColumnSearchProps('countBook'),

    },
    {
      title: 'Completed',
      dataIndex: 'countFinished',
      key: 'countFinished',
      width: '6%',
      // sort 
      filteredValue: filteredInfo.countFinished || null,
      sorter: (a, b) => a.countFinished - b.countFinished,
      sortOrder: sortedInfo.columnKey === 'countFinished' ? sortedInfo.order : null,
      ellipsis: true,
      // search
      ...getColumnSearchProps('countFinished'),

    },
    {
      title: 'Total Price',
      dataIndex: 'total',
      key: 'total',
      width: '6%',
      // sort 
      filteredValue: filteredInfo.total || null,
      sorter: (a, b) => a.total - b.total,
      sortOrder: sortedInfo.columnKey === 'total' ? sortedInfo.order : null,
      ellipsis: true,
      // search
      ...getColumnSearchProps('total'),

    },


  ];
  return (
    <>
      <div className='d-flex justify-content-between'>
        <div>

          {/* <p className='fs-5'>Day : {displayDay}</p> */}
          <Form.Item
            style={{ marginBottom: 10 }}
            label="Search Day"
            name="RangePicker"
          >
            <RangePicker onChange={(e) => onInputChange(e)} />
            <Button className='mx-2' type='primary' onClick={handleSearchByDate}>Search</Button>

          </Form.Item>

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
              <Button onClick={() => { downloadExcel(report) }}>Export Excel <img src="/images/dashboard/excel.png" style={{ padding: "0 0 3px 4px" }} width='25' /></Button>

            </Space>

          </Space>
        </div>
        <div className='text-center me-4'>
          <h2>Total Price</h2>
          <span className='text-danger fs-4'>{totalPrice} (VND)</span>
        </div>
      </div>

      {report.length == 0 ? <Spinner /> : <Table style={{ userSelect: 'none' }} columns={columns} dataSource={report} onChange={handleChange} />}
    </>
  )
};




export default ManageReport;