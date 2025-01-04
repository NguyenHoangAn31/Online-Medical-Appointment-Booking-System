package vn.aptech.backendapi.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AppointmentDto {
    private int id;
    private int partientId;
    private int doctorId;
    private int scheduledoctorId;
    private double price;
    private String image;
    private String title;
    private String fullName;
    private String departmentName;
    private String payment;
    private String status;
    private String note;
    private String appointmentDate;
    private String medicalExaminationDay;
    private String clinicHours;
    private String reason;
}
