package vn.aptech.backendapi.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.aptech.backendapi.entities.Slot;

@Repository
public interface SlotRepository extends JpaRepository<Slot, Integer> {

    @Query("SELECT s.slot FROM Schedule s " +
            "WHERE s.department.id = :departmentId AND s.dayWorking = :dayWorking")
    List<Slot> findSlotsByDepartmentIdAndDay(@Param("departmentId") int departmentId,
            @Param("dayWorking") LocalDate dayWorking);

    @Query("SELECT s.slot FROM Schedule s " +
            "WHERE s.department.id = :departmentId " +
            "AND s.dayWorking = :dayWorking " +
            "AND EXISTS (SELECT 1 FROM ScheduleDoctor sd " +
            "            WHERE sd.schedule = s AND sd.doctor.id = :doctorId)")
    List<Slot> findSlotsByDepartmentIdDoctorIdAndDay(@Param("departmentId") int departmentId,
            @Param("doctorId") int doctorId,
            @Param("dayWorking") LocalDate dayWorking);
}
