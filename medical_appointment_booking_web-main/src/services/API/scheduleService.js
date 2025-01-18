import * as request from "../../ultils/request";


export const findAllWorkDay = async () => {
    try {
        const response = await request.get(`schedules/getdays`);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const findScheduleByDay = async (day) => {
    try {
        const response = await request.get(`schedules/findschedulebyday/${day}`);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const updateScheduleForAdmin = async (day , departmentId , slotId , doctorList) => {
    console.log(day,departmentId,slotId,doctorList)
    try {
        await request.put(`schedules/updatelistschedule/${day}/${departmentId}/${slotId}`,doctorList);
    } catch (error) {
        console.log(error);
        throw error;
    }
};


export const createSchedule = async (day , departmentId , slotsId) => {
    try {
        await request.post(`schedules/create/${day}/${departmentId}`,slotsId);
    } catch (error) {
        console.log(error);
        throw error;
    }
};


export const deleteSlot = async (day , departmentId , slotId) => {
    console.log(day,departmentId,slotId)
    try {
        await request.remove(`schedules/deleteslot/${day}/${departmentId}/${slotId}`);
    } catch (error) {
        console.log(error);
        throw error;
    }
};