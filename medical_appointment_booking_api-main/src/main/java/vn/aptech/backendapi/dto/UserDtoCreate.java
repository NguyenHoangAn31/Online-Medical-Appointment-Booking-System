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
public class UserDtoCreate {
    private  int id;
    private  String email;
    private  String phone;
    private  String fullName;
    private  String provider;
    private  String keyCode;
    private  int roleId;
    private boolean status;
}
