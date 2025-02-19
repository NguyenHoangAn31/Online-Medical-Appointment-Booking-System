package vn.aptech.backendapi.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vn.aptech.backendapi.dto.SlotDto;
import vn.aptech.backendapi.entities.Slot;
import vn.aptech.backendapi.service.Slot.SlotService;

@RestController
@RequestMapping(value = "/api/slot")
public class SlotController {

    @Autowired
    private SlotService slotService;

    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<SlotDto>> findAllSlots() {
        List<SlotDto> slotDtos = slotService.findAll();
        return ResponseEntity.ok(slotDtos);
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SlotDto> findById(@PathVariable("id") int id) {
        Optional<SlotDto> result = slotService.findById(id);
        return result.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping(value = "/create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SlotDto> createSlot(@RequestBody SlotDto slotDto) {
        SlotDto createdSlot = slotService.createSlot(slotDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdSlot);
    }

    @PutMapping(value = "/update/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SlotDto> updateSlot(@PathVariable("id") int id, @RequestBody SlotDto slotDto) {
        SlotDto updatedSlot = slotService.updateSlot(id, slotDto);
        return ResponseEntity.ok(updatedSlot);
    }

    @DeleteMapping(value = "/delete/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteById(@PathVariable("id") int id) {
        boolean deleted = slotService.deleteById(id);
        return deleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @GetMapping(value = "/slots-by-department-and-day/{departmentId}/{day}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<SlotDto>> getSlotsByDepartmentAndDay(
            @PathVariable("departmentId") int departmentId,
            @PathVariable("day") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate day) {
        List<SlotDto> slots = slotService.getSlotsByDepartmentIdAndDay(departmentId, day);
        return ResponseEntity.ok(slots);
    }

    @GetMapping(value = "/slotsbydepartmentiddoctoridandday/{doctorid}/{departmentid}/{day}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<SlotDto>> getSlotsByDepartmentIdDoctorIdAndDay(
            @PathVariable("doctorid") int doctorId,
            @PathVariable("departmentid") int departmentId,
            @PathVariable("day") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate day) {
        List<SlotDto> result = slotService.getSlotsByDepartmentIdDoctorIdAndDay(doctorId, departmentId, day);
        return ResponseEntity.ok(result);
    }

    @GetMapping(value = "/slots-by-status/{status}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<SlotDto>> getSlotsByStatus(@PathVariable("status") String status) {
        List<SlotDto> slots = slotService.getSlotsByStatus(status);
        return ResponseEntity.ok(slots);
    }
}
