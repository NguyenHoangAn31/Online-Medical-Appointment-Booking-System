package vn.aptech.backendapi.controller;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;

import vn.aptech.backendapi.dto.AppointmentDto;
import vn.aptech.backendapi.dto.Appointment.AppointmentDetail;
import vn.aptech.backendapi.dto.Appointment.CustomAppointmentDto;
import vn.aptech.backendapi.dto.PatientDto;
import vn.aptech.backendapi.dto.Schedule.ScheduleDoctorDto;
import vn.aptech.backendapi.dto.UserDto;
import vn.aptech.backendapi.entities.ScheduleDoctor;
import vn.aptech.backendapi.repository.PartientRepository;
import vn.aptech.backendapi.service.Appointment.AppointmentService;
import vn.aptech.backendapi.service.Patient.PatientService;
import vn.aptech.backendapi.service.ScheduleDoctor.ScheduleDoctorSerivce;
import vn.aptech.backendapi.service.User.UserService;

@RestController
@RequestMapping(value = "/api/appointment", produces = MediaType.APPLICATION_JSON_VALUE)
public class AppointmentController {
    @Autowired
    private AppointmentService appointmentService;
    @Autowired
    private PatientService patientService;
    @Autowired
    private UserService userService;
    @Autowired
    private ScheduleDoctorSerivce scheduleDoctorSerivce;
    @Autowired
    private JavaMailSender javaMailSender;

    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<CustomAppointmentDto>> findAll() {
        List<CustomAppointmentDto> result = appointmentService.findAll();
        return ResponseEntity.ok(result);
    }

    @GetMapping(value = "/detail/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AppointmentDetail> appointmentDetail(@PathVariable("id") int id) {
        AppointmentDetail result = appointmentService.appointmentDetail(id);
        return ResponseEntity.ok(result);
    }

    @PutMapping(value = "/changestatus/{id}/{status}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> changestatus(@PathVariable("id") int id, @PathVariable("status") String status) {
        try {
            appointmentService.changestatus(id, status);
            return ResponseEntity.ok("Appointment status updated successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update appointment status");
        }

    }

    @PutMapping(value = "/cancelled-appointment/{id}/{reason}/{status}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> changeStatusReason(@PathVariable("id") int id,@PathVariable("reason") String reason, @PathVariable("status") String status) {
        try {
            appointmentService.changeStatusReason(id,reason, status);
            return ResponseEntity.ok("Appointment status updated successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update appointment status");
        }

    }
    @GetMapping("/appointmentbyscheduledoctoridandstarttime/{scheduledoctorid}/{starttime}")
    public ResponseEntity<List<AppointmentDto>> getAppointments(
            @PathVariable("starttime") @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime starttime,
            @PathVariable("scheduledoctorid") int scheduledoctorid) {
        List<AppointmentDto> result = appointmentService
                .findAppointmentsByScheduleDoctorIdAndStartTime(scheduledoctorid, starttime);
        return ResponseEntity.ok(result);
    }

    // Tìm những lịch khám của patient ngày hôm nay dựa vào patientId và medical_exam_date
    @GetMapping("/appointment-schedule-patientId-and-status/{patientId}/{status}")
    public ResponseEntity<List<AppointmentDto>> getAppointmentsPatient(
            @PathVariable("patientId") int patientId, @PathVariable("status") String status) {
        List<AppointmentDto> result = appointmentService
                .findAppointmentsPatientByPatientIdAndStatus(patientId, status);
        for(AppointmentDto appointmentDto : result){
            Optional<ScheduleDoctorDto> scheduleDoctor = scheduleDoctorSerivce.findDoctorIdById(appointmentDto.getScheduledoctorId());
            if(scheduleDoctor.isPresent()){
                appointmentDto.setDoctorId(scheduleDoctor.get().getDoctorId());
            }
        }
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AppointmentDto> getAppointmentById( @PathVariable("id") int id){
        AppointmentDto result = appointmentService.getAppointmentById(id);
        return ResponseEntity.ok(result);
    }

    @GetMapping(value = "/patientsbydoctoridandmedicalexaminationupcoming/{doctorid}/{startdate}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<CustomAppointmentDto>> findPatientsByDoctorIdAndAppointmentUpcoming(
            @PathVariable("doctorid") int doctorId,
            @PathVariable("startdate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate) {
        List<CustomAppointmentDto> result = appointmentService.findPatientsByDoctorIdAndAppointmentUpcoming(doctorId,
                startDate);
        return ResponseEntity.ok(result);
    }

    @GetMapping(value = "/patientsbydoctoridandmedicalexaminationtoday/{doctorid}/{startdate}/{enddate}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<CustomAppointmentDto>> findPatientsByDoctorIdAndMedicalExaminationToday(
            @PathVariable("doctorid") int doctorId,
            @PathVariable("startdate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @PathVariable("enddate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        List<CustomAppointmentDto> result = appointmentService
                .findPatientsByDoctorIdAndMedicalExaminationToday(doctorId, startDate, endDate);
        return ResponseEntity.ok(result);
    }
    @PostMapping(value = "/create")
    public ResponseEntity<AppointmentDto> test(@RequestBody AppointmentDto dto) {
        System.out.println(dto);
        AppointmentDto result = appointmentService.save(dto);
        PatientDto patient = patientService.getPatientByPatientId(result.getPartientId()).get();
        if (result != null) {
            UserDto userDto = userService.findById(patient.getUser().getId()).get();
            ScheduleDoctorDto scheduleDoctor = scheduleDoctorSerivce.findDoctorIdById(result.getScheduledoctorId()).get();
            result.setDoctorId(scheduleDoctor.getDoctorId());
                try {
                    String Message = "Hello "+ userDto.getFullName() + ". You have successfully booked your appointment. Please visit http://localhost:5173/booking-history to see more details. Thank You.";
                    MimeMessage mimeMessage = javaMailSender.createMimeMessage();
                    MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
                    mimeMessageHelper.setTo(userDto.getEmail());
                    mimeMessageHelper.setSubject("Booking appointment successfully");
                    mimeMessageHelper.setText(Message);
                    javaMailSender.send(mimeMessage);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Xử lý check patient book cùng 1 bác sỹ trong 1 ngày,
    @GetMapping("/check-schedule-for-patient/{doctorId}/{patientId}/{medicalExaminationDay}")
    public ResponseEntity<Boolean> checkAppointment(
            @PathVariable("doctorId") int doctorId,
            @PathVariable("patientId") int patientId,
            @PathVariable("medicalExaminationDay") LocalDate medicalExaminationDay) {
        boolean exists = appointmentService.checkExistAppointmentByDayAndPatientIdAndDoctorId(doctorId, patientId, medicalExaminationDay);
        if (exists) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.ok(false);
        }
    }
    @GetMapping("/check-schedule-for-patient-clinic/check/{patientId}/{medicalExaminationDay}/{clinicHours}")
    public ResponseEntity<Boolean> checkAppointment(
            @PathVariable("patientId") int patientId,
            @PathVariable("medicalExaminationDay") LocalDate medicalExaminationDay,
            @PathVariable("clinicHours") String clinicHours
            ) {
        System.out.println(LocalTime.parse(clinicHours));
        LocalTime time = LocalTime.parse(clinicHours);
        boolean exists = appointmentService.checkExistAppointmentByDayAndPatientIdAndDoctorId( patientId, medicalExaminationDay, time);
        if (exists) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.ok(false);
        }
    }


}
