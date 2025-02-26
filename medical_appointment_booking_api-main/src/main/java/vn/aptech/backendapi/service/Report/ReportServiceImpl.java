package vn.aptech.backendapi.service.Report;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vn.aptech.backendapi.dto.ReportDto;
import vn.aptech.backendapi.dto.StatisticalDto;
import vn.aptech.backendapi.entities.Doctor;
import vn.aptech.backendapi.repository.AppointmentRepository;
import vn.aptech.backendapi.repository.DoctorRepository;
import vn.aptech.backendapi.repository.PartientRepository;

@Service
public class ReportServiceImpl implements ReportService {
    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PartientRepository partientRepository;

    @Override
    public List<ReportDto> findDoctorAppointmentsReport(LocalDate startDate, LocalDate endDate, Long departmentId) {
        List<Doctor> doctors = (departmentId == null) ? doctorRepository.findAll() : doctorRepository.findByDepartmentId(departmentId);

        return doctors.stream().map(doctor -> {
            int totalAppointments = appointmentRepository.countAppointmentsByDoctorIdAndDateRange(doctor.getId(), startDate, endDate);
            int successfulAppointments = appointmentRepository.countSuccessfulAppointmentsByDoctorIdAndDateRange(doctor.getId(), startDate, endDate);
            double totalEarnings = (doctor.getPrice() * 0.3 * totalAppointments) + (doctor.getPrice() * 0.7 * successfulAppointments);

            return new ReportDto(doctor.getId(), doctor.getFullName(), doctor.getImage(), doctor.getPrice(),
                totalAppointments, successfulAppointments, doctor.getDepartment().getName(), totalEarnings);
        }).collect(Collectors.toList());
    }

    @Override
    public StatisticalDto statistical(LocalDate startDate, LocalDate endDate) {
        StatisticalDto s = new StatisticalDto();
        
        List<ReportDto> reportsToday = findDoctorAppointmentsReport(startDate, endDate, null);
        List<ReportDto> reportsYesterday = findDoctorAppointmentsReport(startDate.minusDays(1), endDate.minusDays(1), null);
        
        int revenueToday = reportsToday.stream().mapToInt(ReportDto::getTotal).sum();
        int revenueYesterday = reportsYesterday.stream().mapToInt(ReportDto::getTotal).sum();
        int bookingsToday = appointmentRepository.countAppointmentsByDoctorIdAndDateRange(null, startDate, endDate);
        int bookingsYesterday = appointmentRepository.countAppointmentsByDoctorIdAndDateRange(null, startDate.minusDays(1), endDate.minusDays(1));
        int appointmentsToday = appointmentRepository.countSuccessfulAppointmentsByDoctorIdAndDateRange(null, startDate, endDate);
        int appointmentsYesterday = appointmentRepository.countSuccessfulAppointmentsByDoctorIdAndDateRange(null, startDate.minusDays(1), endDate.minusDays(1));
        int clientsToday = partientRepository.getCountRegister(startDate, endDate);
        int clientsYesterday = partientRepository.getCountRegister(startDate.minusDays(1), endDate.minusDays(1));

        s.setRevenueToday(revenueToday);
        s.setPercnetRevenue(calculatePercentage(revenueToday, revenueYesterday));
        s.setBookingsToday(bookingsToday);
        s.setPercentBookings(calculatePercentage(bookingsToday, bookingsYesterday));
        s.setPatientsToday(appointmentsToday);
        s.setPercentPatients(calculatePercentage(appointmentsToday, appointmentsYesterday));
        s.setClientsToday(clientsToday);
        s.setPercentClients(calculatePercentage(clientsToday, clientsYesterday));
        return s;
    }

    private int calculatePercentage(int today, int yesterday) {
        if (yesterday == 0) return today > 0 ? 100 : 0;
        return ((today - yesterday) * 100) / yesterday;
    }
}
