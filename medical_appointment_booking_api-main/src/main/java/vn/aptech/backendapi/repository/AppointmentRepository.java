package vn.aptech.backendapi.repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import vn.aptech.backendapi.entities.Appointment;
import vn.aptech.backendapi.entities.Partient;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {

       @Query("SELECT a.clinicHours FROM Appointment a " +
               "WHERE a.medicalExaminationDay = :medicalExaminationDay AND a.scheduledoctor.doctor.id = :doctorId")
       List<LocalTime> findClinicHoursByBookingDateAndDoctorId(
               @Param("medicalExaminationDay") LocalDate medicalExaminationDay,
               @Param("doctorId") int doctorId);

       @Query("SELECT COUNT(a) FROM Appointment a " +
               "WHERE (:doctorId IS NULL OR a.scheduledoctor.doctor.id = :doctorId) " +
               "AND a.appointmentDate BETWEEN :startDate AND :endDate")
       Integer countAppointmentsByDoctorIdAndDateRange(
               @Param("doctorId") Integer doctorId,
               @Param("startDate") LocalDate startDate,
               @Param("endDate") LocalDate endDate);

       @Query("SELECT COUNT(a) FROM Appointment a " +
               "WHERE (:doctorId IS NULL OR a.scheduledoctor.doctor.id = :doctorId) " +
               "AND a.medicalExaminationDay BETWEEN :startDate AND :endDate " +
               "AND a.status = 'completed'")
       Integer countSuccessfulAppointmentsByDoctorIdAndDateRange(
               @Param("doctorId") Integer doctorId,
               @Param("startDate") LocalDate startDate,
               @Param("endDate") LocalDate endDate);



       @Query("SELECT a FROM Appointment a WHERE a.scheduledoctor.id = :scheduledoctorid AND a.clinicHours = :starttime")
       List<Appointment> findAppointmentsByScheduleDoctorIdAndStartTime(@Param("scheduledoctorid") int scheduleDoctorId, @Param("starttime") LocalTime startTime);


       @Query("SELECT a FROM Appointment a WHERE a.partient.id = :patientId AND a.status = :status")
       List<Appointment> findAppointmentsPatientByPatientIdAndStatus(
               @Param("patientId") int patientId,
               @Param("status") String status
       );

       @Query("SELECT DISTINCT a FROM Appointment a " +
                     "WHERE a.scheduledoctor.doctor.id = :doctorId " +
                     "AND a.medicalExaminationDay >= :startDate")
       List<Appointment> findPatientsByDoctorIdAndAppointmentUpcoming(@Param("doctorId") int doctorId,
                     @Param("startDate") LocalDate startDate);

       @Query("SELECT DISTINCT a FROM Appointment a " +
                     "WHERE a.scheduledoctor.doctor.id = :doctorId " +
                     "AND a.medicalExaminationDay BETWEEN :startDate AND :endDate")
       List<Appointment> findPatientsByDoctorIdAndMedicalExaminationToday(@Param("doctorId") int doctorId,
                     @Param("startDate") LocalDate startDate,
                     @Param("endDate") LocalDate endDate);

       List<Appointment> findByAppointmentDateAndStatus(LocalDate date, String status);

       @Query("SELECT a FROM Appointment a WHERE a.scheduledoctor.doctor.id= :doctorId AND a.partient.id = :patientId AND a.medicalExaminationDay = :medicalExaminationDay")
       Optional<Appointment> findByDoctorIddAndPatientIdAndMedicalExaminationDay(int doctorId, int patientId, LocalDate medicalExaminationDay);
       @Query("SELECT a FROM Appointment a WHERE a.partient.id = :patientId AND a.medicalExaminationDay = :medicalExaminationDay AND a.clinicHours = :clinicHours")
       Optional<Appointment> findByDoctorIddAndPatientIdAndMedicalExaminationDayAndClinicHours( int patientId, LocalDate medicalExaminationDay, LocalTime clinicHours);



}
