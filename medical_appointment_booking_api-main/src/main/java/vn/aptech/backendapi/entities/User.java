package vn.aptech.backendapi.entities;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = { "phone" })
})
public class User extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String email;
    private String phone;
    @Column(name = "fullname")
    private String fullName;
    @ManyToMany(cascade = CascadeType.DETACH)
    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private List<Role> roles;
    @Column(name = "keycode")
    private String keyCode;
    private String provider;

    private boolean status;

    public List<String> getAuthorities() {
        return roles.stream().map(Role::getShortName).toList();
    }

    public List<SimpleGrantedAuthority> getGrantedAuthorities() {
        return roles.stream().map(o -> new SimpleGrantedAuthority(o.getShortName())).toList();
    }

    @Override
    public String toString() {
        // Avoid referencing collections directly in toString to prevent Hibernate lazy loading issues
        return "User{" +
                "id=" + id +
                ", username='" + fullName + '\'' +
                '}';
    }

}
