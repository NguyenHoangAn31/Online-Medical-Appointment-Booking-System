package vn.aptech.backendapi.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import vn.aptech.backendapi.entities.Department;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Integer> {

    @Query("SELECT d.department.id FROM Doctor d GROUP BY d.department.id")
    List<Integer> findDepartmentIdsWithDoctors();

    Optional<Department> findByUrl(String url);
}