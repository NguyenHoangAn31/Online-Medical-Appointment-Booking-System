package vn.aptech.backendapi.dto;

import lombok.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AppointmentCreateDto {
    private int id;
    private int partientId;
    private int scheduledoctorId;
    private double price;
    private String payment;
    private String status;
    private String note;
    private String appointmentDate;
    private String medicalExaminationDay;
    private String clinicHours;
    private String reason;
}
