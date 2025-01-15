import * as request from "../../ultils/request";

export const changeStatus = async (service, id, stauts) => {
    try {
        const response = await request.put(`${service}/changestatus/${id}/${stauts}`);
        return response
    } catch (error) {
        console.log(error);
        throw error;
    }
};