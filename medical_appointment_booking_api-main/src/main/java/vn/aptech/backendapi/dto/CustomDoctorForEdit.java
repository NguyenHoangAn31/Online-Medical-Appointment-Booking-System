package vn.aptech.backendapi.dto;
import java.time.LocalDate;

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
public class CustomDoctorForEdit {
    private String email;
    // private String phone;
    private String fullName;
    private String image;
    private String title; 
    private String gender; 
    private String birthday; 
    private String address; 
    private String bio;
}
