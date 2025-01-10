package vn.aptech.backendapi.dto.Schedule;

import java.time.LocalTime;
import java.util.List;

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
public class SlotWithDoctorsDTO {
    private int id;
    private String startTime;
    private String endTime;
    private List<DoctorDtoForSchedule> doctorsForSchedules;
}
