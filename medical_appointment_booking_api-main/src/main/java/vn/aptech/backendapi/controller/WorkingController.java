package vn.aptech.backendapi.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vn.aptech.backendapi.dto.WorkingDto;
import vn.aptech.backendapi.service.Doctor.DoctorService;
import vn.aptech.backendapi.service.Working.WorkingService;

@RestController
@RequestMapping(value = "/api/working")
public class WorkingController {
    @Autowired
    private WorkingService workingService;

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private ModelMapper mapper;

    // Hien Create 30/4/2024
    @GetMapping(value = "/doctor/{doctorId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<WorkingDto>> findByDoctorId(@PathVariable("doctorId") int doctorId) {
        List<WorkingDto> workings = workingService.findByDoctorId(doctorId);
        return ResponseEntity.ok(workings);
    }


    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<WorkingDto> findById(@PathVariable("id") int id) {
        Optional<WorkingDto> result = workingService.findById(id);
        if (result.isPresent()) {
            return ResponseEntity.ok(result.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping(value = "/delete/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteById(@PathVariable("id") int id) {
        boolean deleted = workingService.deleteById(id);
        if (deleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(value = "/create", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<WorkingDto> Create(@RequestBody WorkingDto dto) {
        WorkingDto result = workingService.save(dto);
        if (result != null) {
            return ResponseEntity.ok(result); 
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping(value = "/update/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<WorkingDto> updateTutorial(@PathVariable("id") int id, @RequestBody WorkingDto dto) {
        Optional<WorkingDto> existingWorkingOptional = workingService.findById(id);
        if (existingWorkingOptional.isPresent()) {
            WorkingDto existingWorking = mapper.map(dto,existingWorkingOptional.get().getClass());
            existingWorking.setId(id);
            WorkingDto updatedWorking = workingService.save(existingWorking);
            return ResponseEntity.ok(updatedWorking);
        }
        return ResponseEntity.notFound().build();
    }
}
