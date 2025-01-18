package vn.aptech.backendapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.aptech.backendapi.entities.Medical;

@Repository
public interface MedicalRepository extends JpaRepository<Medical, Integer> {
    // writed by An in 5/6
    @Query("SELECT m FROM Medical m WHERE m.partient.id = :partientId")
    List<Medical> findByPartientId(@Param("partientId") Integer partientId);
}
