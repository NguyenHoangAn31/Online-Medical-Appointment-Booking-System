package vn.aptech.backendapi.service.Appointment;

import java.time.LocalTime;
import java.time.LocalDate;
import java.util.List;

import vn.aptech.backendapi.dto.AppointmentCreateDto;
import vn.aptech.backendapi.dto.AppointmentDto;
import vn.aptech.backendapi.dto.Appointment.AppointmentDetail;
import vn.aptech.backendapi.dto.Appointment.CustomAppointmentDto;

public interface AppointmentService {
        List<CustomAppointmentDto> findAll();

    void changeStatusReason(int id, String reason, String status);

    AppointmentDetail appointmentDetail(int appointmentId);

        void changestatus(int id, String status);

    AppointmentDto save(AppointmentDto dto);

    List<AppointmentDto> findAppointmentsByScheduleDoctorIdAndStartTime(int scheduledoctorid, LocalTime starttime);




    AppointmentDto getAppointmentById(int appointmentId);

    List<AppointmentDto> findAppointmentsPatientByPatientIdAndStatus(int patientId,
                                                                     String status);

    List<CustomAppointmentDto> findPatientsByDoctorIdAndAppointmentUpcoming(int doctorId , LocalDate startDate);
        List<CustomAppointmentDto> findPatientsByDoctorIdAndMedicalExaminationToday(int doctorId , LocalDate startDate , LocalDate endDate);

    boolean checkExistAppointmentByDayAndPatientIdAndDoctorId(int doctorId, int patientId, LocalDate medicalExaminationDay);

    boolean checkExistAppointmentByDayAndPatientIdAndDoctorId(int patientId, LocalDate medicalExaminationDay, LocalTime clinicHours);
}

