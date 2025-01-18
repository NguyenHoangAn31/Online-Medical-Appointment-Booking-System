package vn.aptech.backendapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.aptech.backendapi.entities.Working;

import java.util.List;


@Repository
public interface WorkingRepository extends JpaRepository<Working, Integer> {
    // Hien Create 30/4/2024
    List<Working> findByDoctorId(int doctorId);
}
