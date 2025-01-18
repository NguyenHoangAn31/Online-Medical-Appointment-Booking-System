package vn.aptech.backendapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.aptech.backendapi.entities.Role;

import java.util.Optional;


@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findById(int id);
}
