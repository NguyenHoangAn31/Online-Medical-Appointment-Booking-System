import * as request from "../../ultils/request";

export const getAllSlot = async () => {
    try {
        const response = await request.get('slot/all');
        return response
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const deleteSlot = async (id) => {
    try {
        await request.remove(`slot/delete/${id}`);
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const findSlotById = async (id) => {
    try {
        const response = await request.get(`slot/${id}`);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const addSlot = async (slot) => {
    try {
        await request.post(`slot/create`,slot);
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const updateSlot = async (id,slot) => {
    try {
        await request.put(`slot/update/${id}`,slot);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

