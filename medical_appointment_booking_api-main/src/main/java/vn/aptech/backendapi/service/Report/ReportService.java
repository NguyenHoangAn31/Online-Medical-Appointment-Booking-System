package vn.aptech.backendapi.service.Report;

import java.time.LocalDate;
import java.util.List;

import vn.aptech.backendapi.dto.ReportDto;
import vn.aptech.backendapi.dto.StatisticalDto;

public interface ReportService {
    List<ReportDto> findDoctorAppointmentsReport(LocalDate starDate , LocalDate enDate);
    StatisticalDto statistical();
}
