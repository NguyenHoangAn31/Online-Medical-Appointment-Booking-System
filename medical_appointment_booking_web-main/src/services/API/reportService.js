import * as request from "../../ultils/request";


export const getStatistical = async () => {
    try {
        const response = await request.get(`report/statistical`);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getAllReport = async () => {
    try {
        const response = await request.get(`report/revenuetoday`);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const getAllReportByDay = async (startDate,endDate) => {
    console.log(startDate,endDate)
    try {
        const response = await request.get(`report/findrevenuebyday/${startDate}/${endDate}`);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}