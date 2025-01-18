package vn.aptech.backendapi.repository;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import vn.aptech.backendapi.entities.ScheduleDoctor;

public interface ScheduleDoctorRepository extends JpaRepository<ScheduleDoctor, Integer> {
        @Query(value = "SELECT sd.id FROM schedules_doctors sd " +
                        "JOIN schedules s ON sd.schedule_id = s.id " +
                        "WHERE s.day_working = :dayWorking " +
                        "AND s.slot_id = :slotId " +
                        "AND sd.doctor_id = :doctorId", nativeQuery = true)

        Integer findScheduleDoctorIdByDayWorkingSlotIdAndDoctorId(
                        @Param("dayWorking") LocalDate dayWorking,
                        @Param("slotId") int slotId,
                        @Param("doctorId") int doctorId);

        @Query("SELECT COUNT(sd) > 0 FROM ScheduleDoctor sd " +
                        "WHERE sd.doctor.id = :doctorId AND sd.schedule.dayWorking >= :currentDate")
        boolean existsByDoctorIdAndDayWorkingAfterOrEqual(@Param("doctorId") int doctorId,
                        @Param("currentDate") LocalDate currentDate);

        @Query("SELECT sd.id FROM ScheduleDoctor sd " +
                        "WHERE sd.schedule.dayWorking = :day " +
                        "AND sd.schedule.department.id = :departmentId " +
                        "AND sd.doctor.id = :doctorId " +
                        "AND sd.schedule.slot.id = :slotId")
        Optional<Integer> findScheduleDoctorId(@Param("day") LocalDate day,
                        @Param("departmentId") int departmentId,
                        @Param("doctorId") int doctorId,
                        @Param("slotId") int slotId);

        Optional<ScheduleDoctor> findById(int id);
}
