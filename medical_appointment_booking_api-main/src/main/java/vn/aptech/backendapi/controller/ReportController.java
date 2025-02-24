package vn.aptech.backendapi.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import vn.aptech.backendapi.dto.ReportDto;
import vn.aptech.backendapi.dto.StatisticalDto;
import vn.aptech.backendapi.service.Report.ReportService;

@RestController
@RequestMapping(value = "/api/report", produces = MediaType.APPLICATION_JSON_VALUE)
public class ReportController {

    @Autowired
    private ReportService reportService;

    @GetMapping(value = "/statistical")
    public ResponseEntity<StatisticalDto> statistical() {
        StatisticalDto result = reportService.statistical();
        return ResponseEntity.ok(result);
    }

    @GetMapping(value = "/revenuetoday")
    public ResponseEntity<List<ReportDto>> getDoctorAppointmentsReportToday() {
        List<ReportDto> result = reportService.findDoctorAppointmentsReport(LocalDate.now(), LocalDate.now());
        return ResponseEntity.ok(result);
    }

    @GetMapping(value = "/findrevenuebyday/{startDate}/{endDate}")
    public ResponseEntity<List<ReportDto>> getDoctorAppointmentsReportByDay(
            @PathVariable(value = "startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @PathVariable(value = "endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        List<ReportDto> result = reportService.findDoctorAppointmentsReport(startDate, endDate);
        return ResponseEntity.ok(result);
    }

    // 🔹 Add new report
    @PostMapping(value = "/create")
    public ResponseEntity<ReportDto> createReport(@RequestBody ReportDto dto) {
        ReportDto result = reportService.save(dto);
        return ResponseEntity.ok(result);
    }

    // 🔹 Update an existing report
    @PutMapping(value = "/update/{id}")
    public ResponseEntity<ReportDto> updateReport(@PathVariable("id") int id, @RequestBody ReportDto dto) {
        Optional<ReportDto> existingReport = reportService.findById(id);
        if (existingReport.isPresent()) {
            ReportDto updatedReport = reportService.save(dto);
            return ResponseEntity.ok(updatedReport);
        }
        return ResponseEntity.notFound().build();
    }

    // 🔹 Delete a report
    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<?> deleteReport(@PathVariable("id") int id) {
        boolean deleted = reportService.deleteById(id);
        if (deleted) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
