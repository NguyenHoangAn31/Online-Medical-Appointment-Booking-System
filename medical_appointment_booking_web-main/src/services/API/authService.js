import * as request from "../../ultils/request";

export const sendOtp = async (data) =>{
    try {
        const res =  await request.post('auth/send-otp', {data: data});
        return res.data;

    } catch (error) {
    }
}