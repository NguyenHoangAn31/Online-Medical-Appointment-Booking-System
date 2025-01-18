package vn.aptech.backendapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import vn.aptech.backendapi.entities.User;

import java.util.List;
import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmailAndProvider(String email, String provider);
    Optional<User> findByPhoneAndProvider(String phone, String provider);
    Optional<User> findById(int id);
    Optional<User> findByEmailOrPhone(String email, String phone);
    void save(Optional<User> u);

}
