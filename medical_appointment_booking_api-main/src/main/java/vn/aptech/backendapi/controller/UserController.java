package vn.aptech.backendapi.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.aptech.backendapi.dto.UserDto;
import vn.aptech.backendapi.dto.UserDtoCreate;
import vn.aptech.backendapi.entities.User;
import vn.aptech.backendapi.service.User.UserService;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
    @RequestMapping(value = "/api/user", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private ModelMapper mapper;

    @GetMapping
    public ResponseEntity<List<UserDto>> findAll() {
        List<UserDto> result = userService.findAll();
        return ResponseEntity.ok(result);
    }

    // findById

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> findById(@PathVariable("id") int id){
        Optional<UserDto> result = userService.findById(id);
        if (result.isPresent()) {
            return ResponseEntity.ok(result.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping(value = "/search/{username}")
    public ResponseEntity<Boolean> findByUsername(@PathVariable("username") String username){
        Optional<User> result = userService.findByEmailOrPhone(username);
        if (result.isPresent()) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.ok(false);
        }
    }
    @GetMapping(value = "/searchgmail/{gmail}")
    public ResponseEntity<Boolean> findByUserByGmail(@PathVariable("gmail") String gmail){
        Optional<User> result = userService.findByUserByGmail(gmail);
        if (result.isPresent()) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.ok(false);
        }
    }

    

    @PostMapping("/registerbygmail")
    public ResponseEntity<UserDtoCreate> registerNewUserByGmail(@RequestBody UserDtoCreate user) throws Exception {
        UserDtoCreate createdUser = userService.registerNewUserByGmail(user);
        if (createdUser!=null) {
            return ResponseEntity.ok(createdUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping("/register")
    public ResponseEntity<UserDtoCreate> registerNewUser(@RequestBody UserDtoCreate user) throws Exception {
        UserDtoCreate createdUser = userService.registerNewUser(user);
        return ResponseEntity.created(new URI("/api/users/" + createdUser.getId())).body(createdUser);
    }

    // writed by An in 5/19
    @PutMapping(value = "/update/{id}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserDto> updateUser(@PathVariable("id") int id , @RequestBody UserDto user) throws URISyntaxException {
        Optional<UserDto> result = userService.updateUser(user);
        if (result.isPresent()) {
            return ResponseEntity.ok(result.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping(value = "/changestatus/{id}/{status}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> changeStatusUser(@PathVariable("id") int id, @PathVariable("status") boolean status) {
        boolean changed = userService.changeStatus(id, status);
        if (changed) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
