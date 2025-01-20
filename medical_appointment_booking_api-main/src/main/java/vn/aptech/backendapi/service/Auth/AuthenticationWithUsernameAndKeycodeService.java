package vn.aptech.backendapi.service.Auth;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import vn.aptech.backendapi.dto.Authentication;
import vn.aptech.backendapi.dto.AuthenticationWithUsernameAndKeycode;
import vn.aptech.backendapi.dto.UserInformation;
import vn.aptech.backendapi.entities.RefreshToken;
import vn.aptech.backendapi.entities.User;
import vn.aptech.backendapi.jwt.JWT;
import vn.aptech.backendapi.repository.RefreshTokenRepository;
import vn.aptech.backendapi.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Slf4j
public class AuthenticationWithUsernameAndKeycodeService {

    @Value("jwt.secret")
    public String TOKEN_SECRET;

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JWT jwt;

    public Authentication processLogin(AuthenticationWithUsernameAndKeycode body) {
        String username = body.getUsername();
        String keycode = body.getKeycode();
        String provider = body.getProvider();
        User user;

        // Tìm user dựa trên provider
        if (provider.equals("phone")) {
            user = userRepository.findByPhoneAndProvider(username, provider)
                    .orElseThrow(() -> new UsernameNotFoundException("Invalid Username or Password"));
        } else {
            user = userRepository.findByEmailAndProvider(username, provider)
                    .orElseThrow(() -> new UsernameNotFoundException("Invalid Username or Password"));
        }

        // Kiểm tra keycode
    
        if (!keycode.equals(user.getKeyCode())) {
            throw new UsernameNotFoundException("Invalid Username or Password");
        } else {
            // Nếu cả user và keycode đều hợp lệ, thực hiện các bước tiếp theo

            // Xóa token cũ
            refreshTokenRepository.findRefreshTokenByUsername(username)
                    .ifPresent(refreshTokenRepository::delete);

            // Tạo refresh token mới
            var expiredAt = LocalDateTime.now().plusDays(1);
            var accessToken = jwt.encode(user.getId(), user.getAuthorities(), expiredAt, TOKEN_SECRET);
            refreshTokenRepository.disableOldRefreshTokenFromUser(user.getId());
            RefreshToken refresh = new RefreshToken(user, 5);
            refreshTokenRepository.save(refresh);

            // Trả về đối tượng Authentication
            Authentication auth = new Authentication(new UserInformation(user), accessToken, refresh.getCode(),
                    expiredAt);
            return auth;
        }

    }

    public Authentication checkToken(String username) {
        Optional<RefreshToken> authenticationOptional = refreshTokenRepository.findRefreshTokenByUsername(username);
        Authentication auth = new Authentication();
        if (authenticationOptional.isPresent()) {
            RefreshToken refreshToken = authenticationOptional.get();
            User user = refreshToken.getUser();
            String tokenCode = refreshToken.getCode();
            LocalDateTime expiredAt = refreshToken.getExpiredAt();
            LocalDateTime now = LocalDateTime.now();
            // if(now.isBefore(expiredAt)){
            var accessToken = jwt.encode(user.getId(), user.getAuthorities(), expiredAt, TOKEN_SECRET);
            auth = new Authentication(new UserInformation(user), accessToken, tokenCode, expiredAt);
            // }
        }
        return auth;
    }

}
