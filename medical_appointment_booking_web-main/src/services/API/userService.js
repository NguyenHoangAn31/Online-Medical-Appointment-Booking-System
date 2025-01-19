import * as request from "../../ultils/request";


export const getAllUser = async () => {
    try {
        const response = await request.get('user');
        return response
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const findUserById = async (id) => {
    try {
        const response = await request.get(`user/${id}`);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const createUser = async (user) => {
    try {
        const response = await request.post(`user/register`,user);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const updateUser = async (id,user) => {
    try {
        const response = await request.put(`user/update/${id}`,user);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}