package vn.aptech.backendapi.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class MedicalDto {
    private int id;
    private String name;
    private String content;
    private String prescription;
    private int patientId;
    private String dayCreate;
}
