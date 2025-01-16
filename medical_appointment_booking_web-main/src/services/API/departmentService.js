import * as request from "../../ultils/request";

export const getAllDepartment = async () => {
    try {
        const response = await request.get('department/all');
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const deleteDepartment = async (id) => {
    try {
        await request.remove(`department/delete/${id}`);
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const findDepartmentBySlug = async (slug) => {
    try {
        const response = await request.get(`department/${slug}`);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const addDepartment = async (department) => {
    try {
        await request.post(`department/create`,department);
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const updateDepartment = async (id,department) => {
    try {
        await request.put(`department/update/${id}`,department);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getDoctorByDepartmentId = async (departmentId) => {
    try {
        const response = await request.get(`doctor/listdoctorsbydepartmentid/${departmentId}`);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
};


export const deleteDoctorFromDepartment = async (departmentId) => {
    try {
        await request.put(`doctor/deletedoctorfromdepartment/${departmentId}`);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

