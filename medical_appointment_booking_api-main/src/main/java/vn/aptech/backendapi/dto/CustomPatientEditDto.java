package vn.aptech.backendapi.dto;


import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CustomPatientEditDto {
    private String email;
    private String phone;
    private String fullName;
    private String gender;
    private String birthday;
    private String address;
}
