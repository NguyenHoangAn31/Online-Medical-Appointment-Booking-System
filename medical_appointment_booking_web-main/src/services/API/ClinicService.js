import * as request from "../../ultils/request";

export const findAllWorkDay = async () => {
    try {
        const response = await request.get(`clinic/allday`);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const findScheduleByDay = async (day) => {
    try {
        const response = await request.get(`clinic/schedulebyday/${day}`);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
