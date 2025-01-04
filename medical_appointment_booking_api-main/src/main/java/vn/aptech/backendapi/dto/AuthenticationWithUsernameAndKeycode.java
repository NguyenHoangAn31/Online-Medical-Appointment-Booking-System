package vn.aptech.backendapi.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthenticationWithUsernameAndKeycode {
    @NotBlank
    private String username;
    @NotBlank
    private String keycode;
    private String provider;
}
