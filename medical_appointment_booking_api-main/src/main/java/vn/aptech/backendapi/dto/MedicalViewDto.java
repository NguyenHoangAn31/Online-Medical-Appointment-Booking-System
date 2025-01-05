package vn.aptech.backendapi.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Getter
@Setter
public class MedicalViewDto {
    private int id;
    private String name;
    private String content;
    private String prescription;
    private int patientId;
    private LocalDate dayCreate;
}
