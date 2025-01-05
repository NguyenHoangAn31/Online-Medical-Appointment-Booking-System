package vn.aptech.backendapi.dto;

import lombok.*;
import vn.aptech.backendapi.dto.Feedback.FeedbackDto;
import vn.aptech.backendapi.entities.Department;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class DoctorViewDto {
    private int id;
    private String fullName;
    private String title; //Chức danh
    private String gender; // giới tính
    private String birthday; // ngày sinh
    private String address; // Địa chỉ
    private String image; // Image
    private Double price;
    private String biography;
    private Double rate;
    private int userId;
    private Department department;
}
