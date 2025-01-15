import * as request from "../../ultils/request";


export const getAllAppointment = async () => {
    try {
        const response = await request.get(`appointment/all`);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getAppointmentDetail = async (id) => {
    console.log(id)
    try {
        const response = await request.get(`appointment/detail/${id}`);
        return response;
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const changeStatus = async (id,status) =>{
    try {
        const response = await request.put(`appointment/changestatus/${id}/${status}`);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}