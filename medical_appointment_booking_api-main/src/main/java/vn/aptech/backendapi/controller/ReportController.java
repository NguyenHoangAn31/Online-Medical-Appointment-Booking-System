package vn.aptech.backendapi.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vn.aptech.backendapi.dto.ReportDto;
import vn.aptech.backendapi.dto.StatisticalDto;
import vn.aptech.backendapi.service.Report.ReportService;

@RestController
@RequestMapping(value = "/api/report", produces = MediaType.APPLICATION_JSON_VALUE)
public class ReportController {

    @Autowired
    private ReportService reportService;


    @GetMapping(value = "/statistical", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<StatisticalDto> statistical() {
        StatisticalDto result = reportService.statistical();
        return ResponseEntity.ok(result);
    }

    @GetMapping(value = "/revenuetoday", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ReportDto>> getDoctorAppointmentsReportToday() {
        List<ReportDto> result = reportService.findDoctorAppointmentsReport(LocalDate.now(),LocalDate.now());
        return ResponseEntity.ok(result);
    }

    @GetMapping(value = "/findrevenuebyday/{startDate}/{endDate}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ReportDto>> getDoctorAppointmentsReportByDay(
            @PathVariable(value = "startDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @PathVariable(value = "endDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        List<ReportDto> result = reportService.findDoctorAppointmentsReport(startDate, endDate);
        return ResponseEntity.ok(result);
    }
}
