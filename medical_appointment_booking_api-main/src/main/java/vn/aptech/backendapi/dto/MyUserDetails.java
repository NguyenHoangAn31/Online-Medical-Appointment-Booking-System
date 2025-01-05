package vn.aptech.backendapi.dto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import vn.aptech.backendapi.entities.User;
import vn.aptech.backendapi.repository.UserRepository;

import java.util.Collection;

public class MyUserDetails implements UserDetails {

    @Autowired
    private UserRepository userRepository;

    private User user;

    public MyUserDetails(User user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return user.getGrantedAuthorities();
    }

    @Override
    public String getPassword() {
        return user.getKeyCode();
    }

    @Override
    public String getUsername() {
        return user.getProvider().equals("gmail") ?  user.getEmail() : user.getPhone();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }
}
