package vn.aptech.backendapi.service.ScheduleDoctor;

import java.time.LocalDate;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

import vn.aptech.backendapi.dto.Schedule.ScheduleDoctorDto;
import vn.aptech.backendapi.entities.Doctor;
import vn.aptech.backendapi.entities.Schedule;
import vn.aptech.backendapi.entities.ScheduleDoctor;
import vn.aptech.backendapi.repository.DoctorRepository;
import vn.aptech.backendapi.repository.ScheduleDoctorRepository;
import vn.aptech.backendapi.repository.ScheduleRepository;

@Service
@Slf4j
public class ScheduleDoctorServiceImpl implements ScheduleDoctorSerivce {

    @Autowired
    private ScheduleDoctorRepository scheduleDoctorRepository;

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private ModelMapper mapper;

    @Override
    public boolean create(LocalDate day, int departmentId, int doctorId, int slotId) {
        try {
            int scheduleId = scheduleRepository.findScheduleIdByDayAndDepartmentIdAndSlotId(day, departmentId, slotId);

            // Kiểm tra xem có tồn tại không
            Optional<ScheduleDoctor> existingScheduleDoctor = scheduleDoctorRepository.findByScheduleIdAndDoctorId(scheduleId, doctorId);
            if (existingScheduleDoctor.isPresent()) {
                log.warn("ScheduleDoctor already exists for Schedule ID: {} and Doctor ID: {}", scheduleId, doctorId);
                return false;
            }

            ScheduleDoctor scheduleDoctor = new ScheduleDoctor();
            Optional<Schedule> schedule = scheduleRepository.findById(scheduleId);
            Optional<Doctor> doctor = doctorRepository.findById(doctorId);

            if (schedule.isEmpty() || doctor.isEmpty()) {
                log.error("Schedule or Doctor not found (Schedule ID: {}, Doctor ID: {})", scheduleId, doctorId);
                return false;
            }

            scheduleDoctor.setSchedule(schedule.get());
            scheduleDoctor.setDoctor(doctor.get());

            scheduleDoctorRepository.save(scheduleDoctor);
            return true;
        } catch (Exception e) {
            log.error("Error creating ScheduleDoctor", e);
            return false;
        }
    }

    @Override
    public Optional<ScheduleDoctorDto> findDoctorIdById(int scheduleDoctorId) {
        return scheduleDoctorRepository.findById(scheduleDoctorId)
                .map(scheduleDoctor -> mapper.map(scheduleDoctor, ScheduleDoctorDto.class));
    }

    @Override
    public boolean delete(LocalDate day, int departmentId, int doctorId, int slotId) {
        try {
            Optional<Integer> id = scheduleDoctorRepository.findScheduleDoctorId(day, departmentId, doctorId, slotId);
            if (id.isPresent()) {
                scheduleDoctorRepository.deleteById(id.get());
                return true;
            } else {
                log.warn("ScheduleDoctor not found for deletion (Day: {}, Department ID: {}, Doctor ID: {}, Slot ID: {})",
                        day, departmentId, doctorId, slotId);
                return false;
            }
        } catch (Exception e) {
            log.error("Error deleting ScheduleDoctor", e);
            return false;
        }
    }

    public boolean updateDoctorSchedule(int scheduleDoctorId, int newDoctorId) {
        try {
            Optional<ScheduleDoctor> optionalScheduleDoctor = scheduleDoctorRepository.findById(scheduleDoctorId);
            Optional<Doctor> newDoctor = doctorRepository.findById(newDoctorId);

            if (optionalScheduleDoctor.isEmpty() || newDoctor.isEmpty()) {
                log.warn("ScheduleDoctor or new Doctor not found (ScheduleDoctor ID: {}, New Doctor ID: {})",
                        scheduleDoctorId, newDoctorId);
                return false;
            }

            ScheduleDoctor scheduleDoctor = optionalScheduleDoctor.get();
            scheduleDoctor.setDoctor(newDoctor.get());
            scheduleDoctorRepository.save(scheduleDoctor);
            return true;
        } catch (Exception e) {
            log.error("Error updating Doctor in ScheduleDoctor", e);
            return false;
        }
    }

    public static ScheduleDoctor dtoToEntity(ScheduleDoctorDto dto) {
        ScheduleDoctor entity = new ScheduleDoctor();
        entity.setId(dto.getId());

        Schedule schedule = new Schedule();
        schedule.setId(dto.getScheduleId());
        entity.setSchedule(schedule);

        Doctor doctor = new Doctor();
        doctor.setId(dto.getDoctorId());
        entity.setDoctor(doctor);

        return entity;
    }

    public static ScheduleDoctorDto entityToDto(ScheduleDoctor entity) {
        return new ScheduleDoctorDto(entity.getId(), entity.getSchedule().getId(), entity.getDoctor().getId());
    }
}
