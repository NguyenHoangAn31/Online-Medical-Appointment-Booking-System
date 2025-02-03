package vn.aptech.backendapi.service.Slot;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import vn.aptech.backendapi.dto.SlotDto;

public interface SlotService {
    List<SlotDto> findAll();
    Optional<SlotDto> findById(int id);
    SlotDto save(SlotDto dto);
    boolean deleteById(int id);

    List<SlotDto> getSlotsByDepartmentIdAndDay(int departmentId , LocalDate day);

    List<SlotDto> getSlotsByDepartmentIdDoctorIdAndDay(int doctorId , int departmentId , LocalDate day);
}
