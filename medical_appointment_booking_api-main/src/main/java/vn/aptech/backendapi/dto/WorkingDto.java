package vn.aptech.backendapi.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@Data
@Getter
@Setter
public class WorkingDto {
    private int id;
    private String company;
    private String address;
    private String startWork;
    private String endWork;
    private boolean status;
    private int doctor_id;
}
