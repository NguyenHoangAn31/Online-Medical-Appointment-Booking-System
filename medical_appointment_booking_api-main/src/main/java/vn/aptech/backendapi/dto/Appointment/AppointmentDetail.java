package vn.aptech.backendapi.dto.Appointment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.aptech.backendapi.dto.DoctorDto;
import vn.aptech.backendapi.dto.PatientDto;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AppointmentDetail {
    private int id;
    private PatientDto patient;
    private DoctorDto doctor;
    private int price;
    private String payment;
    private String status;
    private String note;
    private String appointmentDate;
    private String medicalExaminationDay;   
    private String clinicHours;
    private String reason;
}
