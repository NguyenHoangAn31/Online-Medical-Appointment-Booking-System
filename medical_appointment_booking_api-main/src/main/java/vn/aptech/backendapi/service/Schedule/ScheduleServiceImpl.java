package vn.aptech.backendapi.service.Schedule;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vn.aptech.backendapi.dto.CustomSlotWithScheduleDoctorId;
import vn.aptech.backendapi.dto.SlotDto;
import vn.aptech.backendapi.dto.Schedule.DepartmentWithSlotsDTO;
import vn.aptech.backendapi.dto.Schedule.DoctorDtoForSchedule;
import vn.aptech.backendapi.dto.Schedule.ScheduleWithDepartmentDto;
import vn.aptech.backendapi.dto.Schedule.SlotWithDoctorsDTO;
import vn.aptech.backendapi.entities.Department;
import vn.aptech.backendapi.entities.Doctor;
import vn.aptech.backendapi.entities.Schedule;
import vn.aptech.backendapi.entities.ScheduleDoctor;
import vn.aptech.backendapi.entities.Slot;
import vn.aptech.backendapi.repository.AppointmentRepository;
import vn.aptech.backendapi.repository.DepartmentRepository;
import vn.aptech.backendapi.repository.DoctorRepository;
import vn.aptech.backendapi.repository.ScheduleDoctorRepository;
import vn.aptech.backendapi.repository.ScheduleRepository;
import vn.aptech.backendapi.repository.SlotRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ScheduleServiceImpl implements ScheduleService {
    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private ScheduleDoctorRepository scheduleDoctorRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private SlotRepository slotRepository;

    @Autowired
    private ModelMapper mapper;

    @Override
    public List<Object[]> findAllOnlyDay() {
        return scheduleRepository.findDistinctDayWorkWithStatus();
    }

    @Override
    public ScheduleWithDepartmentDto getDepartmentsWithSlotsAndDoctors(LocalDate dayWorking) {

        List<Department> departments = scheduleRepository.findDistinctDepartmentsByDay(dayWorking);

        List<DepartmentWithSlotsDTO> departmentWithSlotsDTOs = departments.stream().map(department -> {
            List<Slot> slots = scheduleRepository.findDistinctSlotsByDayWorkingAndDepartment(dayWorking,
                    department.getId());
            List<SlotWithDoctorsDTO> slotDTOs = slots.stream().map(slot -> {
                List<Doctor> doctors = scheduleRepository.findDoctorsByDayWorkingAndDepartmentAndSlot(dayWorking,
                        department.getId(), slot.getId());
                List<DoctorDtoForSchedule> doctorDTOs = doctors.stream().map(
                        doctor -> new DoctorDtoForSchedule(doctor.getId(), doctor.getFullName(), doctor.getImage()))
                        .collect(Collectors.toList());
                return new SlotWithDoctorsDTO(slot.getId(), slot.getStartTime().toString(),
                        slot.getEndTime().toString(), doctorDTOs);
            }).collect(Collectors.toList());
            return new DepartmentWithSlotsDTO(department.getId(), department.getName(), department.getIcon(), slotDTOs);
        }).collect(Collectors.toList());

        return new ScheduleWithDepartmentDto(dayWorking.toString(), departmentWithSlotsDTOs);

    }

    public void updateScheduleForAdmin(LocalDate dayWorking, int departmentId, int slotId, int[] doctorList) {
        int scheduleId = scheduleRepository.findScheduleIdByDayAndDepartmentIdAndSlotId(dayWorking, departmentId,slotId);
        List<ScheduleDoctor> sDoctors = scheduleRepository.findByScheduleId(scheduleId);
        List<Integer> existingDoctorIds = new ArrayList<>();
        for (ScheduleDoctor scheduleDoctor : sDoctors) {

            existingDoctorIds.add(scheduleDoctor.getDoctor().getId());
        }

        List<Integer> newDoctorIds = new ArrayList<>();
        for (int doctorId : doctorList) {
            newDoctorIds.add(doctorId);
        }

        for (ScheduleDoctor scheduleDoctor : sDoctors) {
            if (!newDoctorIds.contains(scheduleDoctor.getDoctor().getId())) {
                scheduleDoctorRepository.delete(scheduleDoctor);
            }
        }

        for (int doctorId : doctorList) {
            if (!existingDoctorIds.contains(doctorId)) {
                ScheduleDoctor scheduleDoctor = new ScheduleDoctor();

                Optional<Doctor> d = doctorRepository.findById(doctorId);
                d.ifPresent(doctor -> scheduleDoctor.setDoctor(mapper.map(d, Doctor.class)));

                Optional<Schedule> s = scheduleRepository.findById(scheduleId);
                d.ifPresent(schedule -> scheduleDoctor.setSchedule(mapper.map(s, Schedule.class)));

                scheduleDoctorRepository.save(scheduleDoctor);
            }
        }
    }

    public List<CustomSlotWithScheduleDoctorId> findSlotsByDayAndDoctorId(LocalDate dayWorking, int doctorId) {
        List<Slot> slots = scheduleRepository.findSlotsByDayAndDoctorId(dayWorking, doctorId);
        List<CustomSlotWithScheduleDoctorId> result = new ArrayList<>();

        List<String> clinicHoursByBookingDateAndDoctorId = appointmentRepository
                .findClinicHoursByBookingDateAndDoctorId(dayWorking, doctorId)
                .stream()
                .map(LocalTime::toString)
                .collect(Collectors.toList());

        for (Slot slot : slots) {
            LocalTime startTime = slot.getStartTime();
            LocalTime endTime = slot.getEndTime();
            while (startTime.isBefore(endTime)) {
                LocalTime nextTime = startTime.plusMinutes(30);
                if (nextTime.isAfter(endTime)) {
                    nextTime = endTime;
                }
                int scheduleDoctorId = scheduleDoctorRepository
                        .findScheduleDoctorIdByDayWorkingSlotIdAndDoctorId(dayWorking, slot.getId(), doctorId);
                int status = clinicHoursByBookingDateAndDoctorId.contains(startTime.toString()) ? 0 : 1;
                result.add(new CustomSlotWithScheduleDoctorId(slot.getId(), startTime.toString(), status,
                        scheduleDoctorId));
                startTime = nextTime;
            }
        }
        return result;
    }

    @Override
    public boolean create(LocalDate dayWorking, int departmentId, int[] slotsId) {
        try {
            for (int slotId : slotsId) {
                Schedule s = new Schedule();
                Optional<Department> d = departmentRepository.findById(departmentId);
                d.ifPresent(department -> s.setDepartment(mapper.map(department, Department.class)));

                Optional<Slot> sl = slotRepository.findById(slotId);
                sl.ifPresent(slot -> s.setSlot(mapper.map(slot, Slot.class)));

                s.setDayWorking(dayWorking);
                s.setStatus(true);
                scheduleRepository.save(s);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public boolean deleteSlot(LocalDate dayWorking, int departmentId, int slotId){
        int scheduleId = scheduleRepository.findScheduleIdByDayAndDepartmentIdAndSlotId(dayWorking, departmentId,slotId);
        try {
            scheduleRepository.deleteById(scheduleId);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

}
