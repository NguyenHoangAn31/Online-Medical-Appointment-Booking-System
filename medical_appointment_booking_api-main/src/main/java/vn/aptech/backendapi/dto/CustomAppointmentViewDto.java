package vn.aptech.backendapi.dto;


import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CustomAppointmentViewDto {
    private int id;
//    private String image;
//    private String fullName;
    private PatientDto patientDto;
    private DoctorDto doctorDto;
    private int price;
    private String payment;
    private String status;
    private String appointmentDate;
    private String medicalExaminationDay;
    private String clinicHours;
    private  String reason;
}
