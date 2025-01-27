package vn.aptech.backendapi.service.Slot;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vn.aptech.backendapi.dto.SlotDto;
import vn.aptech.backendapi.entities.Slot;
import vn.aptech.backendapi.repository.SlotRepository;

@Service
public class SlotServiceImpl implements SlotService {
  @Autowired
  private SlotRepository slotRepository;

  @Autowired
  private ModelMapper mapper;

  private SlotDto toDto(Slot s) {
    SlotDto dto = mapper.map(s, SlotDto.class);
    return dto;
  }

  public List<SlotDto> findAll() {
    List<Slot> slots = slotRepository.findAll();
    return slots.stream().map(this::toDto)
        .collect(Collectors.toList());
  }

  public Optional<SlotDto> findById(int id) {
    Optional<Slot> result = slotRepository.findById(id);
    return result.map(this::toDto);
  }

  public SlotDto save(SlotDto dto) {
    Slot s = mapper.map(dto, Slot.class);
    Slot result = slotRepository.save(s);
    return toDto(result);
  }

  public boolean deleteById(int id) {
    try {
      slotRepository.deleteById(id);
      return true;
    } catch (Exception e) {
      e.printStackTrace();
      return false;
    }
  }

  @Override
  public List<SlotDto> getSlotsByDepartmentIdAndDay(int departmentId, LocalDate day) {
    return slotRepository.findSlotsByDepartmentIdAndDay(departmentId,day).stream().map(this::toDto)
    .collect(Collectors.toList());
  }

  @Override
  public List<SlotDto> getSlotsByDepartmentIdDoctorIdAndDay(int doctorId, int departmentId, LocalDate day) {
    return slotRepository.findSlotsByDepartmentIdDoctorIdAndDay(doctorId,departmentId,day).stream().map(this::toDto)
    .collect(Collectors.toList());
  }
}
