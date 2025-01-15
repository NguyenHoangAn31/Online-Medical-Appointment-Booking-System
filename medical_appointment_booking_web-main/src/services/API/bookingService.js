import * as request from "../../ultils/request";


export const addAppointment = async (appointment) => {
    try {
        await request.post(`appointment/create`,appointment);
    } catch (error) {
        throw error;
    }
};