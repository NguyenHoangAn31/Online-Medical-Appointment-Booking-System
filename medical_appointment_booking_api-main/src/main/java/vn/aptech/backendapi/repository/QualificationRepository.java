package vn.aptech.backendapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.aptech.backendapi.entities.Qualification;

import java.util.List;


@Repository
public interface QualificationRepository extends JpaRepository<Qualification, Integer> {
    List<Qualification> findByDoctorId(int doctorId);
}
