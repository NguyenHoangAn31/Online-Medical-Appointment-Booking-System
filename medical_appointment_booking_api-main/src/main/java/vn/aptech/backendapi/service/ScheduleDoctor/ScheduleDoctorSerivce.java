package vn.aptech.backendapi.service.ScheduleDoctor;

import vn.aptech.backendapi.dto.Schedule.ScheduleDoctorDto;

import java.time.LocalDate;
import java.util.Optional;

public interface ScheduleDoctorSerivce {
    boolean create(LocalDate day , int departmentId , int doctorId , int slotId);

    Optional<ScheduleDoctorDto> findDoctorIdById(int scheduleDoctorId);

    boolean delete(LocalDate day , int departmentId , int doctorId , int slotId);
    
}
