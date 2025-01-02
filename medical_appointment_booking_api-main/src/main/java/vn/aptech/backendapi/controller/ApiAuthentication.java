package vn.aptech.backendapi.controller;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.mail.MessagingException;
import vn.aptech.backendapi.dto.Authentication;
import vn.aptech.backendapi.dto.AuthenticationWithUsernameAndKeycode;
import vn.aptech.backendapi.entities.RefreshToken;
import vn.aptech.backendapi.entities.User;
import vn.aptech.backendapi.repository.RefreshTokenRepository;
import vn.aptech.backendapi.service.Auth.AuthenticationWithUsernameAndKeycodeService;
import vn.aptech.backendapi.service.User.UserService;

import java.time.LocalDateTime;
import java.util.Optional;

//Khoa edit 18/04/2024
@RestController
@RequestMapping(value = "/api/auth")
@Slf4j
public class ApiAuthentication {
    @Autowired
    private AuthenticationWithUsernameAndKeycodeService service;

    @Autowired
    private UserService userService;

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    // Login
    @PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Authentication> login(@RequestBody AuthenticationWithUsernameAndKeycode body) {
        var session = service.processLogin(body);
        return ResponseEntity.ok(session);
    }

    // @PostMapping("/sign-in")
    // public ResponseEntity<String> signIn(@@RequestBody )

    @PostMapping(value = "/check-refresh-token", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Authentication> checkToken(@RequestBody AuthenticationWithUsernameAndKeycode body) {
        String username = body.getUsername();
        var session = service.checkToken(username);
        return ResponseEntity.ok(session);
    }

    @PostMapping(value = "/check-account", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> checkExitAccount(@RequestBody AuthenticationWithUsernameAndKeycode body) {
        String username = body.getUsername();
        String provider = body.getProvider();
        Optional<User> userOptional;
        if (provider.equals("phone")) {
            userOptional = userService.findByUserByGmail(username);

        } else {
            userOptional = userService.findByUserByGmail(username);

        }
        if (!userOptional.get().isStatus()) {
            return ResponseEntity.ok("{\"result\":\"disable\"}");
        }
        if (userOptional.isPresent() && userOptional.get().getProvider().equals(provider)) {
            return ResponseEntity.ok("{\"result\":\"true\"}");
        } else {
            return ResponseEntity.ok("{\"result\":\"false\"}");
        }
    }

    @PostMapping(value = "/send-otp", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> sendOtp(@RequestBody AuthenticationWithUsernameAndKeycode body) {
        String username = body.getUsername();
        String provider = body.getProvider();
        Optional<RefreshToken> refreshTokenOptional = refreshTokenRepository.findRefreshTokenByUsername(username);
        if (refreshTokenOptional.isPresent()) {
            System.out.println("Tìm thấy token");
            RefreshToken refreshToken = refreshTokenOptional.get();
            // System.out.println(refreshToken);
            LocalDateTime expiredAt = refreshToken.getExpiredAt();
            LocalDateTime now = LocalDateTime.now();
            // check tính hợp lệ của token
            if (now.isBefore(expiredAt)) {
                System.out.println("Tìm token còn hạn");
                return ResponseEntity.ok(false); // Token chưa hết hạn, no thực hiện gửi OTP
            } else {
                System.out.println("Tìm token hết hạn");
                // refreshToken.setAvailable(false);
                // refreshTokenRepository.delete(refreshToken);
                return ResponseEntity.ok(true); // Token đã hết hạn, thực hiện login
            }
        } else {
            System.out.println("Token not found");
            return ResponseEntity.ok(true); // Token bằng null, thực hiện gửi OTP
        }

    }
    @PostMapping(value = "/set-keycode-gmail/{gmail}")
    public ResponseEntity<Boolean> setOtpForGmail(@PathVariable("gmail") String gmail) throws MessagingException{
        Boolean result = userService.setOtpForGmail(gmail);
        if (result) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.ok(false);
        }
    }

    @PostMapping(value = "/set-keycode")
    public void setKeyCode(@RequestBody AuthenticationWithUsernameAndKeycode body) {
        String username = body.getUsername();
        String keycode = body.getKeycode();
        String provider = body.getProvider();
        Optional<User> userOptional = userService.findByEmailOrPhone(username);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (provider.equals(user.getProvider())) {
                user.setKeyCode(keycode);
                userService.save(user);
            }
        }
    }

}
