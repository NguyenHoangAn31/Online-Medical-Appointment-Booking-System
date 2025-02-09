import React, { useEffect, useState, createContext, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import getUserData from '../../../route/CheckRouters/token/Token';
// import { getAuth, signOut } from "firebase/auth";

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    FireFilled,
    BulbOutlined,
    DashboardOutlined,
    ProfileOutlined,
    ScheduleOutlined,
    LogoutOutlined,
    DashboardTwoTone,
    ShopTwoTone,
    CreditCardTwoTone,
    CalendarTwoTone,
    HighlightTwoTone,
    QuestionCircleTwoTone,
    BellTwoTone,
    CarryOutTwoTone,
    SettingTwoTone,
    ContactsTwoTone,
    AppstoreTwoTone,
    UserOutlined,
} from '@ant-design/icons';
import { Button, Breadcrumb, Layout, Menu, theme, Dropdown, Space, Badge } from 'antd';
import openAlert from '../../openAlert';
const { Header, Content, Footer, Sider } = Layout;




export const AlertContext = createContext();


const DashBoardLayout = ({ children }) => {

    var itemslist = []
    const [currentUser, setCurrentUser] = useState()

    if (currentUser != null) {
        var role = currentUser.user.roles[0];
        if (role == "ADMIN") {
            itemslist.push(
                {
                    label: "Dashboard",
                    icon: <DashboardTwoTone twoToneColor='blue' />,
                    key: "/dashboard/admin",
                },
                {
                    label: "Manage User",
                    icon: <ContactsTwoTone twoToneColor='#6699cc' />,
                    key: "/dashboard/admin/manage-user",
                },
                // {
                //     label: "Manage Patient",
                //     key: "/dashboard/admin/manage-patient",
                //     icon: <MedicineBoxTwoTone twoToneColor='red' />,
                // },
                // {
                //     label: "Manage Doctor",
                //     key: "/dashboard/admin/manage-doctor",
                //     icon: <IdcardTwoTone twoToneColor='green' />,
                // },
                {
                    label: "Manage Department",
                    key: "/dashboard/admin/manage-department",
                    icon: <ShopTwoTone twoToneColor='#c6c243' />,
                },
                // {
                //     label: "Manage Slot",
                //     key: "/dashboard/admin/manage-slot",
                //     icon: <FieldTimeOutlined />,
                // },
                {
                    label: "Manage Feedback",
                    key: "/dashboard/admin/manage-feedback",
                    icon: <QuestionCircleTwoTone twoToneColor='#eb2f96' />,
                },
                {
                    label: "Manage Schedule",
                    key: "/dashboard/admin/manage-schedule",
                    icon: <CalendarTwoTone twoToneColor='#f081ff' />,
                },
                {

                    label: "Manage Appointment",
                    key: "/dashboard/admin/manage-appointment",
                    icon: <CreditCardTwoTone twoToneColor='purple' />,
                }
                ,
                {
                    label: "Manage Revenue",
                    key: "/dashboard/admin/manage-revenue",
                    icon: <AppstoreTwoTone twoToneColor='' />
                }
                ,
                {
                    label: "Manage News",
                    key: "/dashboard/admin/manage-news",
                    icon: <HighlightTwoTone twoToneColor='#00fff6' />,
                }
            )
        }
        else if (role == "DOCTOR") {
            itemslist.push(
                {
                    label: "Dashboard",
                    key: "/dashboard/doctor",
                    icon: <DashboardOutlined />,
                },
                {
                    label: "Schedule",
                    key: "/dashboard/doctor/schedule",
                    icon: <ScheduleOutlined />,
                },
                {
                    label: "List Patients",
                    key: "/dashboard/doctor/list-patient",
                    icon: <UserOutlined />,
                }
            )
        }
    }


    const [collapsed, setCollapsed] = useState(false);
    const [darkTheme, setDarkTheme] = useState(false);
    const navigate = useNavigate();


    const toggleTheme = () => {
        setDarkTheme(!darkTheme)
    }
    // thông báo 

    const [openNotificationWithIcon, contextHolder] = openAlert();

    // Breadcrumb
    const location = useLocation();
    const pathname = location.pathname;
    const paths = pathname.split('/').filter(path => path !== '');
    const curentPath = paths.slice(2).join(' / ');
    // xử lý logout
    const handleLogout = () => {
        localStorage.removeItem("Token");
        navigate("/");

        // const auth = getAuth();
        // signOut(auth).then(() => {
        //     navigate("/");
        // }).catch((error) => {
        //     console.log(error)
        // });
    }

    const [selectedKeys, setSelectedKeys] = useState("/");

    useEffect(() => {
        setSelectedKeys(pathname);
        document.body.style.backgroundColor = '#f4f7fe';
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, [location.pathname]);

    useEffect(() => {
        setCurrentUser(getUserData())

        const handleResize = () => {
            if (window.innerWidth <= 1100) {
                setCollapsed(true);
            } else {
                setCollapsed(false);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);



    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();


    return (
        <AlertContext.Provider value={{ openNotificationWithIcon, currentUser }}>

            <Layout
                style={{
                    backgroundColor: '#f4f7fe',
                    paddingBottom: '50px'
                }}
            >
                {contextHolder}
                <Sider theme={darkTheme ? 'dark' : 'light'} width={250} trigger={null} collapsible collapsed={collapsed}
                    style={{
                        position: 'fixed',
                        height: '100vh',
                        zIndex: 999,
                        overflow: 'auto'
                    }}
                >
                    <div style={{ textAlign: 'center', color: 'white', fontSize: '45px', margin: '20px 0' }}>
                        <div style={{ width: 60, height: 60, display: 'flex', margin: 'auto', backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', borderRadius: '50%' }}>
                            <FireFilled />
                        </div>
                    </div>
                    <Menu theme={darkTheme ? 'dark' : 'light'}
                        className="SideMenuVertical"
                        mode="vertical"
                        onClick={(item) => {
                            navigate(item.key);
                        }}
                        selectedKeys={[selectedKeys]}
                        items={itemslist}
                        style={{
                            userSelect: 'none',
                            border: 'none'
                        }}
                    ></Menu>
                    <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
                </Sider>


                <Layout style={{ marginLeft: collapsed ? 80 : 250, transition: '.2s', paddingTop: '115px', backgroundColor: '#f4f7fe' }}>
                    <Header
                        className='header_dashboard'
                        style={{
                            background: colorBgContainer,
                            left: collapsed ? 106 : 276,
                            transition: '.2s',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            top: '14px',
                            right: '26px',
                            zIndex: 998,
                            position: 'fixed',
                            display: 'flex',
                            justifyContent: 'space-between',
                            height: '100px',
                            padding: '10px',
                            backgroundColor: 'transparent',
                            backdropFilter: 'blur(10px)',

                        }}
                    >
                        <div className='bread_crumb' style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <Button
                                className='toggle-sidebar'
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    fontSize: '16px',
                                    width: 64,
                                    height: 64,
                                    float: 'left'
                                }}
                            />

                            <div>
                                <Breadcrumb style={{ float: 'left', color: 'black' }}>
                                    <Breadcrumb.Item>pages</Breadcrumb.Item>
                                    <Breadcrumb.Item>{curentPath != '' ? curentPath : 'Main Dashboard'}</Breadcrumb.Item>
                                </Breadcrumb>
                                <h1 style={{ clear: 'both' }}>{curentPath != '' ? curentPath : 'Main Dashboard'}</h1>
                            </div>

                        </div>



                        <div className='nav_info' style={{ display: 'flex', float: 'right', alignItems: 'center', gap: '25px', userSelect: 'none', borderRadius: "50px", padding: "0 25px", backgroundColor: "white", height: '65px' }}>
                            <Dropdown
                                menu={{
                                    items: [
                                        {
                                            key: '1',
                                            label: (
                                                <a target="_blank" rel="noopener noreferrer">
                                                    1st menu item
                                                </a>
                                            ),
                                        },
                                        {
                                            key: '2',
                                            label: (
                                                <a target="_blank" rel="noopener noreferrer">
                                                    2nd menu item
                                                </a>
                                            ),
                                        },
                                        {
                                            key: '3',
                                            label: (
                                                <a target="_blank" rel="noopener noreferrer">
                                                    3rd menu item
                                                </a>
                                            ),
                                        },
                                    ]
                                }}
                                placement="bottomRight"
                            >
                                <Badge count={5}>
                                    <BellTwoTone style={{ fontSize: '20px' }} />
                                </Badge>
                            </Dropdown>


                            <Dropdown
                                menu={{
                                    items: [
                                        {
                                            key: '1',
                                            label: (
                                                <a target="_blank" rel="noopener noreferrer">
                                                    1st menu item
                                                </a>
                                            ),
                                        },
                                        {
                                            key: '2',
                                            label: (
                                                <a target="_blank" rel="noopener noreferrer">
                                                    2nd menu item
                                                </a>
                                            ),
                                        },
                                        {
                                            key: '3',
                                            label: (
                                                <a target="_blank" rel="noopener noreferrer">
                                                    3rd menu item
                                                </a>
                                            ),
                                        },
                                    ]
                                }}
                                placement="bottomRight"
                            >
                                <Badge count={5}>
                                    <CarryOutTwoTone style={{ fontSize: '20px' }} />
                                </Badge>
                            </Dropdown>

                            <Dropdown
                                menu={{
                                    items: [{
                                        key: '1',
                                        label: (
                                            <Link style={{ textDecoration: 'none', userSelect: 'none' }} to={role === "ADMIN" ? "/dashboard/admin/profile" : "/dashboard/doctor/profile"}>
                                                <ProfileOutlined /> <span style={{ marginLeft: '7px' }}>Profile</span>
                                            </Link>
                                        ),
                                    },
                                    {
                                        key: '2',
                                        label: (
                                            <span onClick={handleLogout} style={{ userSelect: 'none' }}>
                                                <LogoutOutlined /><span style={{ marginLeft: '7px' }}>Logout</span>
                                            </span>
                                        ),
                                    },],
                                }}
                                placement="bottom"
                            >
                                <SettingTwoTone style={{ fontSize: '20px' }} />


                            </Dropdown>
                            <div className='account' style={{ whiteSpace: 'nowrap' }}>
                                <img
                                    src="/images/dashboard/default_user.jpg"
                                    alt=""
                                    height="50"
                                    width="50"
                                    style={{
                                        borderRadius: '50%',
                                        marginRight: '10px'
                                    }}
                                />
                                <span>{currentUser != null ? currentUser.user.fullName : null}</span>

                            </div>
                        </div>
                    </Header>
                    <Content
                        className='content_dashboard'
                        style={{
                            margin: '0 26px',
                        }}
                    >
                        <div
                            style={{
                                overflow: 'auto',
                                padding: 24,
                                minHeight: 360,
                                position: 'relative',
                                background: (curentPath !== '' && curentPath !== 'profile' && curentPath !== 'manage-user / admindetail') ? colorBgContainer : 'none',
                                borderRadius: '10px',
                            }}
                        >
                            {children}
                        </div>
                    </Content>
                    <Footer
                        style={{
                            textAlign: 'center',
                            backgroundColor: 'rgb(244, 247, 254)'
                        }}
                    >
                        Ant Design ©{new Date().getFullYear()} Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        </AlertContext.Provider>

    );


};


const ToggleThemeButton = ({ toggleTheme }) => {
    return (
        <div style={{
            bottom: 17,
            left: 17,
            position: 'fixed'
        }} >
            <Button onClick={toggleTheme}>
                <BulbOutlined />

            </Button>
        </div>
    )
}
export default DashBoardLayout;





