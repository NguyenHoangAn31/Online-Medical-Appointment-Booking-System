package vn.aptech.backendapi.controller;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URISyntaxException;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.nio.file.Path;
import java.nio.file.Files;

import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import vn.aptech.backendapi.dto.DepartmentDto;
import vn.aptech.backendapi.service.Department.DepartmentService;
import vn.aptech.backendapi.service.File.FileService;
import org.springframework.util.StringUtils;

@RestController
@RequestMapping(value = "/api/department")
public class DepartmentController {

    @Autowired
    private FileService fileService;

    @Autowired
    private DepartmentService departmentService;

    // @PreAuthorize("hasAnyAuthority('ADMIN')")

    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<DepartmentDto>> findAll() {
        List<DepartmentDto> result = departmentService.findAll();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{slug}")
    public ResponseEntity<DepartmentDto> findBySlug(@PathVariable String slug) {
        return departmentService.findBySlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping(value = "/delete/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteById(@PathVariable("id") int id) {
        Optional<DepartmentDto> department = departmentService.findById(id);
        if (department.isPresent() && department.get().isStatus()) {
            return ResponseEntity.badRequest().build();
        }

        boolean deleted = departmentService.deleteById(id);
        if (deleted && department.isPresent() && department.get().getIcon() != null) {
            fileService.deleteFile("department", department.get().getIcon());
        }

        return deleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @PostMapping(value = "/create", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<DepartmentDto> createDepartment(
            @RequestParam("icon") MultipartFile iconFile,
            @RequestParam("department") String departmentJson) throws IOException {

        ObjectMapper objectMapper = new ObjectMapper();
        DepartmentDto departmentDto = objectMapper.readValue(departmentJson, DepartmentDto.class);

        // Generate URL slug from the name
        String slug = generateSlug(departmentDto.getName());
        departmentDto.setUrl(slug);

        // Handle the icon file
        departmentDto.setIcon(fileService.uploadFile("department", iconFile));

        DepartmentDto savedDepartment = departmentService.save(departmentDto);
        if (savedDepartment != null) {
            return ResponseEntity.ok(savedDepartment);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping(value = "/update/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<DepartmentDto> updateTutorial(@PathVariable("id") int id,
            @RequestParam(name = "icon", required = false) MultipartFile photo,
            @RequestParam("department") String department) throws IOException {

        System.out.println("photo : " + photo);
        System.out.println("department : " + department);

        // xử lý DepartmentDto
        ObjectMapper objectMapper = new ObjectMapper();
        DepartmentDto departmentDto = objectMapper.readValue(department,
                DepartmentDto.class);
        // xử lý hình ảnh
        if (photo != null) {
            // nếu ảnh tồn tại thì xóa
            if (departmentDto.getIcon() != null) {
                fileService.deleteFile("department", departmentDto.getIcon());
            }
            departmentDto.setIcon(fileService.uploadFile("department", photo));

        }
        departmentDto.setId(id);
        String slug = generateSlug(departmentDto.getName());
        departmentDto.setUrl(slug);
        DepartmentDto updatedDepartment = departmentService.save(departmentDto);
        if (updatedDepartment != null) {

            return ResponseEntity.ok(updatedDepartment);
        }
        return ResponseEntity.notFound().build();

    }

    @PutMapping(value = "/changestatus/{id}/{status}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> changeStatusDepartment(@PathVariable("id") int id, @PathVariable("status") int status) {
        boolean changed = departmentService.changeStatus(id, status);
        if (changed) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    private String generateSlug(String name) {
        String slug = StringUtils.trimWhitespace(name).toLowerCase()
                .replaceAll("\\s+", "-")
                .replaceAll("[^\\w\\-]+", "");
        return slug;
    }
}