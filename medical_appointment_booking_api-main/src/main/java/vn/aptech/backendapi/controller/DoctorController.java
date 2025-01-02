package vn.aptech.backendapi.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import vn.aptech.backendapi.dto.CustomDoctorForEdit;
import vn.aptech.backendapi.dto.CustomPatientForEdit;
import vn.aptech.backendapi.dto.DoctorCreateDto;
import vn.aptech.backendapi.dto.DoctorDto;
import vn.aptech.backendapi.service.Doctor.DoctorService;
import vn.aptech.backendapi.service.File.FileService;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/doctor")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private FileService fileService;

    @Autowired
    private ModelMapper mapper;

    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    // @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<List<DoctorDto>> findAll() {
        List<DoctorDto> result = doctorService.findAll();
        return ResponseEntity.ok(result);
    }

    @GetMapping(value = "/search", produces = MediaType.APPLICATION_JSON_VALUE)
    // @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<List<DoctorDto>> searchDoctorsByName(@RequestParam String name) {
        List<DoctorDto> result = doctorService.searchDoctorsByName(name);
        return ResponseEntity.ok(result);
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    // @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<DoctorDto> findById(@PathVariable("id") int id) {
        Optional<DoctorDto> result = doctorService.findById(id);
        if (result.isPresent()) {
            return ResponseEntity.ok(result.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping(value = "/findbyuserid/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    // @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<DoctorDto> findByUserId(@PathVariable("id") int id) {
        Optional<DoctorDto> result = doctorService.findByUserId(id);
        if (result.isPresent()) {
            return ResponseEntity.ok(result.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Hien Create 30/4/2024
    @GetMapping(value = "/related-doctor/{departmentId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<DoctorDto>> findRDoctorsByDepartment(@PathVariable("departmentId") int departmentId) {
        List<DoctorDto> relatedDoctors = doctorService.findDoctorsByDepartmentId(departmentId);
        return ResponseEntity.ok(relatedDoctors);
    }

    // writed by An in 5/11
    @GetMapping(value = "/allwithallstatus", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<DoctorDto>> findAllWithStatus() {
        List<DoctorDto> result = doctorService.findAllWithAllStatus();
        return ResponseEntity.ok(result);
    }

    @PutMapping(value = "/updatepriceanddepartment/{id}/{price}/{departmentid}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<DoctorDto> UpdatePriceAndDepartment(@PathVariable("id") int id,
            @PathVariable(name = "price", required = false) double price,
            @PathVariable(name = "departmentid", required = false) int departmentId) {

        doctorService.findById(id).orElseThrow(() -> new RuntimeException());
        DoctorDto result = doctorService.updatePriceAndDepartment(id, price, departmentId);
        return ResponseEntity.ok(result);

    }

    @PutMapping(value = "/update/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<DoctorDto> updateTutorial(@PathVariable("id") int id,
            @RequestBody DoctorCreateDto doctorCreateDto) throws IOException {
        DoctorDto doctorDto = mapper.map(doctorCreateDto, DoctorDto.class);
        doctorDto = doctorService.update(id, doctorDto);
        return ResponseEntity.ok(doctorDto);
    }

    @PutMapping(value = "/deletedoctorfromdepartment/{doctorId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteDoctorFromDepartment(@PathVariable("doctorId") int doctorId) throws IOException {
        boolean result = doctorService.deleteDoctorFromDepartment(doctorId);
        if (result) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping(value = "/doctornotdepartment", produces = MediaType.APPLICATION_JSON_VALUE)
    // @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<List<DoctorDto>> doctorNotDepartment() {
        List<DoctorDto> result = doctorService.doctorNotDepartment();
        if (result != null) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping(value = "/adddoctortodepartment/{departmentId}/{doctorId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addDoctorToDepartment(@PathVariable("departmentId") int departmentId,
            @PathVariable("doctorId") int doctorId) throws IOException {
        boolean result = doctorService.addDoctorToDepartment(departmentId, doctorId);
        if (result) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping(value = "/listdoctorsbydepartmentid/{departmentId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<DoctorDto>> listDoctorsByDepartmentId(@PathVariable("departmentId") int departmentId) {
        List<DoctorDto> relatedDoctors = doctorService.findDoctorsByDepartmentIdWithAllStatus(departmentId);
        return ResponseEntity.ok(relatedDoctors);
    }

    @GetMapping(value = "/getdoctordetail/{doctorId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<CustomDoctorForEdit> getDoctorDetail(@PathVariable("doctorId") int doctorId)
            throws IOException {
        CustomDoctorForEdit result = doctorService.getDoctorDetail(doctorId);
        if (result != null) {
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping(value = "/editdoctor/{doctorId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<DoctorDto> editDoctor(
            @PathVariable("doctorId") int doctorId,
            @RequestParam(name = "image", required = false) MultipartFile image,
            @RequestParam("doctor") String doctor) throws IOException {

                System.out.println("doctor : " + doctor);
        ObjectMapper objectMapper = new ObjectMapper();

        CustomDoctorForEdit dto = objectMapper.readValue(doctor,
                CustomDoctorForEdit.class);

        if (image != null) {
            if (dto.getImage() != null) {
                fileService.deleteFile("doctors", dto.getImage());
            }
            dto.setImage(fileService.uploadFile("doctors", image));

        }

        DoctorDto result = doctorService.editDoctor(doctorId, dto);
        if (result != null) {
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.notFound().build();
    }

}
