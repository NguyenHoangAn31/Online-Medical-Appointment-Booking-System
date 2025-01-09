package vn.aptech.backendapi.dto.Schedule;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Getter
@Setter
public class DoctorDtoForSchedule {
    private int id;
    private String fullName;
    private String image;
}
