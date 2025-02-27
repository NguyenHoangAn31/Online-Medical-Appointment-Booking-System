package vn.aptech.backendapi.service.Slot;

import java.time.LocalDate;
import java.time.LocalTime;
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
        return mapper.map(s, SlotDto.class);
    }

    @Override
    public List<SlotDto> findAll() {
        return slotRepository.findAll().stream().map(this::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<SlotDto> findById(int id) {
        return slotRepository.findById(id).map(this::toDto);
    }

    @Override
    public SlotDto save(SlotDto dto) {
        Slot slot = mapper.map(dto, Slot.class);
        return toDto(slotRepository.save(slot));
    }

    @Override
    public boolean deleteById(int id) {
        if (!slotRepository.existsById(id)) {
            return false;
        }
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
        return slotRepository.findSlotsByDepartmentIdAndDay(departmentId, day)
                .stream().map(this::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<SlotDto> getSlotsByDepartmentIdDoctorIdAndDay(int doctorId, int departmentId, LocalDate day) {
        return slotRepository.findSlotsByDepartmentIdDoctorIdAndDay(doctorId, departmentId, day)
                .stream().map(this::toDto)
                .collect(Collectors.toList());
    }

    // New: Get slots within a specific time range
    public List<SlotDto> getSlotsByTimeRange(LocalTime startTime, LocalTime endTime) {
        return slotRepository.findSlotsByTimeRange(startTime, endTime)
                .stream().map(this::toDto)
                .collect(Collectors.toList());
    }

    // New: Mark slot as booked
    public boolean markSlotAsBooked(int slotId) {
        Optional<Slot> optionalSlot = slotRepository.findById(slotId);
        if (optionalSlot.isPresent()) {
            Slot slot = optionalSlot.get();
            slot.setBooked(true);
            slotRepository.save(slot);
            return true;
        }
        return false;
    }
}
