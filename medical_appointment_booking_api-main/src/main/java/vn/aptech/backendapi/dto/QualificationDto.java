package vn.aptech.backendapi.dto;


import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import vn.aptech.backendapi.entities.Doctor;

@Data
@Getter
@Setter
public class QualificationDto {
    private int id;
    private String course;
    private String degreeName;
    private String universityName;
    private boolean status;
    private int doctor_id;
}
