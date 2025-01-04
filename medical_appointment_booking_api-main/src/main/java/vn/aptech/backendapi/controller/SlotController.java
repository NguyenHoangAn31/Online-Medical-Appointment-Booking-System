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
    public ResponseEntity<List<SlotDto>> findAll() {
        List<SlotDto> result = slotService.findAll();
        return ResponseEntity.ok(result);
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SlotDto> findById(@PathVariable("id") int id) {
        Optional<SlotDto> result = slotService.findById(id);
        if (result.isPresent()) {
            return ResponseEntity.ok(result.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping(value = "/delete/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteById(@PathVariable("id") int id) {
        boolean deleted = slotService.deleteById(id);
        if (deleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // @PostMapping(value = "/create", produces = MediaType.APPLICATION_JSON_VALUE)
    // public ResponseEntity<SlotDto> Create(@RequestBody SlotDto dto) {
    // System.out.println("ok");
    // SlotDto result = slotService.save(dto);
    // if (result != null) {
    // return ResponseEntity.ok(result); // Return the created SlotDto
    // } else {
    // return ResponseEntity.notFound().build();
    // }
    // }

    // @PutMapping(value = "/update/{id}", produces =
    // MediaType.APPLICATION_JSON_VALUE)
    // public ResponseEntity<SlotDto> updateTutorial(@PathVariable("id") int id,
    // @RequestBody SlotDto dto) {
    // Optional<SlotDto> existingSlotOptional = slotService.findById(id);
    // if (existingSlotOptional.isPresent()) {
    // SlotDto existingSlot = existingSlotOptional.get();
    // existingSlot.setName(dto.getName());
    // SlotDto updatedSlot = slotService.save(existingSlot);
    // return ResponseEntity.ok(updatedSlot);
    // }
    // return ResponseEntity.notFound().build();
    // }

    @GetMapping(value = "/slotsbydepartmentidandday/{departmentId}/{day}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<SlotDto>> getSlotsByDepartmentIdAndDay(@PathVariable("departmentId") int departmentId,
            @PathVariable("day") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate day) {
        List<SlotDto> result = slotService.getSlotsByDepartmentIdAndDay(departmentId, day);
        return ResponseEntity.ok(result);
    }

    @GetMapping(value = "/slotsbydepartmentiddoctoridandday/{doctorid}/{departmentid}/{day}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<SlotDto>> getSlotsByDepartmentIdDoctorIdAndDay(
            @PathVariable("doctorid") int doctorId,
            @PathVariable("departmentid") int departmentId,
            @PathVariable("day") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate day) {
        List<SlotDto> result = slotService.getSlotsByDepartmentIdDoctorIdAndDay(doctorId, departmentId, day);
        return ResponseEntity.ok(result);
    }
}
