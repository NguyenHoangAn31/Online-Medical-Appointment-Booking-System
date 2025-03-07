package vn.aptech.backendapi.jwt;

import vn.aptech.backendapi.dto.Authorized;

import java.time.LocalDateTime;
import java.util.List;

public interface JWT {
    String encode(int id, List<String> roles, LocalDateTime expiredAt, String secret);
    Authorized decode(String token, String secret);
    boolean isValid(String token, String secret);
    String refresh(String token, String secret, LocalDateTime newExpiredAt);
}
