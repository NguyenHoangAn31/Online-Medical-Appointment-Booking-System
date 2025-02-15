import axios from "axios";

const request = axios.create({
    baseURL: 'https://medical-appointment-booking-api-production.up.railway.app/api/',
})

// Hàm tìm dữ liệu findAll or findById
export const get = async (path, option ={}) => {
    const response = await request.get(path, option);
    return response.data;

};

// Hàm create dử liệu

export const post = async (path , data, options = {}) => {
    const response = await request.post(path, data, options);
    return response.data;
}

// Hàm update dữ liệu
export const put = async (path, data, options = {}) => {
    const response = await request.put(path, data, options);
    return response.data;
}

// Hàm xóa dữ liệu
export const remove = async (path, options = {}) => {
    const response = await request.delete(path, options);
    return response.data;
}

export default request;