package vn.aptech.backendapi.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.aptech.backendapi.dto.QualificationDto;
import vn.aptech.backendapi.dto.WorkingDto;
import vn.aptech.backendapi.service.Doctor.DoctorService;
import vn.aptech.backendapi.service.Qualification.QualificationService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/qualification")
public class QualificationController {
    @Autowired
    private QualificationService qualificationService;
    @Autowired
    private DoctorService doctorService;
    @Autowired
    private ModelMapper mapper;
    @GetMapping(value = "/doctor/{doctorId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<QualificationDto>> findByDoctorId(@PathVariable("doctorId") int doctorId) {
        List<QualificationDto> qualifications = qualificationService.findByDoctorId(doctorId);
        return ResponseEntity.ok(qualifications);
    }
    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<QualificationDto> findById(@PathVariable("id") int id) {
        Optional<QualificationDto> result = qualificationService.findById(id);
        if (result.isPresent()) {
            return ResponseEntity.ok(result.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping(value = "/delete/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteById(@PathVariable("id") int id) {
        boolean deleted = qualificationService.deleteById(id);
        if (deleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping(value = "/create", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<QualificationDto> Create(@RequestBody QualificationDto dto) {
        QualificationDto result = qualificationService.save(dto);
        if (result != null) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PutMapping(value = "/update/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<QualificationDto> updateTutorial(@PathVariable("id") int id, @RequestBody QualificationDto dto) {
        Optional<QualificationDto> existingWorkingOptional = qualificationService.findById(id);
        if (existingWorkingOptional.isPresent()) {
            QualificationDto existingWorking = mapper.map(dto,existingWorkingOptional.get().getClass());
            existingWorking.setId(id);
            QualificationDto updatedQualification = qualificationService.save(existingWorking);
            return ResponseEntity.ok(updatedQualification);
        }
        return ResponseEntity.notFound().build();
    }
}
