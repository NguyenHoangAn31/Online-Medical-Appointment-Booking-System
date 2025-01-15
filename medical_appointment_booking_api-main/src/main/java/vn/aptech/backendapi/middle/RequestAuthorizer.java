package vn.aptech.backendapi.middle;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface RequestAuthorizer {
    void tryAuthorizer(HttpServletRequest request, HttpServletResponse response);
}
