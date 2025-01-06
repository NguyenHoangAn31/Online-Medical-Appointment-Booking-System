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
public class ReportDto {
    private int id;
    private String fullName;
    private String image;
    private double price;
    private long countBook;
    private long countFinished;
    private String departmentName; 
    private double total;
}