package vn.aptech.backendapi.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import vn.aptech.backendapi.dto.*;

import vn.aptech.backendapi.entities.Partient;
import vn.aptech.backendapi.repository.PartientRepository;
import vn.aptech.backendapi.service.File.FileService;
import vn.aptech.backendapi.service.Patient.PatientService;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/api/patient", produces = MediaType.APPLICATION_JSON_VALUE)
public class PatientController {

    @Autowired
    private PatientService patientService;
    @Autowired
    private FileService fileService;

    @GetMapping("/{userId}")
    public ResponseEntity<PatientDto> findByUserId(@PathVariable("userId") int userId) {
        Optional<PatientDto> result = patientService.getPatientByUserId(userId);
        if (result.isPresent()) {
            return ResponseEntity.ok(result.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // writed by An in 5/6
    @GetMapping("/patientid/{patientId}")
    public ResponseEntity<PatientDto> findByPatientId(@PathVariable("patientId") int patientId) {
        Optional<PatientDto> result = patientService.getPatientByPatientId(patientId);
        if (result.isPresent()) {
            return ResponseEntity.ok(result.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // wrtied by An in 5/11
    @GetMapping("/all")
    public ResponseEntity<List<PatientDto>> findAll() {
        List<PatientDto> result = patientService.getAll();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/patientbyscheduledoctoridandstarttime/{scheduledoctorid}/{starttime}")
    public ResponseEntity<List<PatientDto>> test(
            @PathVariable(value = "starttime", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalTime starttime,
            @PathVariable("scheduledoctorid") int scheduledoctorid) {
        List<PatientDto> result = patientService.findPatientsByScheduleDoctorIdAndStartTime(scheduledoctorid,
                starttime);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/patientsbydoctoridandfinishedstatus/{doctorId}")
    public ResponseEntity<List<PatientDto>> getPatientsByDoctorIdAndFinishedStatus(
            @PathVariable("doctorId") int doctorId) {
        List<PatientDto> result = patientService.findPatientsByDoctorIdAndFinishedStatus(doctorId);
        return ResponseEntity.ok(result);
    }

    @PostMapping(value = "/create/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> Create(
            @PathVariable("userId") int userId,
            @RequestParam(name = "image", required = false) MultipartFile image,
            @RequestParam("patient") String patient) throws IOException {

        ObjectMapper objectMapper = new ObjectMapper();
        CustomPatientForEdit dto = objectMapper.readValue(patient,
                CustomPatientForEdit.class);
        if (image != null) {
            if (dto.getImage() != null) {
                fileService.deleteFile("patients", dto.getImage());
            }
            dto.setImage(fileService.uploadFile("patients", image));

        }

        boolean result = patientService.Create(userId, dto);
        if (result) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();

    }

    @GetMapping(value = "/getpatientdetail/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<CustomPatientForEdit> getDoctorDetail(@PathVariable("userId") int userId) throws IOException {
        CustomPatientForEdit result = patientService.getPatientDetail(userId);

        if (result != null) {
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping(value = "/editpatient/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> editDoctor(@PathVariable("userId") int userId,
            @RequestParam(name = "image", required = false) MultipartFile image,
            @RequestParam("patient") String patient) throws IOException {

        ObjectMapper objectMapper = new ObjectMapper();

        CustomPatientForEdit dto = objectMapper.readValue(patient,
                CustomPatientForEdit.class);

        if (image != null) {
            if (dto.getImage() != null) {
                fileService.deleteFile("patients", dto.getImage());
            }
            dto.setImage(fileService.uploadFile("patients", image));

        }

        boolean result = patientService.editPatient(userId, dto);

        if (result) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping(value = "/edit-patient/{patientId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> editPatient01(@PathVariable("patientId") int patientId,
            @RequestBody CustomPatientEditDto dto) throws IOException {
        System.out.println(dto);
        boolean result = patientService.editPatient01(patientId, dto);
        if (result) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping(value = "/get-patient-detail/{patientId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<CustomPatientEditDto> getPatientDetail(@PathVariable("patientId") int patientId)
            throws IOException {
        CustomPatientEditDto result = patientService.getPatientDetail01(patientId);
        if (result != null) {
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.notFound().build();
    }

    // Hien 23/6/2024
    @GetMapping("/history/{patientId}")
    public ResponseEntity<List<MedicalDto>> getMedicalHistory(@PathVariable Integer patientId) {
        List<MedicalDto> medicalHistory = patientService.getMedicalHistoryByPatientId(patientId);
        return ResponseEntity.ok(medicalHistory);
    }

}
