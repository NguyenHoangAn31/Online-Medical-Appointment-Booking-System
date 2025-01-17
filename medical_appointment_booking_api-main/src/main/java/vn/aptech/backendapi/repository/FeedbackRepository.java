package vn.aptech.backendapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.aptech.backendapi.entities.Feedback;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {
    @Query("SELECT COALESCE(AVG(f.rate),0.0) FROM Feedback f WHERE f.doctor.id = :doctorId")
    public double averageRateByDoctorId(@Param("doctorId") int doctorId);

    @Query("SELECT f FROM Feedback f WHERE f.doctor.id = :doctorId")
    List<Feedback> findListByDoctorId(@Param("doctorId") int doctorId);

    List<Feedback> findAllByDoctorId(int doctorId);
}
