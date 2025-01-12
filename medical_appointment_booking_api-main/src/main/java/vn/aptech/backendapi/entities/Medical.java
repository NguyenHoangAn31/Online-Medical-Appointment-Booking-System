package vn.aptech.backendapi.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "medicals")
public class Medical extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String content;
    private String prescription;
    @Column(name = "day_create")
    private LocalDate dayCreate;
    @ManyToOne
    @JoinColumn(name = "partient_id", referencedColumnName = "id")
    private Partient partient;
}
