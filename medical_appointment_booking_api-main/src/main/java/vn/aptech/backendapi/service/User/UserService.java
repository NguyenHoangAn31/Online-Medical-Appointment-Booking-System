package vn.aptech.backendapi.service.User;

import vn.aptech.backendapi.dto.UserDto;
import vn.aptech.backendapi.dto.UserDtoCreate;
import vn.aptech.backendapi.dto.UserInformation;
import vn.aptech.backendapi.entities.User;

import java.util.List;
import java.util.Optional;

import jakarta.mail.MessagingException;

public interface UserService {
    Optional<User> findByEmailOrPhone(String username);
    Optional<User> findByUserByGmail(String gmail);

    Boolean setOtpForGmail(String gmail) throws MessagingException;
    User save(User user);

    List<UserDto> findAll();

    Optional<UserDto> findById(int id);

    //Optional<UserDto> findByPhone(String username);
    //UserDto registerNewUser(String email, String phone, String fullName, String keyCode, String provider,boolean status, String role);

    UserDtoCreate registerNewUser(UserDtoCreate userDtoCreate) throws Exception;
    UserDtoCreate registerNewUserByGmail(UserDtoCreate userDtoCreate) throws Exception;

    Optional<UserDto> updateUser(UserDto dto);

    boolean changeStatus(int id,boolean status);
}
