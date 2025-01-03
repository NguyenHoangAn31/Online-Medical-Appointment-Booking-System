package vn.aptech.backendapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.aptech.backendapi.dto.MedicalDto;
import vn.aptech.backendapi.service.Medical.MedicalService;

@RestController
@RequestMapping("/api/medical")
public class MedicalController {
    @Autowired
    private MedicalService medicalService;
    @PostMapping("/create")
    public ResponseEntity<MedicalDto> createMedical(@RequestBody MedicalDto medicalDto) {
        System.out.println(medicalDto);
        MedicalDto createdMedical = medicalService.createMedical(medicalDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdMedical);
    }
}
