package vn.aptech.backendapi.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.aptech.backendapi.entities.Doctor;
import vn.aptech.backendapi.entities.Partient;
import vn.aptech.backendapi.entities.User;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;


@Repository
public interface PartientRepository extends JpaRepository<Partient, Integer> {
    Partient getPatientByUserId(int userId);
    Partient getPatientById(int patientId);


    @Query("SELECT a.partient FROM Appointment a WHERE a.scheduledoctor.id = :scheduledoctorid AND a.clinicHours = :starttime")
    List<Partient> findPatientsByScheduleDoctorIdAndStartTime(@Param("scheduledoctorid") int scheduleDoctorId,
                                                              @Param("starttime") LocalTime startTime);

    @Query("SELECT COUNT(a) FROM Partient a " +
            "WHERE FUNCTION('DATE', a.createdAt) BETWEEN :startDate AND :endDate")

    Integer getCountRegister(@Param("startDate") LocalDate startDate,@Param("endDate") LocalDate endDate);



    @Query("SELECT DISTINCT a.partient FROM Appointment a WHERE a.scheduledoctor.doctor.id = :doctorId AND a.status = 'COMPLTED'")
    List<Partient> findPatientsByDoctorIdAndFinishedStatus(@Param("doctorId") int doctorId);


    @Query("SELECT d FROM Partient d WHERE d.user.id = :userId")
    Partient findPatientByUserId(@Param("userId") int userId);

    @Query("SELECT d.user FROM Partient d WHERE d.id = :patientId")
    User findUserByPatientId(@Param("patientId") int patientId);
}
