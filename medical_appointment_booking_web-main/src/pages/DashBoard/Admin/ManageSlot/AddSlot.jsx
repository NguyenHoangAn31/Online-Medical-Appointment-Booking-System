import React, { useContext, useState } from 'react'
import {
    Button,
    Form,
    Input,
    Space,
    TimePicker,
} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import { addSlot } from '../../../../services/API/slotService';
import { AlertContext } from '../../../../components/Layouts/DashBoard';


const layout = {
    labelCol: {
        span: 8,
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

function AddSlot() {
    // thông báo
    const {openNotificationWithIcon} = useContext(AlertContext);

    // chuyển trang
    const navigate = useNavigate();

    // tạo đối tượng slot
    const [slot, setSlot] = useState({
        name: '',
    });

    const [form] = Form.useForm();

    const onInputChange = (name, value) => {
        setSlot({ ...slot, [name]: value });
    };

    //reset field
    const onReset = () => {
        form.resetFields();
    };

    // xử lí submit
    const handleFormSubmit = async () => {
        try {
            await addSlot(slot);
            openNotificationWithIcon('success', 'Add New Slot Successfully', '')
            navigate("/dashboard/admin/manage-slot");

        }
        catch (error) {
            console.log(error)
            openNotificationWithIcon('error', 'Error Creating New Slot', '')

        }
    };
    return (
        <>
            {/* <Link to={`/dashboard/admin/manage-slot`}><LeftOutlined /> Back To Slot</Link> */}
            <h2>Add New Slot</h2>
            <Form
                {...layout}
                form={form}
                name="control-hooks"
                onFinish={handleFormSubmit}
                style={{
                    maxWidth: 600,
                    marginTop: '45px'
                }}
            >
                <Form.Item
                    label="Time"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please select time!',
                        },
                    ]}
                >
                    <TimePicker format="HH:mm" onChange={(e) => onInputChange("name", e.format('HH:mm'))} />
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

export default AddSlot