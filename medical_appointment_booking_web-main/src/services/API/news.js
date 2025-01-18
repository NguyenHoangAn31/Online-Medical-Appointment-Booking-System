import * as request from "../../ultils/request";

export const getAllNews = async () => {
    try {
        const response = await request.get('news/all');
        return response
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const deleteNews = async (id) => {
    try {
        await request.remove(`news/delete/${id}`);
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const findNewsById = async (id) => {
    try {
        const response = await request.get(`news/${id}`);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const findNewsByIdForUpdate = async (id) => {
    try {
        const response = await request.get(`news/find_for_update/${id}`);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const addNews = async (news) => {
    try {
        await request.post(`news/create`,news);
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const updateNews = async (id,news) => {
    try {
        await request.put(`news/update/${id}`,news);
    } catch (error) {
        console.log(error);
        throw error;
    }
};




