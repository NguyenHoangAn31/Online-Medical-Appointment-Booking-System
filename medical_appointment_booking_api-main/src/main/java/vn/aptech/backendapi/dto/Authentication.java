package vn.aptech.backendapi.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class Authentication {
    private final UserInformation user;
    private final String accessToken;
    private final String refreshToken;
    public final LocalDateTime expireAt;

    public Authentication() {
        user = this.getUser();
        accessToken = this.getAccessToken();
        refreshToken = this.getRefreshToken();
        expireAt = this.getExpireAt();
    }
}
