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
public class DepartmentDto {
    private int id;
    private String name;
    private String url;
    private boolean status;
    private String icon;
}
