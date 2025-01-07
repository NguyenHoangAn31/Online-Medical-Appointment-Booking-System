
package vn.aptech.backendapi.dto.Appointment;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.aptech.backendapi.dto.PatientDto;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CustomAppointmentDto {
    private int id;
    // private String image;
    // private String fullName;
    private PatientDto patientDto;
    private int price;
    private String payment;
    private String status;
    private String note;
    private String appointmentDate;
    private String medicalExaminationDay;
    private String clinicHours;
}
