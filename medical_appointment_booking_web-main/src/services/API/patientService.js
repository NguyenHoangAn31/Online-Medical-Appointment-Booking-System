import * as request from "../../ultils/request";

export const getPatientByUserId = async (userId) => {
    try {
        const response =  await request.get(`patient/${userId}`);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}




//writed by An in 5/11
export const getAllPatient = async () => {
    try {
        const response = await request.get('patient/all');
        return response
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getPatientByPatientId = async (id) => {
    try {
        const response = await request.get(`patient/patientid/${id}`);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}