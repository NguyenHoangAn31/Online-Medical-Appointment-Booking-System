package vn.aptech.backendapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    @GetMapping("/all")
    public ResponseEntity<List<MedicalDto>> getAllMedicals() {
        List<MedicalDto> medicals = medicalService.getAllMedicals();
        return ResponseEntity.ok(medicals);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicalDto> getMedicalById(@PathVariable Long id) {
        MedicalDto medical = medicalService.getMedicalById(id);
        return ResponseEntity.ok(medical);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<MedicalDto> updateMedical(@PathVariable Long id, @RequestBody MedicalDto medicalDto) {
        MedicalDto updatedMedical = medicalService.updateMedical(id, medicalDto);
        return ResponseEntity.ok(updatedMedical);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteMedical(@PathVariable Long id) {
        medicalService.deleteMedical(id);
        return ResponseEntity.noContent().build();
    }
}
