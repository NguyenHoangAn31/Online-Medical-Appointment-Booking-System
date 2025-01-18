import * as request from "../../ultils/request";

export const getAllFeedback = async () => {
    try {
        const response = await request.get('feedback/all');
        return response
    } catch (error) {
        console.log(error);
        throw error;
    }
};



export const detailFeedback = async (id) => {
    try {
        const response = await request.get(`feedback/${id}`);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export const deleteFeedback = async (id) => {
    try {
        const response = await request.remove(`feedback/delete/${id}`);
        return response
    } catch (error) {
        console.log(error);
        throw error;
    }
};