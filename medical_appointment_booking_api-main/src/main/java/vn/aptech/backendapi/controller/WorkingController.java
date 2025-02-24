package vn.aptech.backendapi.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import vn.aptech.backendapi.dto.WorkingDto;
import vn.aptech.backendapi.service.Doctor.DoctorService;
import vn.aptech.backendapi.service.Working.WorkingService;

@RestController
@RequestMapping("/api/working")
public class WorkingController {

    @Autowired
    private WorkingService workingService;

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private ModelMapper mapper;

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    /**
     * Lấy danh sách lịch làm việc theo doctorId
     */
    @GetMapping(value = "/doctor/{doctorId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<WorkingDto>> findByDoctorId(@PathVariable("doctorId") int doctorId) {
        List<WorkingDto> workings = workingService.findByDoctorId(doctorId);
        return ResponseEntity.ok(workings);
    }

    /**
     * Lấy lịch làm việc theo ID
     */
    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<WorkingDto> findById(@PathVariable("id") int id) {
        return workingService.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Xóa lịch làm việc theo ID
     */
    @DeleteMapping(value = "/delete/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteById(@PathVariable("id") int id) {
        return workingService.deleteById(id) ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    /**
     * Tạo mới lịch làm việc
     */
    @PostMapping(value = "/create", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<WorkingDto> create(@RequestBody WorkingDto dto) {
        WorkingDto result = workingService.save(dto);
        return result != null ? ResponseEntity.ok(result) : ResponseEntity.badRequest().build();
    }

    /**
     * Cập nhật lịch làm việc
     */
    @PutMapping(value = "/update/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<WorkingDto> update(@PathVariable("id") int id, @RequestBody WorkingDto dto) {
        return workingService.findById(id)
                .map(existing -> {
                    WorkingDto updatedWorking = mapper.map(dto, WorkingDto.class);
                    updatedWorking.setId(id);
                    return ResponseEntity.ok(workingService.save(updatedWorking));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Lấy danh sách lịch làm việc theo khoảng thời gian
     */
    @GetMapping(value = "/doctor/{doctorId}/date-range", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<WorkingDto>> findByDateRange(
            @PathVariable("doctorId") int doctorId,
            @RequestParam("startDate") String startDateStr,
            @RequestParam("endDate") String endDateStr) {
        try {
            LocalDate startDate = LocalDate.parse(startDateStr, DATE_FORMATTER);
            LocalDate endDate = LocalDate.parse(endDateStr, DATE_FORMATTER);
            List<WorkingDto> workings = workingService.findByDateRange(doctorId, startDate, endDate);
            return ResponseEntity.ok(workings);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
