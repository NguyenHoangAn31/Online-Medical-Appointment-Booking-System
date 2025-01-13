package vn.aptech.backendapi.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    @Column(name="short_name")
    private String shortName;

    @ManyToMany(mappedBy = "roles")
    private List<User> users;

    @Override
    public String toString() {
        // Avoid referencing collections directly in toString to prevent Hibernate lazy loading issues
        return "Role{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
