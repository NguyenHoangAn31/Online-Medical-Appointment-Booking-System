package vn.aptech.backendapi.service.Report;

import java.time.LocalDate;
import java.time.LocalDateTime;
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
        public List<ReportDto> findDoctorAppointmentsReport(LocalDate starDate, LocalDate endDate) {
                List<Doctor> doctors = doctorRepository.findAll();
                List<ReportDto> result = doctors.stream().map(
                                doctor -> new ReportDto(doctor.getId(),
                                                doctor.getFullName(), doctor.getImage(),
                                                doctor.getPrice(),
                                                appointmentRepository.countAppointmentsByDoctorIdAndDateRange(
                                                                doctor.getId(), starDate,
                                                                endDate),
                                                appointmentRepository.countSuccessfulAppointmentsByDoctorIdAndDateRange(
                                                                doctor.getId(),
                                                                starDate, endDate),
                                                doctor.getDepartment().getName(),
                                                (doctor.getPrice() * 0.3 * appointmentRepository
                                                                .countAppointmentsByDoctorIdAndDateRange(
                                                                                doctor.getId(), starDate,
                                                                                endDate)
                                                                + doctor.getPrice() * 0.7 * appointmentRepository
                                                                                .countSuccessfulAppointmentsByDoctorIdAndDateRange(
                                                                                                doctor.getId(),
                                                                                                starDate, endDate))))
                                .collect(Collectors.toList());

                return result;
        }

        @Override
        public StatisticalDto statistical() {
                StatisticalDto s = new StatisticalDto();
                // revenue
                List<ReportDto> t = findDoctorAppointmentsReport(LocalDate.now(), LocalDate.now());
                List<ReportDto> y = findDoctorAppointmentsReport(LocalDate.now().minusDays(1),
                                LocalDate.now().minusDays(1));
                int revenueToday = 0;
                for (ReportDto report : t) {
                        revenueToday += report.getTotal();
                }
                int revenueYesterday = 0;
                for (ReportDto report : y) {
                        revenueYesterday += report.getTotal();
                }
                int bookingsToday = appointmentRepository.countAppointmentsByDoctorIdAndDateRange(null, LocalDate.now(),
                                LocalDate.now());
                int bookingsYesterday = appointmentRepository.countAppointmentsByDoctorIdAndDateRange(null,
                                LocalDate.now().minusDays(1), LocalDate.now().minusDays(1));
                int appointmentsToday = appointmentRepository.countSuccessfulAppointmentsByDoctorIdAndDateRange(null,
                                LocalDate.now(), LocalDate.now());
                int appointmentsYesterday = appointmentRepository.countSuccessfulAppointmentsByDoctorIdAndDateRange(
                                null, LocalDate.now().minusDays(1), LocalDate.now().minusDays(1));

                int clientsToday = partientRepository.getCountRegister(LocalDate.now(), LocalDate.now());
                int clientsYesterday = partientRepository.getCountRegister(LocalDate.now().minusDays(1), LocalDate.now().minusDays(1));
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

        public int calculatePercentage(int today, int yesterday) {
                int percentChange;
                if (yesterday != 0) {
                        percentChange = ((today - yesterday) / yesterday) * 100;
                } else {
                        percentChange = today > 0 ? 100 : 0;
                }
                return percentChange;
        }

}
